import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing,Image } from 'react-native';

interface ExpandingCircleScreenProps {
  onAnimationComplete: () => void;
}

const LoadingScreen: React.FC<ExpandingCircleScreenProps> = () => {
  
  return (
    <View style={styles.container}>
      {/* Glow en arrière-plan */}
      <View
        style={[
          styles.glow,
        ]}
      />

      {/* Logo */}
      <Image
        source={require('../assets/logoImg.png')}
        style={
          styles.logo
         }
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // fond noir comme dans ton image
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 130,
    backgroundColor: '#00ff01',
    zIndex: 0,
  },
  logo: {
    width: 200,
    height: 200,
    zIndex: 1,
  },
});

export default LoadingScreen;
