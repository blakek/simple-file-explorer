import { Text } from "@gsandf/ui";
import { FileType, FSNode } from "lib/types";
import Link from "next/link";
import * as Icons from "react-icons/fi";
import styled, { css } from "styled-components";

export interface FileProps {
  children?: React.ReactNode;
  depth?: number;
  file: FSNode;
  isSelected?: boolean;
}

export interface FileTreeProps {
  depth?: number;
  fileTree: FSNode;
  selectedFile?: FSNode;
}

const IconMap: Record<FileType, keyof typeof Icons> = {
  [FileType.Audio]: "FiMusic",
  [FileType.Directory]: "FiFolder",
  [FileType.Image]: "FiImage",
  [FileType.Text]: "FiFileText",
  [FileType.Unknown]: "FiFile",
  [FileType.Video]: "FiVideo",
};

const FileDetails = styled.div<{ depth: number; isSelected?: boolean }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0.25rem 1rem;
  padding-left: ${(props) => props.depth * 2}rem;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.onPrimary};
    `}

  &:hover {
    background-color: ${(props) => props.theme.colors.darken};
    color: ${(props) => props.theme.colors.onDarken};
  }
`;

const FileWrapper = styled.li<{ depth?: number }>`
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  list-style: none;
`;

export function File(props: FileProps) {
  const Icon = props.isSelected
    ? Icons.FiPlayCircle
    : Icons[IconMap[props.file.type]];

  return (
    <>
      <Link href={props.file.path} scroll={false}>
        <FileWrapper>
          <FileDetails depth={props.depth} isSelected={props.isSelected}>
            <Icon />
            <Text maxLineCount={1}>{props.file.name}</Text>
          </FileDetails>

          {props.children}
        </FileWrapper>
      </Link>
    </>
  );
}

export function FileTree(props: FileTreeProps) {
  return (
    <File
      depth={props.depth}
      file={props.fileTree}
      isSelected={props.selectedFile?.path === props.fileTree.path}
    >
      {props.fileTree.children && (
        <ul style={{ margin: 0, padding: 0 }}>
          {props.fileTree.children.map((child) => (
            <FileTree
              depth={props.depth ? props.depth + 1 : 1}
              key={child.path}
              fileTree={child}
              selectedFile={props.selectedFile}
            />
          ))}
        </ul>
      )}
    </File>
  );
}
