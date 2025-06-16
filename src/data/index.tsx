import type {
  IINputLogin,
  IInputModal,
  IINputRegister,
} from "../interface";

export const FormRegisterData: IINputRegister[] = [
  {
    name: "username",
    placeholder: "User Name",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
      maxLength: 8,
    },
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 5,
    },
  },
];
export const FormLoginData: IINputLogin[] = [
  {
    name: "identifier",
    type: "email",
    placeholder: "Email",
    validation: {
      required: true,
    },
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    validation: {
      required: true,
    },
  },
];

export const ModalInputData: IInputModal[] = [
  {
    name: "title",
    type: "text",
  },
  {
    name: "description",
    type: "text",
  },
  {
    name: "price",
    type: "number",
  },
  {
    name: "stock",
    type: "number",
  },
  {
    name: "thumbnail",
    type: "text",
  },
  
];
