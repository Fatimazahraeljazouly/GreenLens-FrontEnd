import { Account ,registerData} from "../utils/Types";
import axios from 'axios';


export const LoginApi = async (loginData:Account,toast:any)=>{
try{
    const response = await axios.post('api/url',loginData)
    const data = response.data;
  
        toast.show('Login successful!', { type: 'success' });
        return {success:true,data};
}catch(e:any){
    const errorMessage = e.response?.data?.message || 'Something went wrong';

    toast.show('Login Failed:'+errorMessage,{type:'danger'});
    console.log(e);
}
};

export const RegisterApi= async(RegisterData:registerData,toast:any)=>{
    try{
        const response = await axios.post('api/register',RegisterData)
        const data = response.data;
       
            toast.show('Registration successful!', { type: 'success' });
            return {success:true,data};
       
    }catch(e:any){
        const errorMessage=e.response?.data?.message || 'Something went wrong';
        toast.show('Registration Failed: '+errorMessage,{type:'danger'});
        console.log(e);
    }

}

export const SendImageApi=async (imageUri:string, toast: any)=>{
    try{
         const extension = imageUri.split('.').pop()?.toLowerCase();
         let mimeType = '';
         if (extension === 'jpg' || extension === 'jpeg') {
             mimeType = 'image/jpeg';
         } else if (extension === 'png') {
             mimeType = 'image/png';
         } else {
             toast.show('.' + mimeType + 'is Unsupported  format.', { type: 'danger' });
             return { success: false, data: null };
         }
        const formData=new FormData();
        formData.append('image',{
            uri:imageUri,
            name:`photo.${extension}`,
            type:mimeType,
        }as any);

        const response= await axios.post('api/sendImage',formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
        });
        const data =response.data;
        toast.show('Image uploaded successfully!',{type:'success'})
        return {success:true,data};
    }catch(error:any){
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        toast.show('Image upload failed. ' + errorMessage, { type: 'danger' });
        return { success: false, data: error.response?.data };
    }
}