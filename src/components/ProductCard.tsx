import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import type { IProduct } from "../interface";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddCart } from "../app/features/CartSlice";
import { productDetailsAction } from "../app/features/productDetailsSlice";
import { textConstant } from "../utilities";

interface IProps {
  objectData: IProduct;
}
const ProductCard = ({ objectData }: IProps) => {
  //1- state
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //2- Handler
  const openProductDetails = (objectData: IProduct) => {
    navigate("/productDetails");
    dispatch(productDetailsAction(objectData));
  };
  const addToCartItem = (product: IProduct) => {
    dispatch(AddCart(product));
  };

  //3-render
  console.log(objectData);

  return (
    <div>
      <Card
        transition="all 1s ease"
        cursor="pointer"
        _hover={{
          bg: colorMode === "light" ? "blackAlpha.400" : " whiteAlpha.400",
          color: colorMode === "light" ? "#000" : "#FFF",
        }}
      >
        <CardBody onClick={() => openProductDetails(objectData)}>
          <Image
            h={"200px"}
            w={"full"}
            src={
              objectData.thumbnail?.url
                ? `${
                    objectData.thumbnail.url
                  }`
                : "/img/my-1.jpg"
            }
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"} py={3} rounded={"md"}>
              {objectData.title}
            </Heading>
            <Text fontSize={"md"}>{textConstant(objectData?.description)}</Text>

            <Text color="purple.600" fontSize="2xl">
              {objectData?.price}
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
              onClick={() => addToCartItem(objectData)}
            >
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
