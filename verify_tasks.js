const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const TASKS_DIR = path.join(process.cwd(), "posts/tasks");
const MDX_EXTENSION = ".mdx";

function getTaskData(id) {
  // Replicating logic from lib/get-data.js
  const fullPath = path.join(TASKS_DIR, id + MDX_EXTENSION);

  console.log('Checking path:', fullPath);
  
  if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found at ${fullPath}`);
  }

  // get MD metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // get metadata, content
  const { data, content } = matter(fileContents);

  const metadata = data;
  metadata["id"] = id;

  return { metadata, content };
}

async function verify() {
  try {
    const id = '001_initialize_project'; // This file was renamed from .md to .mdx
    const data = getTaskData(id);
    if (data && data.metadata && data.content) {
      console.log('SUCCESS: Successfully loaded task data for', id);
      console.log('Title:', data.metadata.title);
    } else {
      console.error('FAILURE: Data returned was incomplete');
      process.exit(1);
    }
  } catch (error) {
    console.error('FAILURE: Error loading task data:', error);
    process.exit(1);
  }
}

verify();
