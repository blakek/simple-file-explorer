import { Container, Stack } from "@gsandf/ui";
import { FileTree } from "components/FileTree";
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
      <Stack direction="row">
        <Container $p={3}>
          {props.fileTree.children?.map((file) => (
            <FileTree key={file.path} fileTree={file} />
          ))}
        </Container>

        <Container $p={3}>
          {selectedFile.type === "audio" && (
            <audio controls>
              <source
                src={`/api/file?path=${encodeURIComponent(selectedFile.path)}`}
                type={selectedFile.mimeType}
              />
            </audio>
          )}

          {selectedFile.type === "video" && (
            <video controls>
              <source
                src={`/api/file?path=${encodeURIComponent(selectedFile.path)}`}
                type={selectedFile.mimeType}
              />
            </video>
          )}
        </Container>
      </Stack>
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
