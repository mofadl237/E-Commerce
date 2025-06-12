import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import ProductCart from "../components/ProductCart";
import { useEffect } from "react";
import { removeAllAction, salaryAllAction } from "../app/features/CartSlice";
import { AiOutlineDelete } from "react-icons/ai";

const CartItemPage = () => {
  const { product, salaryAll } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  //2-Handler 
  const removeAll =()=>{
dispatch(removeAllAction())
  }
  useEffect(() => {
    dispatch(salaryAllAction());
  }, [product, dispatch]);
  return (
    <>
      <Grid
        templateColumns={"repeat(auto-fill,minmax(300px,1fr))"}
        gap={6}
        px={7}
      >
        {product &&
          product.map((product, idx) => {
            return <ProductCart key={idx} objectData={product} />;
          })}
      </Grid>
      {product.length > 0 ? (
        <Flex mx={7} my={3}  textAlign={'center'} gap={3} alignItems={'center'} justifyContent={'space-between'}>
          <Box as={Button} bg={'green.400'} rounded={'.4rem'} p={6} flexGrow={4}>{`Salary All = ${salaryAll}`}</Box>
          <Box as={Button}   textColor={'red.300'} rounded={'.4rem'}  py={6} flexGrow={1} onClick={removeAll}  > <AiOutlineDelete/> </Box>
        </Flex>
        
      ) : (
        <Flex
          bg={"green.600"}
          align={"center"}
          justify={"center"}
          height={"80vh"}
        >
          Not Add Product Yet !!
        </Flex>
      )}
    </>
  );
};

export default CartItemPage;
