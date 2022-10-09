import { Container } from "@gsandf/ui";
import { FileTree } from "components/FileTree";
import { getFileTree, resolvePath } from "lib/server-utils";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import BasicLayout from "../templates/Basic";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <BasicLayout title={props.fileTree.path}>
      <Container $p={3}>
        {props.fileTree.children?.map((file) => (
          <FileTree fileTree={file} />
        ))}
      </Container>
    </BasicLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const path = resolvePath(context.resolvedUrl);

  return {
    props: {
      path,
      fileTree: await getFileTree(),
    },
  };
}
