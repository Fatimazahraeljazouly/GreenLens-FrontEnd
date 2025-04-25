import React, { useEffect, useState } from 'react';
import Colores from '../style/Colores';
import Icon from 'react-native-vector-icons/Feather';
import IconBack from 'react-native-vector-icons/Ionicons';
import { passwords, registerData } from '../utils/Types';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { KeyboardAvoidingView, Platform,TouchableWithoutFeedback, Keyboard,View, Text, StyleSheet,ScrollView ,Pressable,TouchableOpacity,TextInput} from 'react-native';
import { RegisterApi } from '../services/Apis';
import { ActivityIndicator } from 'react-native';

export default function RegisterScreen() {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const [showConfirmedPassword,setShowConfirmedPassword]=useState<boolean>(false);
    const navigation =useNavigation<any>();
    const [dataRegister,setDataRegister]=useState<registerData>({
        email:'',
        fullname:'',
        password:'',
    });
    const [passwords,setPasswords]=useState<passwords>({
        password:'',
        confirmedPassword:'',
    });
    const setData=(type:string,value:string)=>{
        setDataRegister((prev)=>({
            ...prev,
            [type]:value}));
    };
    const setPassword=(type:string,value:string)=>{
        setPasswords((prev)=>({
            ...prev,
            [type]:value,
        }));
    };
    useEffect(()=>{
        console.log(dataRegister);
    },[dataRegister]);
    const handlsamePassword=()=>{
      if(passwords.confirmedPassword!=passwords.password){
        toast.show('Password Don\'t Match .', {
          type: 'danger', // success, warning, danger, normal
          placement: 'top', // top, bottom, center
          duration: 3000,
        });
        return;
      }else{
        setDataRegister((prev)=>({
          ...prev,
          'password':passwords.confirmedPassword,
        }));
        setPasswords({password:'',confirmedPassword:''});
      }
    };
    const handlSubmit = async ()=>{
      handlsamePassword();
      if(!dataRegister.email || !dataRegister.fullname || !dataRegister.password){
        toast.show('Fill In  All the inputs ', {
          type: 'danger', // success, warning, danger, normal
          placement: 'top', // top, bottom, center
          duration: 3000,
        });
      }
      const data = {
        email:dataRegister.email,
        password:dataRegister.password,
        fullname:dataRegister.fullname,
      };
      try {
        setIsLoading(true); // démarrage du loader
        const result = await RegisterApi(data);
        if (result?.success) {
          toast.show('Account created successfully!', { type: 'success' });
          navigation.navigate('Login');
        } else {
          toast.show(result?.data || 'Registration failed.', { type: 'danger' });
        }
      } catch (error) {
        toast.show('An error occurred.', { type: 'danger' });
      } finally {
        setIsLoading(false);
      }
};
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
    behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    <View style={styles.container}>
         <Pressable 
       onPress={()=>navigation.goBack()}
       style={{
        position: 'absolute',
        top: 20,
        left:14,
        zIndex: 100,
        padding: 6,
        backgroundColor: Colores.green1,
        borderRadius: 20,
    }}
       >
            <IconBack
                    name="arrow-back"
                    size={24} 
                    color={Colores.dark2}
            />
        </Pressable>
        <ScrollView 
               keyboardShouldPersistTaps={"handled"}  
               contentContainerStyle={{flex:1,width:'100%',height:'100%'}}>

       <View style={styles.headerContainer}>
              <Text style={styles.title}>Create Your</Text>
              <Text style={styles.title}>Account</Text>
        </View>
            <Text style={styles.subtitle}>Welcome to GreenLens App</Text>
        <View style={styles.form}>
        <View style={styles.inputContainer}>
                  <Text style={styles.floatingLabel}>Full Name</Text>
                  <TextInput
                    style={styles.Input}
                    placeholder="john doe"
                    onChangeText={(e)=>setData('fullname',e)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.floatingLabel}>Email</Text>
                  <TextInput
                    style={styles.Input}
                    placeholder="johndoe@gmail.com"
                    keyboardType="email-address"
                    onChangeText={(e)=>setData('email',e)}
                  />
                </View>

            <View style={styles.inputContainer}>
                <Text style={styles.floatingLabel}>Password</Text>
              <View style={styles.passwordWrapper} >
                <TextInput
                    style={styles.Input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    onChangeText={(e)=>setPassword("password",e)}
                />
                <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? 'eye-off' : 'eye'} 
                    color={Colores.green1}
                    size={22}
                    style={styles.icon}
                    />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.floatingLabel}>Confirmed Password</Text>
              <View style={styles.passwordWrapper} >
                <TextInput
                    style={styles.Input}
                    placeholder="Renter password "
                    secureTextEntry={!showConfirmedPassword}
                    onChangeText={(e)=>setPassword("confirmedPassword",e)}
                />
                <TouchableOpacity onPress={()=> setShowConfirmedPassword(!showConfirmedPassword)}>
                    <Icon name={showConfirmedPassword ? 'eye-off' : 'eye'} 
                    color={Colores.green1}
                    size={22}
                    style={styles.icon}
                    />
                </TouchableOpacity>
              </View>
            </View>

             <View style={{alignItems:'center',top:20}} >
                 < Pressable style={styles.bottom}  onPress={handlSubmit} disabled={isLoading} >
                 {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                 ) : (
                  <Text style={styles.text}>Register</Text>)}
                  </Pressable>
            </View>

            <View style={styles.loginContainer}>
                      <Text style={styles.text} >You already have an account ?</Text>
                      <Pressable onPress={()=> navigation.navigate('Log in')}>
                        <Text style={styles.textLogin}>Login</Text>
                      </Pressable>
            </View>
        </View>
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
</TouchableWithoutFeedback>
  )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colores.dark,
        paddingTop: 80,
      },
      headerContainer: {
        marginBottom: 30,
      },
      title: {
        color: Colores.greenLight,
        fontSize: 29,
        fontWeight: 'bold',
        lineHeight: 34,
        textTransform: 'capitalize',
        left:14,
      },
      subtitle: {
        color: '#888',
        fontSize: 18,
        marginBottom: 10,
        left:14,
      },
  form: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '75%',
    backgroundColor: Colores.light,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 24,
    width:'100%',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    justifyContent:'flex-start',
  },
  Input:{    borderRadius:10,
    height:56,
    width:'90%',
    padding:10,
    paddingLeft:19
  },
  inputContainer: {
    marginBottom: 30,
    position: 'relative',
    borderWidth:1,
    borderColor:Colores.green1,
    borderRadius:10
  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 14,
    backgroundColor: Colores.light,
    paddingHorizontal: 6,
    fontSize: 14,
    color: Colores.green1,
    zIndex:1,
    fontWeight:'500'
  },
  icon:{
    marginLeft: 10,
  },
  passwordWrapper:{
    flexDirection:'row',
    alignItems:'center',
  },
  ForgetPassword:
  {color:Colores.green1,
    fontWeight:'600',
    top:-15,
    textAlign:'right'
  },
  bottom:{
    backgroundColor:Colores.green1,
    height:50,
    width:'80%',
    padding:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    color:Colores.dark,
    fontWeight:'600',
    fontSize:15,
  },
  loginContainer:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:50,
  },
  textLogin:{
    color:Colores.green1,
    textAlign: 'center',
    fontSize:17,
    fontWeight:'500'
  },
})