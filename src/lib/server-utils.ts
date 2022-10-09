import { Dirent, Stats } from "node:fs";
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

async function getFileTreeRecursive(
  file: Dirent | Stats,
  parentPath: string
): Promise<FSNode> {
  const filePath =
    file instanceof Dirent ? path.join(parentPath, file.name) : parentPath;
  const fileName = file instanceof Dirent ? file.name : parentPath;
  const isDirectory = file.isDirectory();

  let additionalProps = {};

  if (isDirectory) {
    const childNodes = await fs.readdir(filePath, { withFileTypes: true });

    additionalProps = {
      children: await Promise.all(
        childNodes.map((child) => getFileTreeRecursive(child, filePath))
      ),
    };
  }

  const node: FSNode = {
    name: fileName,
    path: filePath,
    isDirectory,
    ...additionalProps,
  };

  fileTreeCache.set(filePath, node);
  return node;
}

export async function getFileTree(): Promise<FSNode> {
  if (!fileTreeCache.has(fsRoot)) {
    fileTreeCache.set(
      fsRoot,
      await getFileTreeRecursive(await fs.stat(fsRoot), fsRoot)
    );
  }

  return fileTreeCache.get(fsRoot)!;
}
