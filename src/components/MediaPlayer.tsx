import { Box, Stack, Text } from "@gsandf/ui";
import { FileType, FSNode } from "lib/types";
import * as React from "react";
import styled from "styled-components";

export interface MediaPlayerProps {
  file: FSNode;
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

export function MediaPlayer(props: MediaPlayerProps) {
  const isKnownMediaFile =
    props.file.type === FileType.Audio || props.file.type === FileType.Video;

  if (!isKnownMediaFile) {
    return null;
  }

  const MediaElement =
    props.file.type === FileType.Audio ? AudioPlayer : VideoPlayer;

  const mediaPlayerRef = React.useRef<any>();

  React.useEffect(() => {
    mediaPlayerRef.current?.load();
    mediaPlayerRef.current?.play();

    return () => {
      mediaPlayerRef.current?.pause();
    };
  }, [props.file]);

  return (
    <>
      <Box $height="calc(40vmin + 5rem)" $width="full" />

      <Bar>
        <Text $fontSize={3} $fontWeight="bolder">
          {props.file.name}
        </Text>

        <MediaElement controls ref={mediaPlayerRef}>
          <source
            src={`/api/file?path=${encodeURIComponent(props.file.path)}`}
            type={props.file.mimeType}
          />
        </MediaElement>
      </Bar>
    </>
  );
}
