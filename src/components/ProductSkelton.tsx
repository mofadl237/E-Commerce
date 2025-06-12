import { Skeleton, Stack } from "@chakra-ui/react";

const Demo = () => {
  return (
    <Stack gap="2" maxW="xs">
      <Skeleton height="200px" />
      <Skeleton height="10px" w="80px" mx={"auto"} />
      <Skeleton height="10px" w="80%" mx={"auto"} />
      <Skeleton height="10px" w="80px" mx={"auto"} />
    </Stack>
  );
};
export default Demo;
