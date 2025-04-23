import React, { useEffect, useState } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import LoadingScreen from './src/screens/LoadingScreen';
import LoadingScreen1 from './src/screens/LoadingScreen1';
import { StatusBar } from 'react-native';
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
      <StatusBar backgroundColor="#4CAF19"/>
   {renderContent()}
   </>
}


export default App;
