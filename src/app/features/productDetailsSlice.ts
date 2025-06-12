import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../interface'

// Define a type for the slice state
interface IInitial {
  product: IProduct;
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
const initialState: IInitial = {
  product:{
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
}

export const ProductDetailsSlice = createSlice({
  name: 'productDetails',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    productDetailsAction: (state,action:PayloadAction<IProduct>) => {
      state.product =  action.payload;
    },

  },
})

export const {productDetailsAction} = ProductDetailsSlice.actions

export default ProductDetailsSlice.reducer