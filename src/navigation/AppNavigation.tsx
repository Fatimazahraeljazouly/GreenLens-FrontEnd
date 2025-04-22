import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import HomeScreen from '../screens/HomeScreen';
const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  return (
    <>
        <StatusBar backgroundColor="#4CAF19"/>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown:false,title:'Home'}}/>   

            </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}
