import * as Icons from "css.gg/icons/all";
import { FileType, FSNode } from "lib/types";
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
  display: flex;
  gap: 0.5rem;
`;

export function File(props: FileProps) {
  const Icon = Icons[IconMap[props.file.type]];

  return (
    <FileWrapper>
      <Icon />
      {props.file.name}
    </FileWrapper>
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
