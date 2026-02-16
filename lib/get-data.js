const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ABOUT_DIR = path.join(process.cwd(), "posts/about");
const PROJECTS_DIR = path.join(process.cwd(), "posts/projects");
const CHATS_DIR = path.join(process.cwd(), "posts/chats");
const TASKS_DIR = path.join(process.cwd(), "posts/tasks");
const ESSAYS_DIR = path.join(process.cwd(), "posts/essays");
const MDX_EXTENSION = ".mdx";

function getAllFilesInDirectory(dir) {
  const fileNames = fs.readdirSync(dir);
  return fileNames.map((fileName) => {
    return path.parse(fileName);
  });
}

function getMdxFiles(dir) {
  const allFiles = getAllFilesInDirectory(dir);
  return allFiles.filter((parsedFile) => parsedFile.ext == MDX_EXTENSION);
}

export function getAllProjectsPath() {
  const allMdxFiles = getMdxFiles(PROJECTS_DIR);
  return allMdxFiles.map((parsedFile) => {
    return {
      params: {
        id: parsedFile.name,
      },
    };
  });
}

export function getAllEssaysPath() {
  const allMdxFiles = getMdxFiles(ESSAYS_DIR);
  return allMdxFiles.map((parsedFile) => {
    return {
      params: {
        id: parsedFile.name,
      },
    };
  });
}

export function getProjectsMetaData() {
  const allMdxFiles = getMdxFiles(PROJECTS_DIR);

  const postsMetaData = allMdxFiles.map((parsedFile) => {
    const fullPath = path.join(PROJECTS_DIR, parsedFile.base);
    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // get metadata, content
    const { data } = matter(fileContents);
    const metadata = { ...data };
    metadata["id"] = parsedFile.name;
    return metadata;
  });
  postsMetaData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return postsMetaData;
}

export function getEssaysMetaData() {
  const allMdxFiles = getMdxFiles(ESSAYS_DIR);

  const postsMetaData = allMdxFiles.map((parsedFile) => {
    const fullPath = path.join(ESSAYS_DIR, parsedFile.base);
    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // get metadata, content
    const { data } = matter(fileContents);
    const metadata = { ...data };
    metadata["id"] = parsedFile.name;
    return metadata;
  });
  postsMetaData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return postsMetaData;
}

export function getProjectData(id) {
  const fullPath = path.join(PROJECTS_DIR, id + MDX_EXTENSION);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // get metadata, content
  const { data, content } = matter(fileContents);

  const metadata = data;
  metadata["id"] = id;

  return { metadata, content };
}

export function getEssayData(id) {
  const fullPath = path.join(ESSAYS_DIR, id + MDX_EXTENSION);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // get metadata, content
  const { data, content } = matter(fileContents);

  const metadata = data;
  metadata["id"] = id;

  return { metadata, content };
}

export function getAboutData(id) {
  const fullPath = path.join(ABOUT_DIR, "about.mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { metadata: data, content };
}

// Docs functions
export function getAllChatsPath() {
  const allMdxFiles = getMdxFiles(CHATS_DIR);
  return allMdxFiles.map((parsedFile) => {
    return {
      params: {
        id: parsedFile.name,
      },
    };
  });
}

export function getChatData(id) {
  const fullPath = path.join(CHATS_DIR, id + MDX_EXTENSION);

  // get MD metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // get metadata, content
  const { data, content } = matter(fileContents);

  const metadata = data;
  metadata["id"] = id;

  return { metadata, content };
}

// Tasks functions
export function getAllTasksPath() {
  const allMdxFiles = getMdxFiles(TASKS_DIR);
  return allMdxFiles.map((parsedFile) => {
    return {
      params: {
        id: parsedFile.name,
      },
    };
  });
}

export function getTaskData(id) {
  const fullPath = path.join(TASKS_DIR, id + MDX_EXTENSION);

  // get MD metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // get metadata, content
  const { data, content } = matter(fileContents);

  const metadata = data;
  metadata["id"] = id;

  return { metadata, content };
}
