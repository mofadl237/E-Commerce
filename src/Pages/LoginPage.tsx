import { FormLoginData } from "../data";
import { useForm, type SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import ErrorMessage from "./../Error/ErrorMessage";
import Input from "../components/UI/Input";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../app/features/LoginSlice";
import type { IDataInputLogin } from "../interface";
import { Button, Heading } from "@chakra-ui/react";



const LoginPage = () => {
  //1- state

  const { loading } = useSelector((state: RootState) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataInputLogin>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<IDataInputLogin> = async (data) => {
    // try {
    //   const { status, data: resData } = await axiosInstance.post(
    //     "/auth/local",
    //     data
    //   );
    //   if(status===200){
    //     console.log(resData)
    //     setTimeout(()=>{
    //       location.replace('/')
    //     },1000)
    //   }
    // } catch (error) {
    //   const errorOBJ = error as AxiosError<IAxiosError>;
    //   console.log(errorOBJ.response?.data.error.message)
    // }

    //===> Using Redux
    dispatch(userLogin(data));

    ///// Get Data User me For Image
  
    
  };
  //2-handler

  //3- render
  const renderInput = FormLoginData.map(
    ({ type, placeholder, name, validation }) => {
      return (
        <div key={name} className="mb-5">
          <Input
            type={type}
            className="mb-2"
            placeholder={placeholder}
            {...register(name, { ...validation })}
            autoComplete={name === "password" ? "current-password" : "on"}
          />
          {errors[name] && <ErrorMessage msg={errors[name].message} />}
          {/* {errors[name] && errors[name].type === 'required' && <ErrorMessage msg={`${name} Is Required Input`} />}
          {errors[name] && errors[name].type === 'minLength' && <ErrorMessage msg={`minLength Not Enough`} />}
          {errors[name] && errors[name].type === 'pattern' && <ErrorMessage msg={`Enter Valid Pattern`} />} 
          Replace register Schema in React Hook Form
          */}
        </div>
      );
    }
  );
  return (
    <div className="w-1/2 mx-auto my-5">
      <Heading
        className="text-center mb-4  font-semibold"
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
      >
        Login to get access!
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderInput}
        <Button type="submit" isLoading={loading} w={"full"}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
