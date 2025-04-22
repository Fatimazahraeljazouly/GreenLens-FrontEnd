import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';

interface ExpandingCircleScreenProps {
  onAnimationComplete: () => void;
}

const LoadingScreen: React.FC<ExpandingCircleScreenProps> = ({ onAnimationComplete }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animation d'apparition
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      const loadingTimer = setTimeout(() => {
        onAnimationComplete();
      }, 2000);
      return () => clearTimeout(loadingTimer);
    });
  }, [onAnimationComplete, opacityAnim, translateYAnim]);

  // Animation pulse
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      {/* Glow en arrière-plan */}
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />

      {/* Logo */}
      <Animated.Image
        source={require('../assets/logoImg.png')}
        style={[
          styles.logo,
          {
            opacity: opacityAnim,
            transform: [
              { translateY: translateYAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
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
    backgroundColor: 'rgba(0,255,0,0.2)',
    zIndex: 0,
  },
  logo: {
    width: 200,
    height: 200,
    zIndex: 1,
  },
});

export default LoadingScreen;
