import { Container } from "@gsandf/ui";
import { getFileTree, resolvePath } from "lib/server-utils";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import BasicLayout from "../templates/Basic";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <BasicLayout title="TODO">
      <Container $p={3}>
        <pre>{JSON.stringify(props, null, 2)}</pre>
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
