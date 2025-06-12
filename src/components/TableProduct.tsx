import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from "@chakra-ui/react";
import type { IProduct } from "../interface";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
interface IProps {
  products: IProduct[];
}
const TableProduct = ({ products }: IProps) => {
  return (
    <Table size="sm" variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th textAlign={"center"}>Name</Th>
          <Th textAlign={"center"}>Category</Th>
          <Th textAlign={"center"}>Price</Th>
          <Th textAlign={"center"}>Strock</Th>
          <Th textAlign={"center"}>Edit</Th>
          <Th textAlign={"center"}>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr
            fontSize={""}
            key={product.id}
            _hover={{ bg: "green.200", cursor: "pointer" }}
          >
            <Td textAlign={"center"}>{product.title}</Td>
            <Td textAlign={"center"}>{product.title}</Td>
            <Td textAlign={"center"}>{product.price}</Td>
            <Td textAlign={"center"}>{product.stock}</Td>
            <Td textAlign={"center"} color={"green.400"}>
              {" "}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="green.400"
                fontSize="2xl"
              >
                <AiOutlineEdit />
              </Box>
            </Td>
            <Td color={"red.400"}>
              ,
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                fontSize="2xl"
              >
                <AiOutlineDelete />
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableProduct;
