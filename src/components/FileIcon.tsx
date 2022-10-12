import { FileType, FSNode } from "lib/types";
import { IconType } from "react-icons";
import * as Icons from "react-icons/fi";

export interface FileIconProps {
  file: FSNode;
  isSelected: boolean;
}

const IconMap: Record<FileType, (selected: boolean) => IconType> = {
  [FileType.Audio]: (selected) =>
    selected ? Icons.FiPlayCircle : Icons.FiMusic,
  [FileType.Directory]: () => Icons.FiFolder,
  [FileType.Image]: () => Icons.FiImage,
  [FileType.Text]: () => Icons.FiFileText,
  [FileType.Unknown]: () => Icons.FiFile,
  [FileType.Video]: (selected) =>
    selected ? Icons.FiPlayCircle : Icons.FiVideo,
};

export function FileIcon(props: FileIconProps) {
  const Icon = IconMap[props.file.type](props.isSelected);
  return <Icon />;
}
