import * as Icons from "css.gg/icons/all";
import { FileType, FSNode } from "lib/types";
import Link from "next/link";
import styled from "styled-components";

export interface FileProps {
  file: FSNode;
}

export interface FileTreeProps {
  fileTree: FSNode;
}

const IconMap: Record<FileType, keyof typeof Icons> = {
  [FileType.Audio]: "Music",
  [FileType.Directory]: "Folder",
  [FileType.Image]: "Image",
  [FileType.Text]: "FileDocument",
  [FileType.Unknown]: "File",
  [FileType.Video]: "Camera",
};

const FileWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  padding: 0.15rem;

  &:hover {
    background-color: #eee;
  }
`;

export function MusicFile({ file }: FileProps) {
  return (
    <FileWrapper>
      <Icons.Music />
      {file.name}
    </FileWrapper>
  );
}

export function File(props: FileProps) {
  const Icon = Icons[IconMap[props.file.type]];

  return (
    <Link href={props.file.path}>
      <FileWrapper>
        <Icon />
        {props.file.name}
      </FileWrapper>
    </Link>
  );
}

export function FileTree(props: FileTreeProps) {
  return (
    <li style={{ listStyle: "none" }}>
      <File file={props.fileTree} />
      {props.fileTree.children && (
        <ul>
          {props.fileTree.children.map((child) => (
            <FileTree key={child.path} fileTree={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
