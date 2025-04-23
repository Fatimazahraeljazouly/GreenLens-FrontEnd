import { View, Text, StyleSheet,ScrollView ,Pressable, Alert} from 'react-native';
import React, {  useEffect, useState } from 'react';
import Colores from '../style/Colores';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import OrOptions from '../components/OrOptions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Account = {
  email: string; password: string;
}

export default function LoginScreen() {
  const [showPassword,setShowPassword]=useState<boolean>(false);
  const [userInfo,setUserInfo]=useState<Account>({
    email:'',
    password:'',
  });

  const setData=(type:string,value:string)=>{
    setUserInfo((prev)=>({
...prev,
[type]:value,
    }));
  };
 useEffect(()=>{
  console.log(userInfo);
 },[userInfo]);


 const handlSubmit=()=>{
  if(!userInfo.email || !userInfo.password){
    Alert.alert('Please Enter an email and a Password ')
    return;
  }

  //call the api for auth
 }
  return (
    <View style={styles.container}>
      <ScrollView
       keyboardShouldPersistTaps={"handled"}  contentContainerStyle={{flex:1,width:'100%',height:'100%'}}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Sign in to your</Text>
        <Text style={styles.title}>Account</Text>
      </View>

      <Text style={styles.subtitle}>Welcome to GreenLens App</Text>
      <View style={styles.form}>
      <View style={styles.inputContainer}>
          <Text style={styles.floatingLabel}>Email</Text>
          <TextInput
            style={styles.Input}
            placeholder="someone@gmail.com"
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
            onChangeText={(e)=>setData("password",e)}
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
      <Text style={styles.ForgetPassword} >Forget Password ?</Text>
     <View style={{alignItems:'center',top:20}}>
     < Pressable style={styles.bottom} onPress={handlSubmit} >
        <Text style={styles.text}>Login</Text>
      </Pressable>
     </View>
     <View style={styles.OrContainer}>
        <OrOptions/>
      </View>
      <View style={styles.LoginOptionsContainer}>
        <Pressable style={styles.LoginOptions}>
        <Icon name="facebook" size={24} color="#4267B2" style={{ marginRight: 8 }}/>
          <Text style={styles.textOpt} >Facebook</Text>
        </Pressable>
        <Pressable  style={styles.LoginOptions}>
        <MaterialCommunityIcons name="google" size={24} color="#DB4437"style={{ marginRight: 8 }} />
          <Text style={styles.textOpt} >Google</Text>
        </Pressable>
      </View>
      <View style={styles.registerContainer}>
          <Text style={styles.text} >Don't have an account ?</Text>
          <Pressable>
            <Text style={styles.textRegister}>Register</Text>
          </Pressable>
      </View>
      </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
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
  label: {
   color: Colores.dark,
    fontSize: 14,
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
    letterSpacing:1
  },
  OrContainer:{
   marginTop:60,
    alignItems: 'center',
    justifyContent: 'center',
},
LoginOptionsContainer:{
  marginTop:40,
  flexDirection:'row',
  justifyContent:'space-between',
  paddingHorizontal:4
},
LoginOptions:{
  flexDirection:'row',
  backgroundColor:Colores.dark,
  borderRadius:10,
  width:'47%',
  height:50,
  justifyContent:'center',
  alignItems:'center',
},
textOpt:{
  color:Colores.green1,
  textAlign: 'center',
  fontSize:14,
  fontWeight:'400'
},
registerContainer:{
  flexDirection:'row',
  justifyContent:'center',
  marginTop:50
},
textRegister:{
  color:Colores.green1,
  textAlign: 'center',
  fontSize:17,
  fontWeight:'500'
}
});





