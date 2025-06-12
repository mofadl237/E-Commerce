
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import type { IProduct } from '../interface';
import { AddCart } from '../app/features/CartSlice';

const ProductDetailsPage = () => {
    //1- state
    const navigate = useNavigate();
    const {product}=useSelector((state:RootState)=>state.productDetails)
   const dispatch=useDispatch();
    //2- handler
    const goBack = () => navigate(-1);
    const addToCartItem =(product:IProduct)=>{
      dispatch(AddCart(product))
    }
    //3-handler
  return (
    <div className='mx-auto flex flex-col justify-end'>
    
    <Button bg={'green.300'} onClick ={goBack} my={'1rem'} mx={'auto'}>Go Back</Button>
    <Flex w='sm' mx={'auto'} my={'1rem'}>
     
      
       
            <Card
              transition="all 1s ease"
              cursor="pointer"
             
            >
              <CardBody>
                <Image 
                  src={`${import.meta.env.VITE_SERVER_URL}${
                    product.thumbnail.url
                  }`}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md" textAlign={"center"} py={3} rounded={"md"}>
                    {product.title}
                  </Heading>
                  <Text fontSize={"md"}>{product?.description}</Text>
      
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
  )
}

export default ProductDetailsPage