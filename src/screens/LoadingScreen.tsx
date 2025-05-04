import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet,Image, StatusBar } from 'react-native';
import Colores from '../style/Colores';


const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<any>()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('loading1')
    },2000)

  },[])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colores.green1} barStyle={'dark-content'}/>
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
    width: 140,
    height: 140,
    borderRadius: 130,
    backgroundColor: '#00ff01',
    zIndex: 0,
  },
  logo: {
    width: 140,
    height: 140,
    zIndex: 1,
  },
});

export default LoadingScreen;
