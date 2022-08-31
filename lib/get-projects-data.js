const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// current 'posts' directory
const projectsDirectory = path.join(process.cwd(), "posts/projects");
const MDX_EXTENSION = ".mdx";

function getAllFilesInDirectory() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => {
    return path.parse(fileName);
  });
}

function getMdxFiles() {
  const allFiles = getAllFilesInDirectory();
  return allFiles.filter((parsedFile) => parsedFile.ext == MDX_EXTENSION);
}

export function getAllProjectsPath() {
  const allMdxFiles = getMdxFiles();
  return allMdxFiles.map((parsedFile) => {
    return {
      params: {
        id: parsedFile.name,
      },
    };
  });
}

export function getProjectsMetaData() {
  const allMdxFiles = getMdxFiles();

  const postsMetaData = allMdxFiles.map((parsedFile) => {
    const fullPath = path.join(projectsDirectory, parsedFile.base);
    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // get metadata, content
    const { data } = matter(fileContents);
    let metadata = { ...data };
    metadata["id"] = parsedFile.name;
    return metadata;
  });
  return postsMetaData;
}

export function getProjectData(id) {
  const fullPath = path.join(projectsDirectory, id + MDX_EXTENSION);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // get metadata, content
  const { data, content } = matter(fileContents);

  let metadata = data;
  metadata["id"] = id;

  return { metadata, content };
}
