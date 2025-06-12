
import {Grid  } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
//import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstanse';
import { useQuery } from 'react-query';
import ErrorHandler from '../Error/ErrorHandler';

import type { IProduct } from '../interface';
import ProductSkelton from '../components/ProductSkelton';
const ProductsPage = () => {
 //1-state
  const getProducts = async()=>{
    const { data:resData } = await axiosInstance.get("/products?populate=thumbnail&populate=categories");
    return resData.data
  }

  const {data ,error,isLoading} =useQuery<IProduct[]>(['dataList'],getProducts);
  if(error) return <ErrorHandler/>
  if( isLoading ) return <Grid templateColumns={"repeat(auto-fill,minmax(300px,1fr))"} gap={6} px={7} my='1rem'>{Array.from({length:10},(_,i)=> <ProductSkelton key={i}/>)} </Grid> 
 
  return (
    <>
    <Grid templateColumns={"repeat(auto-fill,minmax(300px,1fr))"} gap={6} px={7} py={7}>
      {data && data.map((product,idx) =>{

    return <ProductCard  key={idx} objectData={product}/>
      })}
    
    </Grid>
    </>
  )
};

export default ProductsPage;
