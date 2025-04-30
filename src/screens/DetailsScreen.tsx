import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Colores from '../style/Colores'
import Icon from 'react-native-vector-icons/Ionicons'
import { DiseaseInfo } from '../utils/Types'

type res={
  result:DiseaseInfo
  imageUri:any
}



export default function DetailsScreen() {


  //const navigation = useNavigation<any>();
  const details = useRoute();
  const d=details.params as res ;
  const data =d.result;
  const img =d.imageUri
  console.log('test',data)
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Image */}
        <Image source={img} style={styles.image} />

        {/* Info Card */}
        <View style={styles.card}>

          <View style={styles.row}>
            <Icon name="leaf" size={20} color={Colores.primary} />
            <Text style={styles.sectionTitle}>Plant</Text>
          </View>
          <Text style={styles.content}>{data?.class_name?.split('_')[0]}</Text>

          <View style={styles.row}>
            <Icon name="barcode" size={20} color={Colores.primary} />
            <Text style={styles.sectionTitle}>Class</Text>
          </View>
          <Text style={styles.content}>{data?.class_name?.replace(/_/g, ' ')}</Text>

          <View style={styles.row}>
            <Icon name="document-text" size={20} color={Colores.primary} />
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          {data?.description?.map((item, index) => (
            <Text key={index} style={styles.content}>• {item}</Text>
          ))}

          <View style={styles.row}>
            <Icon name="alert-circle" size={20} color={Colores.primary} />
            <Text style={styles.sectionTitle}>Symptoms</Text>
          </View>
          {data?.symptoms?.map((item, index) => (
            <Text key={index} style={styles.content}>• {item}</Text>
          ))}

          <View style={styles.row}>
            <Icon name="medkit" size={20} color={Colores.primary} />
            <Text style={styles.sectionTitle}>Treatment</Text>
          </View>
          {data?.prevention?.map((item, index) => (
            <Text key={index} style={styles.content}>• {item}</Text>
          ))}

          <View style={styles.row}>
            <Icon name="information-circle" size={20} color={Colores.primary} />
            <Text style={styles.sectionTitle}>Note</Text>
          </View>
          <Text style={styles.content}>{data?.note}</Text>

          <View style={styles.row}>
            <Icon name="calendar" size={20} color={Colores.primary} />
            <Text style={styles.sectionTitle}>Prediction Date</Text>
          </View>
          <Text style={styles.content}>
            {new Date(data?.date).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
   
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  image: {
    width: '90%',
    height: 230,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: 20,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colores.primary,
    marginLeft: 8,
  },
  content: {
    fontSize: 15.5,
    color: '#444',
    lineHeight: 22,
    paddingLeft: 6,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 4,
  },
});
