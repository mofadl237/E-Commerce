import { Skeleton, Stack } from "@chakra-ui/react";

const TableSkelton = () => {
  return (
    <Stack mx={'auto'} display="flex" flexDir={'row'} gap={6} my={3}>
      <Skeleton height="10px" w="180px" />
      <Skeleton height="10px" w="180px" />
      <Skeleton height="10px" w="180px" />
      <Skeleton height="10px" w="180px" />
      <Skeleton height="10px" w="180px" />
      <Skeleton
        startColor="green.100"
        endColor="green.400"
        height="20px"
        w="50px"
      />
      <Skeleton
        startColor="red.900"
        endColor="red.400"
        height="20px"
        w="50px"
      />
    </Stack>
  );
};

export default TableSkelton;
