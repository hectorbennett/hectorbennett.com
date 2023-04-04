import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

import matter, { GrayMatterFile } from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostData {
  id: string;
  data: {
    title: string;
    date: string;
  };
  content: string;
}

export interface Post extends PostData {
  html: string;
}

function getPostDataFromMatterResult(id: string, matterResult: GrayMatterFile<string>): PostData {
  return {
    id,
    data: {
      title: matterResult.data.title || "",
      date: matterResult.data.date || "",
    },
    content: matterResult.content,
  };
}

async function getPostFromMatterResult(
  id: string,
  matterResult: GrayMatterFile<string>,
): Promise<Post> {
  const postData = getPostDataFromMatterResult(id, matterResult);

  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(postData.content);

  return {
    ...postData,
    html: processedContent.toString(),
  };
}

function getAllPostsData(): Array<PostData> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    return getPostDataFromMatterResult(id, matterResult);
  });
}

export function getSortedPostsData(): Array<PostData> {
  // Sort posts by date
  return getAllPostsData().sort((a, b) => {
    if (a.data.date < b.data.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export const getAllPostIds = () =>
  fs.readdirSync(postsDirectory).map((fileName: string) => fileName.replace(/\.md$/, ""));

export async function getPost(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return getPostFromMatterResult(id, matterResult);
}
