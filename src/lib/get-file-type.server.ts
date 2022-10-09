import { FileType } from "./types";

export const fileTypes: Record<string, FileType> = {
  aac: FileType.Audio,
  flac: FileType.Audio,
  gif: FileType.Image,
  jpeg: FileType.Image,
  jpg: FileType.Image,
  m4a: FileType.Audio,
  md: FileType.Text,
  mp3: FileType.Audio,
  mp4: FileType.Video,
  ogg: FileType.Audio,
  png: FileType.Image,
  txt: FileType.Text,
  wav: FileType.Audio,
  webm: FileType.Video,
};
