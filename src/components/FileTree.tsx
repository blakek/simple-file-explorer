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

const FileDetails = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0.25rem 0.5rem;

  &:hover {
    background-color: #eee;
  }
`;

const FileWrapper = styled.li`
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  list-style: none;
  padding-left: 2rem;
`;

export function MusicFile({ file }: FileProps) {
  return (
    <FileWrapper>
      <Icons.Music />
      {file.name}
    </FileWrapper>
  );
}

export function File(props: FileProps & { children?: React.ReactNode }) {
  const Icon = Icons[IconMap[props.file.type]];

  return (
    <>
      <Link href={props.file.path}>
        <FileWrapper>
          <FileDetails>
            <Icon />
            {props.file.name}
          </FileDetails>

          {props.children}
        </FileWrapper>
      </Link>
    </>
  );
}

export function FileTree(props: FileTreeProps) {
  return (
    <File file={props.fileTree}>
      {props.fileTree.children && (
        <ul style={{ margin: 0, padding: 0 }}>
          {props.fileTree.children.map((child) => (
            <FileTree key={child.path} fileTree={child} />
          ))}
        </ul>
      )}
    </File>
  );
}
