import { Container, Text } from "@gsandf/ui";
import Link from "next/link";
import React from "react";
import BasicLayout from "../templates/Basic";

export default function Home(): JSX.Element {
  return (
    <BasicLayout title="TODO">
      <Container $p={3}>
        <Text $textAlign="center" $width="full">
          Ready to go!
        </Text>
      </Container>
    </BasicLayout>
  );
}
