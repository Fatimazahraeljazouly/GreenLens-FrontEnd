// src/screens/ExpandingCircleScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Colores from '../style/Colores';
import { useNavigation } from '@react-navigation/native';
import { getSession } from '../utils/session';


const LoadingScreen1: React.FC = () => {
  const navigation  = useNavigation<any>()
  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const finalScale = 50;
    Animated.timing(scaleAnim, {
      toValue: finalScale,
      duration:2000,
      useNativeDriver: true, 
    }).start(() => {
      checkToken()
    })
  }, [scaleAnim]);

  const checkToken = async() => {
    const token  = await getSession('token')
    if(token) navigation.navigate('MainTabs')
    else navigation.navigate('Login')
  }



  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim }], // Appliquer l'échelle animée
          },
        ]}
      />
       </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colores.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colores.green1,
  },
});

export default LoadingScreen1;