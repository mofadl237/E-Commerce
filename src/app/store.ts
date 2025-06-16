import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/LoginSlice'; 
import  cartSlice  from './features/CartSlice';
import  ProductDetailsSlice from './features/productDetailsSlice';
import { apiSlice } from './Services/GetProductDash';

export const store = configureStore({
  reducer: {
    login:loginReducer,
    cart:cartSlice,
    productDetails:ProductDetailsSlice,
    [apiSlice.reducerPath]:apiSlice.reducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch