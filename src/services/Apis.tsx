import { Account ,registerData} from "../utils/Types";
import { useToast } from "react-native-toast-notifications";
export const LoginApi = async (loginData:Account)=>{
    const toast=useToast();
try{
    const response= await fetch('api url',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(loginData),
    });
    const data =await response.json();
    if(response.ok){
        toast.show('Login successful!', { type: 'success' });
        return {success:true,data};
    }else{
        toast.show('Login failed.' + (data.message || 'Something went wrong', { type: 'danger' }));
        return {success:false,data};
    }
}catch(e){
    //.alert('There was an error. Please try again.'); // Erreur réseau
    toast.show('There was an error. Please try again.',{type:'danger'});
    console.log(e);
}
};

export const RegisterApi= async(RegisterData:registerData)=>{
    const toast = useToast();
    try{
        const response = await fetch ('api/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(RegisterData),
        });
        const data =await response.json();
        if(response.ok){
            toast.show('Registration successful!', { type: 'success' });
            return {success:true,data};
        }else{
            toast.show('Registration failed',{type:'danger'});
            return {success:false,data};
        }
    }catch(e){
        toast.show('There was an error. Please try again.',{type:'danger'});
        console.log(e);
    }

}