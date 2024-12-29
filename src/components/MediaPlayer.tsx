import { Box, Stack, Text } from "@gsandf/ui";
import { FileType, FSNode } from "lib/types";
import * as React from "react";
import * as Icon from "react-icons/fi";
import styled from "styled-components";

export interface MediaPlayerProps {
  file: FSNode;
  mediaPlayerRef: React.RefObject<HTMLAudioElement | HTMLVideoElement | null>;
  onClose?: () => void;
}

const AudioPlayer = styled.audio``;

const VideoPlayer = styled.video`
  height: 40vmin;
`;

const Bar = styled(Stack)`
  background-color: ${(props) => props.theme.colors.accent};
  bottom: 0;
  color: ${(props) => props.theme.colors.onAccent};
  display: flex;
  justify-content: center;
  left: 0;
  padding: 1rem;
  padding-bottom: calc(env(safe-area-inset-bottom) + 2rem);
  position: fixed;
  right: 0;

  & > audio,
  & > video {
    width: 100%;
  }
`;

const CloseButton = styled("button")`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
`;

const TitleArea = styled(Stack)`
  align-items: baseline;
  flex-direction: row;
  gap: 0.5rem;
`;

export function MediaPlayer(props: MediaPlayerProps) {
  const isKnownMediaFile =
    props.file.type === FileType.Audio || props.file.type === FileType.Video;

  const MediaElement =
    props.file.type === FileType.Audio ? AudioPlayer : VideoPlayer;

  if (!isKnownMediaFile) {
    return null;
  }

  return (
    <>
      <Box $height="calc(40vmin + 5rem)" $width="full" />

      <Bar>
        <TitleArea>
          <CloseButton onClick={props.onClose}>
            <Icon.FiX />
          </CloseButton>

          <Text $fontSize={3} $fontWeight="bolder">
            {props.file.name}
          </Text>
        </TitleArea>

        <MediaElement controls ref={props.mediaPlayerRef as any}>
          <source
            src={`/api/file?path=${encodeURIComponent(props.file.path)}`}
            type={props.file.mimeType}
          />
        </MediaElement>
      </Bar>
    </>
  );
}
