
import { StyleSheet } from 'react-native'
import React from 'react'
import AppNavigation from './src/navigation/AppNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './src/redux/Store/Store'


const App = () => {
  return (
   <Provider store={store}>
     <NavigationContainer>
       <AppNavigation/>
    </NavigationContainer>
   </Provider>
  )
}

export default App

const styles = StyleSheet.create({})