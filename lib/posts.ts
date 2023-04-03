import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

const getAllPostsData = () => {
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

    console.log(matterResult);
    console.log(matterResult.content);

    // Combine the data with the id
    return {
      id,
      data: matterResult.data,
      content: matterResult.content,
    };
  });
};

export function getSortedPostsData() {
  // Sort posts by date
  return getAllPostsData().sort((a, b) => {
    if (a.data.date && b.data.date && a.data.date < b.data.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
