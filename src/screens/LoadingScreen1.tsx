// src/screens/ExpandingCircleScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Colores from '../style/Colores';
interface ExpandingCircleScreenProps {
  onAnimationComplete: () => void;
}

const LoadingScreen1: React.FC<ExpandingCircleScreenProps> = ({ onAnimationComplete }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const finalScale = 50;
    Animated.timing(scaleAnim, {
      toValue: finalScale,
      duration: 3000,
      useNativeDriver: true, 
    }).start(
        () => { 
            console.log("Cercle fini d'animer, appel de onAnimationComplete");
            onAnimationComplete();
          }
    );
  }, [onAnimationComplete, scaleAnim]);

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
    backgroundColor: '#4CAF19',
  },
});

export default LoadingScreen1;