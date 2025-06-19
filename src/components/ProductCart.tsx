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
import { productDetailsAction } from "../app/features/productDetailsSlice";
import { AddCart, removeCart, removeCartOne } from "../app/features/CartSlice";
//ICons

import { AiOutlinePlus , AiOutlineMinus, AiOutlineDelete} from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { textConstant } from "../utilities";


interface IProps {
  objectData: IProduct;
}
const ProductCart = ({ objectData }: IProps) => {
  //1- state
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //2- Handler
  const openProductDetails = (objectData: IProduct) => {
    dispatch(productDetailsAction(objectData));
    navigate("/productDetails");
  };
const Add =(product:IProduct)=>{
  dispatch(AddCart(product))
}

const remove =(product:IProduct)=>{
  dispatch(removeCart(product.id))
}
const removeOne =(product:IProduct)=>{
  dispatch(removeCartOne(product))
  if(product.Quantity === 1){
    remove(product)
  }
}
  //3-render

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
          <Image h={'200px'} w={'full'}
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
            <Text fontSize={"md"} >{textConstant(objectData?.description)}</Text>
            <Text color="purple.600" fontSize="2xl">
              {objectData?.price}
            </Text>
            <Text color="green.600" fontSize="2xl">
             Total Count =  {objectData.Quantity}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" justifyContent={"space-between"} w={'full'}>
            <Button variant="ghost" colorScheme="red" w={"full"} onClick={()=>remove(objectData)}>
              <AiOutlineDelete/> 
            </Button>
            
            <Button variant="solid" colorScheme="green" w={"full"}>
              <FaShoppingCart/>
            </Button>
            <Button variant="ghost" colorScheme="green" w={"full"} onClick={()=>removeOne(objectData)}>
              <AiOutlineMinus/> 
            </Button>
            <Button variant="solid" colorScheme="green" w={"full"} onClick={()=>Add(objectData)}>
              <AiOutlinePlus/> 
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCart;
