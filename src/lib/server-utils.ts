import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

type FSNode = {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FSNode[];
};

const rawFsRoot = process.env.FS_ROOT ?? process.cwd();

// Node.js path doesn't resolve `~` to the user's home directory
const fsRoot = rawFsRoot.replace(
  RegExp(`^~(${path.sep}|$)`),
  path.join(os.homedir(), path.sep)
);

export function resolvePath(relativePath: string): string {
  return path.join(fsRoot, relativePath);
}

const fileTreeCache = new Map<string, FSNode>();

async function getFileTreeRecursive(currentRoot: string) {
  const files = await fs.readdir(currentRoot, { withFileTypes: true });
  const visibleFiles = files.filter((file) => !file.name.startsWith("."));

  return await Promise.all(
    visibleFiles.map(async (file) => {
      const filePath = path.join(currentRoot, file.name);
      const isDirectory = file.isDirectory();

      const node: FSNode = {
        isDirectory: isDirectory,
        name: file.name,
        path: filePath,
      };

      if (isDirectory) {
        node.children = await getFileTreeRecursive(filePath);
      }

      fileTreeCache.set(filePath, node);

      return node;
    })
  );
}

export async function getFileTree(): Promise<FSNode> {
  if (!fileTreeCache.has(fsRoot)) {
    fileTreeCache.set(fsRoot, {
      children: await getFileTreeRecursive(fsRoot),
      isDirectory: true,
      name: fsRoot,
      path: fsRoot,
    });
  }

  return Promise.resolve(fileTreeCache.get(fsRoot)!);
}
