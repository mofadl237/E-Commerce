import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormRegisterData } from "../data";
import Input from "../components/UI/Input";
import { registerSchema } from "../validation";
import ErrorMessage from "../Error/ErrorMessage";
import axiosInstance from "../config/axiosInstanse";
import { useNavigate } from "react-router-dom";
import type { IAxiosError } from "../interface";
import type { AxiosError } from "axios";
import { Button, createStandaloneToast, Heading } from "@chakra-ui/react";
interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  //1-state
  const navigate = useNavigate();
const { toast } = createStandaloneToast();

  //2-handler
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { status } = await axiosInstance.post(
        "/auth/local/register",
        data
      );
      if (status === 200) {
        
        toast({
          title: 'Success Login',
          description: "Navigate To LoginPage",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const errorOBJ = error as AxiosError<IAxiosError>;
     toast({
          title: 'Error Register',
          description: `${errorOBJ}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    }
  };

  //3-render
  const renderInput = FormRegisterData.map(
    ({ type, placeholder, name, validation }, idx) => {
      return (
        <div key={idx} className="mb-5">
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name, { ...validation })}
            autoComplete={name === "password" ? "current-password" : "on"}
          />
          {errors[name] && <ErrorMessage msg={errors[name].message} />}
        </div>
      );
    }
  );
  return (
    <div className="w-1/2 mx-auto my-5">
      <Heading className="text-center mb-4  font-semibold" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
        Register to get access!
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderInput}
        <Button type="submit" w={'full'}>Submit</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
