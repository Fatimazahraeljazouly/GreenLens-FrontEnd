import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export type Account = {
    email: string;
    password: string;
  }
export type registerData={
    email:string,
    fullname:string,
}
export type passwords ={
  password:string,
  confirmedPassword:string
};
export type userData={
  id: Int32,
  fullname: string,
  email: string,
  token: string, 
};