import { FSNode } from "lib/types";

export interface FileTreeProps {
  fileTree: FSNode;
}

export function FileTree(props: FileTreeProps) {
  return (
    <li>
      {props.fileTree.name}
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
