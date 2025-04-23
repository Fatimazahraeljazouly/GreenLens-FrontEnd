import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Colores from '../style/Colores'

export default function OrOptions() {
  return (
    <View style={styles.Orstyle}>
      <View style={styles.line} />
      <Text style={styles.text}>Or Login with </Text>
      <View style={styles.line} />
    </View>
  )
}

const styles=StyleSheet.create({
    Orstyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:1,
        textAlign:'center'
    },
    text:{
        color:Colores.green1,
        fontSize:14,
        fontWeight:'500',
        paddingHorizontal: 10,
    },
    line:{
        flex:1,
        height:1.2,
        backgroundColor:Colores.green1,
    }
})