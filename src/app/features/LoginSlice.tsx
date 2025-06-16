import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstanse";
import type { AxiosError } from "axios";
import type { IAxiosError, IDataInputLogin, IDataResponse } from "../../interface";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieServices from "../../services/CookieServices";

const { toast } = createStandaloneToast();

export const userLogin = createAsyncThunk(
  "login/userLogin",

  async (user: IDataInputLogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.post("/auth/local", user);

      return data;
    } catch (error) {
      const errorOBJ = error as AxiosError<IAxiosError>;
      return rejectWithValue(
        errorOBJ.response?.data.error.message || "Error Not Found"
      );
    }
  }
);
interface IInitial {
  data: IDataResponse;
  error: string;
  loading: boolean;
}

const initialState: IInitial = {
  data: {jwt:'' ,user:{id:'',documentId:'',username:''}},
  loading: false,
  error: "",
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log("state.data =", JSON.stringify(state.data, null, 2));
        toast({
          title: 'Success Login',
          description: "Navigate To LoginPage",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // const date =new Date();
        // date.setTime(date.getTime()+ (1000 * 60 *60*24*2))
        // const options = {path:'/',expires:date};//فعلا اتقفل بعد يومين من نفسه م مهم تعمله وانت بتدرب بقا انت فاهم الفكره
        const options = {path:'/'};
        CookieServices.set('user', JSON.stringify(state.data) ,options)

        setTimeout(() => {
          location.replace("/");
        }, 1000);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        toast({
          title: state.error,
          description: "Please check your credentials.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  },
});

export default LoginSlice.reducer;
