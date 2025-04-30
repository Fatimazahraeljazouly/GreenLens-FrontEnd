import { Float, Int32 } from "react-native/Libraries/Types/CodegenTypes";
export type register={
  email: string,
  fullname:string,
  password: string,
}
export type message={
  message:string;
}
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

export type Token={
  access_token:string 
} 

export type DiseaseInfo = {
  class_name: string;
  description: string[];
  symptoms: string[];
  prevention: string[];
  note: string;
  date: string; // ISO date string
};

export type HistType = {
  class_name: string;
  image:any
  Description: string[];
  symptoms: string[];
  prevention: string[];
  note: string;
  date: string;
  treatment:string[];
};

export type HistData={
  data:HistType[];
}