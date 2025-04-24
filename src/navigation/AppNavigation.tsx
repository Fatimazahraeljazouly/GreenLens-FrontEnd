import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  return (
    <>
        <StatusBar backgroundColor="#4CAF19"/>
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Log in'
            component={LoginScreen}
            options={{headerShown:false,title:'Log in'}}
          />
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown:false}}/>   
       </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}
