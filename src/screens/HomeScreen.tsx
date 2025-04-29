  import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native';
  import React, {useState } from 'react';

  import Icon from 'react-native-vector-icons/Feather';
  import Colores from '../style/Colores';
  import ImagePicker from 'react-native-image-crop-picker';
  import { SendImageApi } from '../services/Apis';
  import { ImageSourcePropType } from 'react-native';
  import {useToast} from 'react-native-toast-notifications';
  import { useGetProfileQuery } from '../redux/Actions/Authapi';
  import { usePredictMutation } from '../redux/Actions/Predictapi';
  import { destroyAllSessions } from '../utils/session';
  import { useNavigation } from '@react-navigation/native';





  //import { ActivityIndicator } from 'react-native';
  export default function HomeScreen() {
    const [imageUri,setImageUri] = useState<any|null>(null);
    const [imgLoaded,setImgLoaded] = useState<boolean>(false);
    const {data,isLoading}=useGetProfileQuery();
    const [Predict,{isLoading:imgPredicted}]=usePredictMutation();
    const navigation=useNavigation<any>();

    const Toast=useToast();
        const HandleUploadImg =  ()=>{
        try{
          ImagePicker.openPicker({
            width:300,
            height:300,
            cropping:true,
          }).then(image=>{
            const imageFile={
              uri:image.path,
              type:image.mime,
              name:image.path.split('/').pop(),
            }
            setImageUri(imageFile);
          });
          setImgLoaded(true);
        }catch(e){
          console.log(e)
        }
    };
    const HandleTakePic = async()=>{
        try{
          const image = await ImagePicker.openCamera({
            width:300,
            height:300,
            cropping:true,
          }).then(image =>{
            const imageFile={
              uri:image.path,
              type:image.mime,
              name:image.path.split('/').pop(),
            };
            setImageUri(imageFile);
          });
          setImgLoaded(true);
        }catch(e){
          console.log(e);
        }
    };
    const HandleGetInfo = async () => {
      if (!imageUri) return;
      
      console.log("Bouton cliqué !");
      try {
        const result = await Predict(imageUri).unwrap();
        console.log("Classification Result:", result);
      } catch (err) {
        console.error("Error Classification:", err);
      }
    };
    const logout= async()=>{
        await destroyAllSessions(); 
        navigation.navigate('Login');
    }
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userInfoContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{data?.fullname.charAt(0).toUpperCase() || 'E'}</Text>
            </View>
            <Text style={styles.welcomeText}>Hi, {data?.fullname || 'N/A'}</Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Icon name="log-out" size={21} color={Colores.dark}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Put Picture here!</Text>
        <View style={styles.content}>
          <View style={styles.putImage}>
            <TouchableOpacity onPress={HandleUploadImg} style={styles.Upload}>
            <Icon name="upload" size={40} color={Colores.green1} />
            <Text style={styles.iconText}>Upload image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={HandleTakePic} style={styles.Upload}>
            <Icon name="camera" size={40} color={Colores.green1} /> 
            <Text  style={styles.iconText}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        {/*   {imgLoaded === false && (
               <ActivityIndicator size="large" color={Colores.green1} style={{ marginTop: 20 }} />
        )} */}
          {imageUri ? (
            <Image source={imageUri} style ={styles.imagePreview} />
          ) : (
            <View style={styles.placeholderContainer}>
            <Icon name="image" size={50} color={Colores.dark2} />
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>
          )}
          <TouchableOpacity  onPress={HandleGetInfo} style={[styles.moreInfoButton, { opacity: imgLoaded ? 1 : 0.5 }]} disabled={!imgLoaded}>
            <Text style={styles.buttonText} >Get more information</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colores.light,
      paddingTop: 30,
      paddingHorizontal: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      backgroundColor: Colores.green1,
      width: 35,
      height: 35,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    avatarText: {
      color: Colores.dark,
      fontSize: 18,
      fontWeight: 'bold',
    },
    welcomeText: {
      fontSize: 14,
      fontWeight: '600',
      color: Colores.dark2,
    },
    logoutButton: {
      backgroundColor: Colores.green1,
      width: 35,
      height: 35,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      marginTop:12,
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 15,
      fontWeight: '400',
      color: Colores.dark2,
      alignItems: 'flex-start',
      left:17,
    },
    putImage:{
    width:'90%',
    height:'33%',
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection :'row',
    borderColor:Colores.dark2,
    borderStyle:'dashed',
    borderWidth:1,
    borderRadius:10,
    },
    Upload:{
      alignItems:'center',
    },
    iconText:{
      color:Colores.dark2,
      fontSize:14,

    },
    imagePreview:{
      marginTop:'10%',
    width: '90%',
    height:  '35%',
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
    },
    moreInfoButton:{
      marginTop:'10%',
      backgroundColor:Colores.dark,
      paddingHorizontal:'16%',
      paddingVertical:'3%',
      borderRadius:10,
      textAlign:'center'
    },
    buttonText:{
      color:Colores.greenLight,
      fontSize:14,
      fontWeight:'600',
    },
    placeholderContainer: {
      marginTop: '10%',
      width: '90%',
      height: '35%',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colores.dark2,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      marginTop: 8,
      color: Colores.dark2,
      fontSize: 14,
    },
    
  });
