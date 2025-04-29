import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Colores from '../style/Colores';
const Stack = createNativeStackNavigator();
const Tab=createBottomTabNavigator();
export type routes = {
  Home:undefined,
  History:undefined,
  Register:undefined,
}
const BottomTabs=()=>{
return (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName = route.name === 'Home' ? 'home' : 'clock';
      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: Colores.light,
    tabBarInactiveTintColor: Colores.dark,
    headerShown: false,
    tabBarStyle: {
      height: 63,
      paddingBottom: 13,
      paddingTop: 6,
      backgroundColor:Colores.green1,
    },
    tabBarLabelStyle: {
      fontSize: 15,
      fontWeight: 'bold',
    },
  })}
  >
    <Tab.Screen name="Home" component={HomeScreen}/>
    <Tab.Screen name="History" component={HistoryScreen}/>
  </Tab.Navigator>
);}
export default function AppNavigation() {
  return (
    <>
        <StatusBar backgroundColor={Colores.green1} barStyle={"dark-content"}/>
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{headerShown:false}} name="MainTabs" component={BottomTabs} />
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{headerShown:false,title:'Login'}}
          />
            <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{headerShown:false}}
            />
       </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}
