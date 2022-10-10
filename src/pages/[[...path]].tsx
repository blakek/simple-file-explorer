import { Container } from "@gsandf/ui";
import { FileTree } from "components/FileTree";
import { MediaPlayer } from "components/MediaPlayer";
import { getFileTree, resolvePath } from "lib/server-utils";
import { FSNode } from "lib/types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import BasicLayout from "../templates/Basic";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const selectedFile = props.pathParts.reduce((tree, pathPart) => {
    return tree.children?.find((child) => child.name === pathPart) ?? tree;
  }, props.fileTree as FSNode);

  return (
    <BasicLayout title={props.fileTree.path}>
      <Container $p={3}>
        {props.fileTree.children?.map((file) => (
          <FileTree
            key={file.path}
            fileTree={file}
            selectedFile={selectedFile}
          />
        ))}
      </Container>

      <MediaPlayer file={selectedFile} />
    </BasicLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const path = resolvePath(context.resolvedUrl);
  const pathParts = (context.query.path ?? []) as string[];

  return {
    props: {
      path,
      pathParts,
      fileTree: await getFileTree(),
    },
  };
}
