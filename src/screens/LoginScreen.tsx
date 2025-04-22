import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colores from '../style/Colores';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
export default function LoginScreen() {
  const [showPassword,setShowPassword]=useState<boolean>(false);
  return (
    <View style={styles.container}>
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
          />
        </View>
       <View style={styles.inputContainer}>
          <Text style={styles.floatingLabel}>Password</Text>
          <TextInput
            style={styles.Input}
            placeholder="Password"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} 
             color={Colores.green1}
              size={22}
              style={styles.icon}
              />
          </TouchableOpacity>
      </View>

        <Text>Forget Password ?</Text>
        <Icon style={[{backgroundColor:'red'}]} name="eye" size={22} color="green" />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
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
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  Input:{
    
    borderColor:Colores.green,
    borderStyle:'solid',
    borderWidth:1,
    borderRadius:10,
    height:50,
  },
  inputContainer: {
    marginBottom: 30,
    position: 'relative',
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
    borderWidth:1,
  }
});





