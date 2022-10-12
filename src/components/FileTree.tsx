import { Text } from "@gsandf/ui";
import { FSNode } from "lib/types";
import Link from "next/link";
import styled, { css } from "styled-components";
import { FileIcon } from "./FileIcon";

export interface FileProps {
  children?: React.ReactNode;
  file: FSNode;
  isSelected: boolean;
}

export interface FileTreeProps {
  fileTree: FSNode;
  selectedFile?: FSNode;
}

const FileDetails = styled.div<{ isSelected?: boolean }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0.25rem 1rem;

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

const FileWrapper = styled.li`
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  list-style: none;
  padding-left: 2rem;
`;

export function File(props: FileProps) {
  return (
    <>
      <Link href={props.file.path} scroll={false}>
        <FileWrapper>
          <FileDetails isSelected={props.isSelected}>
            <FileIcon file={props.file} isSelected={props.isSelected} />
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
      file={props.fileTree}
      isSelected={props.selectedFile?.path === props.fileTree.path}
    >
      {props.fileTree.children && (
        <ul style={{ margin: 0, padding: 0 }}>
          {props.fileTree.children.map((child) => (
            <FileTree
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
