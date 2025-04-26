import React, { useEffect, useState } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import LoadingScreen from './src/screens/LoadingScreen';
import LoadingScreen1 from './src/screens/LoadingScreen1';
import { StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import AuthProvider from './src/context/AuthContext';
import Colores from './src/style/Colores';
type LoadingStage = 'native_splash' | 'circle_expand' | 'logo_pulse' | 'app_ready';
function App(): React.JSX.Element {
  const [currentStage,setCurrentStage] = useState<LoadingStage>('native_splash');
  useEffect(()=>{
    setCurrentStage('circle_expand');
  },[]);

  const handlCircleCompleted=()=>{
    setCurrentStage('logo_pulse');
  };

  const handlLogoPluseCompleted=()=>{
    setCurrentStage('app_ready');
  };
  const renderContent=()=>{
    switch(currentStage){
      case 'circle_expand':
        return <LoadingScreen1 onAnimationComplete={handlCircleCompleted}/>;
      case 'logo_pulse':
        return <LoadingScreen onAnimationComplete={handlLogoPluseCompleted}  />;
      case 'app_ready':
        return <AppNavigation/>;
      case 'native_splash':
      default:
        return <></>;
    }
  };
   return <>
      <StatusBar backgroundColor={Colores.green1}/>
      
    <ToastProvider
     duration={3000}
     placement="top"
     animationType="slide-in"
     offset={50}
     successColor="#4CAF50"
     dangerColor="#F44336"
     warningColor="#FFC107"
     normalColor="#2196F3"
     textStyle={{
       fontSize: 16,
       color: '#ffffff',
       fontWeight: '600',
     }}
     style={{
       borderRadius: 12,
       paddingVertical: 14,
       paddingHorizontal: 18,
       shadowColor: '#000',
       shadowOpacity: 0.2,
       shadowRadius: 6,
       elevation: 5,
     }}
    >
    <AuthProvider>
            {renderContent()}
    </AuthProvider>
   </ToastProvider>

   </>

}


export default App;
