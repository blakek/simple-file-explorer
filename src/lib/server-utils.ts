import { Dirent, Stats } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileTypes } from "./mime";
import { FileType, FSNode } from "./types";

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

function getMimeInfo(
  fileName: string,
  isDirectory: boolean
): Pick<FSNode, "mimeType" | "type"> {
  if (isDirectory) {
    return {
      type: FileType.Directory,
    };
  }

  const ext = path.extname(fileName).toLowerCase().slice(1);

  if (ext in fileTypes) {
    return {
      mimeType: fileTypes[ext].mimeType,
      type: fileTypes[ext].fileType,
    };
  }

  return { type: FileType.Unknown };
}

async function getFileTreeRecursive(
  file: Dirent | Stats,
  parentPath: string
): Promise<FSNode> {
  const filePath =
    file instanceof Dirent ? path.join(parentPath, file.name) : parentPath;
  const fileName = file instanceof Dirent ? file.name : parentPath;
  const isDirectory = file.isDirectory();

  const node: FSNode = {
    isDirectory,
    name: fileName,
    path: path.relative(fsRoot, filePath),
    ...getMimeInfo(fileName, isDirectory),
  };

  if (isDirectory) {
    const childNodes = await fs.readdir(filePath, { withFileTypes: true });

    node.children = await Promise.all(
      childNodes.flatMap((child) => {
        if (child.name.startsWith(".")) {
          return [];
        }

        return getFileTreeRecursive(child, filePath);
      })
    );
  }

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
