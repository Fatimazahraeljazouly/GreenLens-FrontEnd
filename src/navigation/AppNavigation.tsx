import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Colores from '../style/Colores';
import DetailsScreen from '../screens/DetailsScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoadingScreen1 from '../screens/LoadingScreen1';
import ProfileScreen from '../screens/ProfileScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
const Tab=createBottomTabNavigator();

export type routes = {
  Home:undefined,
  History:undefined,
  Register:undefined,
  loading1:undefined,
  loading0:undefined

}


const HomeStack=()=>{
return (
     <Stack.Navigator initialRouteName='HomeApp' screenOptions={{headerShown:false}}>
        <Stack.Screen
          name='HomeApp'
          component={HomeScreen}
        />
        
        <Stack.Screen
          options={{
            headerShown:true,
          }}
          name='details'
          component={DetailsScreen}
        />

        <Stack.Screen
        options={{
          headerShown:false,
        }}
        name='profile'
        component={ProfileScreen}
        />
    </Stack.Navigator>
);
}






const getTabBarStyle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeApp';
  if (routeName === 'profile') {
    return { display: 'none' };
  }
  return {
    height: 63,
    paddingBottom: 13,
    paddingTop: 6,
    backgroundColor: Colores.green1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  };
};



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
    tabBarStyle: getTabBarStyle(route),
    tabBarLabelStyle: {
      fontSize: 15,
      fontWeight: 'bold',
    },
  })}
  >
    <Tab.Screen name="Home" component={HomeStack}/>
    <Tab.Screen
    options={{
      headerShown:true,
      headerTitleAlign:'left',
    }}
     name="History" component={HistoryScreen}/>
    
  </Tab.Navigator>
);}


export default function AppNavigation() {
  return (
        <Stack.Navigator initialRouteName='loading0'>
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

          <Stack.Screen
            name='loading0'
            component={LoadingScreen}
            options={{headerShown:false}}
            />

          <Stack.Screen
            name='loading1'
            component={LoadingScreen1}
            options={{headerShown:false}}
            />
       </Stack.Navigator>
  );
}


