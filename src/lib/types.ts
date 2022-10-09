export enum FileType {
  Audio = "audio",
  Directory = "directory",
  Image = "image",
  Text = "text",
  Unknown = "unknown",
  Video = "video",
}

export interface FSNode {
  children?: FSNode[];
  isDirectory: boolean;
  name: string;
  path: string;
  mimeType?: string;
  type: FileType;
}
