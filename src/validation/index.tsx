import * as yup from "yup"

export const registerSchema = yup
  .object({
    username: yup.string().required("User Name Is Required"),
    email: yup
      .string()
      .required("Email Is Required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Is Not Valid Email"),

    password: yup
      .string()
      .required("Password Is Required")
      .min(6, "min character 6"),
  })
  .required();

  export const loginSchema=yup.object({
    identifier:yup.string()
      .required("Email Is Required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Is Not Valid Email"),
    password:yup.string().required("Password Is Required").min(6,"min character 6")
  }).required();
