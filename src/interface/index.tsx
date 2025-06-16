export interface IINputRegister {
  name: "username" | "password" | "email";
  type: "password" | "text" | "email";
  placeholder?: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    //pattern ?:RegExp,
  };
}
export interface IINputLogin {
  name: "password" | "identifier";
  type: "password" | "email";
  placeholder?: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    //pattern ?:RegExp,
  };
}

export interface IInputModal{
   name: "title" | "description" |"price"|
"stock"|
"thumbnail"|
"Quantity"|"categories";
  type: "text" | "number";
}
export interface IProduct {
  id: string;
  documentId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  thumbnail: {
    url: string;
  };
  Quantity?: number;
  categories?:[ 
    {
      id: string;
      documentId: string;
      title: string;
    }]
  ;
}
export const initialProduct:IProduct={
  id:'',
  documentId:'',
  price:0,
  stock:0,
  thumbnail:{
    url:''
  },
  description:'',
  title:'',
   categories:[{
    documentId:'',
    id:'',
    title:''
   }],
  


}
export interface IAxiosError {
  error: {
    details?: {
      errors: {
        message: string[];
      };
    };
    message?: string;
  };
}

export interface IDataInputLogin {
  identifier: string;
  password: string;
}

export interface IDataResponse {
  jwt: string;
  user: { id: string; documentId: string; username: string };
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
