import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../interface";

import { createStandaloneToast } from '@chakra-ui/react';

// Define a type for the slice state
interface IInitial {
  product: IProduct[];
  salaryAll:number,
}

////////Present Data
/**
 * 
 * {
    id:'',
    description:'',
    documentId:'',
    createdAt:'',
    price:0,
    publishedAt:'',
    stock:0,
    thumbnail:{
        url:''
    },
    title:"",
    updatedAt:"", 
  }
 */
// Define the initial state using that type

const getInitialState = (): IInitial => {
  const stored = localStorage.getItem("cartItem");
  const StoredSalaryALL =localStorage.getItem('cartSalary');
  return {
    product: stored ? JSON.parse(stored) : [],
    salaryAll:StoredSalaryALL? +StoredSalaryALL:0,
  };
};
const initialState: IInitial = getInitialState();
const {toast} = createStandaloneToast()
export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    AddCart: (state, action: PayloadAction<IProduct>) => {
      const Product = state.product.find(
        (p) => p.id === action.payload.id
      );

      if (Product) {
        Product.Quantity = (Product.Quantity || 1) + 1;
        toast({
          title: ` Quantity ++ = ${Product.Quantity}` ,
          description: "Already Found Cart",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        state.product.push({ ...action.payload, Quantity: 1 });
        toast({
          title: ` Add Product ` ,
          description: "Add Product To Cart Quantity = 1",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      localStorage.setItem("cartItem", JSON.stringify(state.product));
      
    },
    removeAllAction:(state)=>{
      state.product=[];
      state.salaryAll=0;
      localStorage.setItem('cartSalary','0');
      toast({
          title: `Remove All  ` ,
          description: "Remove All Product To Cart ",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    },
    removeCart: (state, action: PayloadAction<string>) => {
      state.product = state.product.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("cartItem", JSON.stringify(state.product));
      toast({
          title: `Remove This Product ` ,
          description: `Remove Product id ${action.payload} To Cart Quantity = 1`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    },
    removeCartOne: (state, action: PayloadAction<IProduct>) => {
      state.product = state.product.map((product) =>
        product.id === action.payload.id
          ? { ...product, Quantity: (product.Quantity || 1) - 1 }
          : product
      );
      localStorage.setItem("cartItem", JSON.stringify(state.product));
      toast({
          title: `Remove This Product ` ,
          description: `Remove Product title ${action.payload.title} To Cart Quantity ${action.payload.Quantity}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    },
    salaryAllAction:(state)=>{
      state.salaryAll = state.product.reduce((sum ,product)=> sum += (product.Quantity || 1) * product.price , 0);
      localStorage.setItem('cartSalary',String(state.salaryAll))
    }
  },
});

export const { AddCart, removeCart, removeCartOne,salaryAllAction ,removeAllAction} = cartSlice.actions;

export default cartSlice.reducer;
