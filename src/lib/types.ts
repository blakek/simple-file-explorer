export interface FSNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FSNode[];
}
