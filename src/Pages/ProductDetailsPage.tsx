import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { IProduct } from "../interface";
import { AddCart } from "../app/features/CartSlice";

const ProductDetailsPage = () => {
  //1- state
  const navigate = useNavigate();
  const { product } = useSelector((state: RootState) => state.productDetails);
  const dispatch = useDispatch();
  //2- handler
  const goBack = () => navigate(-1);
  const addToCartItem = (product: IProduct) => {
    dispatch(AddCart(product));
  };
  //3-handler
  return (
    <div className="mx-auto flex flex-col justify-end">
      <Button bg={"green.300"} onClick={goBack} my={"1rem"} mx={"auto"}>
        Go Back
      </Button>
      <Flex w={"80%"} mx={"auto"} my={"1rem"} flexDir={"column"}>
        <Card transition="all 1s ease" cursor="pointer">
          <CardBody as={Flex}  direction={{ base: "column", sm: "column", md: "row" }} gap={"3rem"}>
            <Image
              src={
                product.thumbnail?.url
                  ? `${product.thumbnail?.url}`
                  : `/img/my-1.jpg`
              }
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              w={{ base: "100%", sm: "200px", md: "300px", lg: "400px" }}
            />
            <Stack mt="6" spacing="3" >
              <Heading size="md" textAlign={"center"} py={3} rounded={"md"}>
                {product.title}
              </Heading>
              <Text whiteSpace="normal" wordBreak="break-word" overflow="hidden" fontSize="md">
                {product?.description}
              </Text>

              <Text color="purple.600" fontSize="2xl">
                {product?.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="green">
                Buy now
              </Button>
              <Button
                variant="ghost"
                colorScheme="green"
                onClick={() => addToCartItem(product)}
              >
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Flex>
    </div>
  );
};

export default ProductDetailsPage;
