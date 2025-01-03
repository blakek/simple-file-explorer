import { Container } from "@gsandf/ui";
import { FileTree } from "components/FileTree";
import { MediaPlayer } from "components/MediaPlayer";
import { getFileTree, getSelectedFile, resolvePath } from "lib/server-utils";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import {
  ShortcutRule,
  useKeyboardShortcuts,
} from "src/hooks/useKeyboardShortcuts";
import BasicLayout from "../templates/Basic";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  const title = props.selectedFile.isDirectory
    ? props.selectedFile.path
    : props.selectedFile.name;

  const mediaPlayerRef = React.useRef<HTMLMediaElement | null>(null);

  const closeMediaPlayer = React.useCallback(() => {
    const player = mediaPlayerRef.current;
    if (!player) return;
    // Unset the selected file which will hide the media player
    const currentPathParts = router.query.path as string[];
    const parentPathParts = currentPathParts.slice(0, -1);
    const parentPath = `/${parentPathParts.join("/")}`;
    router.push(parentPath);
  }, [router]);

  const shortcuts = React.useMemo<ShortcutRule[]>(() => {
    return [
      {
        test: " ",
        handler: () => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          player.paused ? player.play() : player.pause();
        },
      },
      {
        test: "ArrowLeft",
        handler: () => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          player.currentTime -= 5;
        },
      },
      {
        test: "ArrowRight",
        handler: () => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          player.currentTime += 5;
        },
      },
      {
        test: "ArrowUp",
        handler: () => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          player.volume = Math.min(1, player.volume + 0.1);
        },
      },
      {
        test: "ArrowDown",
        handler: () => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          player.volume = Math.max(0, player.volume - 0.1);
        },
      },
      {
        test: "Escape",
        handler: closeMediaPlayer,
      },
      {
        test: "f",
        handler: () => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            player.requestFullscreen();
          }
        },
      },
      {
        test: "m",
        handler: () => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          player.muted = !player.muted;
        },
      },
      {
        test: "p",
        handler: () => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
          } else if (player instanceof HTMLVideoElement) {
            player.requestPictureInPicture();
          }
        },
      },
      {
        test: "s",
        handler: () => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          const rates = [0.5, 1, 1.5, 2];
          const rateIndex = rates.indexOf(player.playbackRate) ?? 0;
          const nextRateIndex = (rateIndex + 1) % rates.length;
          player.playbackRate = rates[nextRateIndex];
        },
      },
      {
        test: /([0-9])/,
        handler: (event) => {
          const player = mediaPlayerRef.current;
          if (!player) return;
          // Set the duration to the percentage of the video
          const percentage = parseInt(event.key) * 10;
          player.currentTime = (player.duration * percentage) / 100;
        },
      },
    ];
  }, [mediaPlayerRef, router]);

  useKeyboardShortcuts(shortcuts);

  // Auto-start the media player when the selected file changes
  React.useEffect(() => {
    mediaPlayerRef.current?.load();
    mediaPlayerRef.current?.play();

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    return () => {
      mediaPlayerRef.current?.pause();
    };
  }, [props.selectedFile]);

  return (
    <BasicLayout title={title}>
      <Container $p={3}>
        {props.fileTree.children?.map((file) => (
          <FileTree
            depth={0}
            key={file.path}
            fileTree={file}
            selectedFile={props.selectedFile}
          />
        ))}
      </Container>

      <MediaPlayer
        file={props.selectedFile}
        mediaPlayerRef={mediaPlayerRef}
        onClose={closeMediaPlayer}
      />
    </BasicLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const path = resolvePath(context.resolvedUrl);
  const pathParts = (context.query.path ?? []) as string[];
  const fileTree = await getFileTree();

  const selectedFile = getSelectedFile(fileTree, pathParts);

  return {
    props: {
      path,
      pathParts,
      fileTree,
      selectedFile,
    },
  };
}
