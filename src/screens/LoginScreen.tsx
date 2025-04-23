import { View, Text, StyleSheet,ScrollView ,Pressable, Alert} from 'react-native';
import React, {  useEffect, useState } from 'react';
import Colores from '../style/Colores';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';

type Account = {
  email: string; password: string;
}

export default function LoginScreen() {
  const [showPassword,setShowPassword]=useState<boolean>(false);

  const [userInfo,setUserInfo]=useState<Account>({
    email:'',
    password:'',
  })

  const setData=(type:string,value:string)=>{
    setUserInfo((prev)=>({
...prev,
[type]:value,
    }));
  };
 useEffect(()=>{
  console.log(userInfo);
 },[userInfo]);
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps={"handled"}  contentContainerStyle={{flex:1,width:'100%',height:'100%'}}>
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
      < Pressable onPress={()=>console.log('message',userInfo.email)} >
        <Text>connexion</Text>
      </Pressable>
        <Text>Forget Password ?</Text>

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
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
    textTransform: 'capitalize',
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    marginBottom: 10,
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
    height:50,
    width:'90%',
    padding:10,
  },
  inputContainer: {
    marginBottom: 30,
    position: 'relative',
    borderWidth:1,
    borderColor:Colores.green,
    borderRadius:10

  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 14,
    backgroundColor: Colores.light,
    paddingHorizontal: 6,
    fontSize: 13,
    color: Colores.green,
    zIndex:1,
  },
  icon:{
    marginLeft: 10,
  },
  passwordWrapper:{
    flexDirection:'row',
    alignItems:'center',
  },
 
});





