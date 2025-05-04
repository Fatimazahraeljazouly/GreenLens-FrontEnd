import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colores from '../style/Colores'

type Props = {
    isVisible:boolean
}

const Laoding:React.FC<Props> = ({isVisible}) => {

    if(!isVisible) return ;
  return (
    <View style={styles.container}>
       <View style={styles.loadContainer}>
          <ActivityIndicator size={'large'} color={Colores.green1}/>
          <Text style={styles.txt}>Loading...</Text>
       </View>
    </View>
  )
}

export default Laoding

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colores.light, 
        width:"100%",
        height:"100%",
        zIndex:100
    },
    loadContainer:{
        width:'80%',
        height:'10%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colores.dark,
        borderRadius:10,
        flexDirection:'row',
        gap:10,
        opacity:0.6
    },
    txt:{
        color:Colores.green1,
        fontSize:16,
        fontWeight:'bold'
    }
})