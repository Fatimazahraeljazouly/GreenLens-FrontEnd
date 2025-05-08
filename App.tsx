import React from 'react'
import AppNavigation from './src/navigation/AppNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './src/redux/Store/Store'
import { ToastProvider } from 'react-native-toast-notifications'


const App = () => {
  return (
   <Provider store={store}>
     <NavigationContainer>
      <ToastProvider>
        <AppNavigation/>
      </ToastProvider>
    </NavigationContainer>
   </Provider>
  )
}

export default App
