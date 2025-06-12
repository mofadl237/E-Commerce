export interface IINputRegister{
    name:"username"| "password" |"email";
    type:"password" |"text"|"email";
    placeholder?:string;
    validation ?:{
        required ?:boolean,
        minLength ?:number,
        maxLength ?:number,
        //pattern ?:RegExp,
    }
}
export interface IINputLogin{
    name:"password" |"identifier";
    type:"password" |"email";
    placeholder?:string;
    validation ?:{
        required ?:boolean,
        minLength ?:number,
        maxLength ?:number,
        //pattern ?:RegExp,
    }
}

export interface IProduct {
  id: string ;
  documentId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;   
  updatedAt: string;
  publishedAt: string;
  thumbnail:{
    url:string;
  }
  Quantity ?:number;
}
export interface IAxiosError{
  error:{
    details?:{
      errors:{
        message:string[];
      }
    }
    message?:string;
  }
}

export interface IDataInputLogin  {
  identifier: string;
  password: string;
};

export interface IDataResponse{
  jwt:string ,user:{id:string,documentId:string,username:string}
}