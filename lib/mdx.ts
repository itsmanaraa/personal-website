import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ProjectFrontmatter {
  id: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  summary: string;
  technicalSummary: string;
  status: 'completed' | 'in-progress' | 'archived';
  tech: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

export interface BlogFrontmatter {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  technicalSummary: string;
}

/**
 * Get all MDX files from a directory
 */
export async function getMDXFiles(directory: 'projects' | 'blog') {
  const dirPath = path.join(contentDirectory, directory);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath);
  return files.filter(file => file.endsWith('.mdx'));
}

/**
 * Get a single MDX file content
 */
export async function getMDXContent(directory: 'projects' | 'blog', slug: string) {
  const filePath = path.join(contentDirectory, directory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Serialize MDX content with remark-gfm and rehype-pretty-code
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
            keepBackground: false,
          },
        ],
      ],
    },
  });

  return {
    frontmatter: data,
    content: mdxSource,
    rawContent: content,
    slug,
  };
}

/**
 * Get all projects
 */
export async function getAllProjects() {
  const files = await getMDXFiles('projects');

  const projects = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      const project = await getMDXContent('projects', slug);
      return project;
    })
  );

  return projects
    .filter(Boolean)
    .sort((a, b) => {
      if (!a || !b) return 0;
      return parseInt(b.frontmatter.year) - parseInt(a.frontmatter.year);
    });
}

/**
 * Get all blog posts
 */
export async function getAllBlogPosts() {
  const files = await getMDXFiles('blog');

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      const post = await getMDXContent('blog', slug);
      return post;
    })
  );

  return posts
    .filter(Boolean)
    .sort((a, b) => {
      if (!a || !b) return 0;
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
}
