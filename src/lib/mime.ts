import { FileType } from "./types";

interface MimeInfo {
  fileType: FileType;
  mimeType: string;
}

export const fileTypes: Record<string, MimeInfo> = {
  "3gp": {
    fileType: FileType.Video,
    mimeType: "video/3gpp",
  },
  "3g2": {
    fileType: FileType.Video,
    mimeType: "video/3gpp2",
  },
  aac: {
    fileType: FileType.Audio,
    mimeType: "audio/aac",
  },
  apng: {
    fileType: FileType.Image,
    mimeType: "image/apng",
  },
  avi: {
    fileType: FileType.Video,
    mimeType: "video/x-msvideo",
  },
  avif: {
    fileType: FileType.Image,
    mimeType: "image/avif",
  },
  css: {
    fileType: FileType.Text,
    mimeType: "text/css",
  },
  csv: {
    fileType: FileType.Text,
    mimeType: "text/csv",
  },
  flac: {
    fileType: FileType.Audio,
    mimeType: "audio/flac",
  },
  gif: {
    fileType: FileType.Image,
    mimeType: "image/gif",
  },
  jpeg: {
    fileType: FileType.Image,
    mimeType: "image/jpeg",
  },
  jpg: {
    fileType: FileType.Image,
    mimeType: "image/jpeg",
  },
  js: {
    fileType: FileType.Text,
    mimeType: "text/javascript",
  },
  json: {
    fileType: FileType.Text,
    mimeType: "application/json",
  },
  m4a: {
    fileType: FileType.Audio,
    mimeType: "audio/mp4",
  },
  md: {
    fileType: FileType.Text,
    mimeType: "text/markdown",
  },
  mp3: {
    fileType: FileType.Audio,
    mimeType: "audio/mpeg",
  },
  mp4: {
    fileType: FileType.Video,
    mimeType: "video/mp4",
  },
  mpeg: {
    fileType: FileType.Video,
    mimeType: "video/mpeg",
  },
  oga: {
    fileType: FileType.Audio,
    mimeType: "audio/ogg",
  },
  ogg: {
    fileType: FileType.Audio,
    mimeType: "audio/ogg",
  },
  ogv: {
    fileType: FileType.Video,
    mimeType: "video/ogg",
  },
  png: {
    fileType: FileType.Image,
    mimeType: "image/png",
  },
  svg: {
    fileType: FileType.Image,
    mimeType: "image/svg+xml",
  },
  txt: {
    fileType: FileType.Text,
    mimeType: "text/plain",
  },
  wav: {
    fileType: FileType.Audio,
    mimeType: "audio/wav",
  },
  weba: {
    fileType: FileType.Audio,
    mimeType: "audio/webm",
  },
  webm: {
    fileType: FileType.Video,
    mimeType: "video/webm",
  },
  webp: {
    fileType: FileType.Image,
    mimeType: "image/webp",
  },
};
