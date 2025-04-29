import { View, Pressable, StyleSheet, Image, Text ,ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Colores from '../style/Colores';
import { useNavigation } from '@react-navigation/native';

export default function HistoryScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={Colores.dark2} />
      </Pressable>

      <ScrollView contentContainerStyle={styles.content}>
        {[1, 2,3,4,5].map((_, index) => (
          <View key={index} style={styles.historyCard}>
            <Image style={styles.image} source={require('../assets/leaf.jpg')} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Name: <Text style={styles.text}>Tomato</Text></Text>
              <Text style={styles.title}>Description: <Text style={styles.text}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam cum eaque sunt natus praesentium </Text></Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colores.light,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 14,
    zIndex: 100,
    padding: 8,
    backgroundColor: Colores.green1,
    borderRadius: 50,
    elevation: 4,
    shadowColor: Colores.green1,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  content: {
    marginTop: '15%',
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding:10,
    shadowColor: Colores.green1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3, 
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: 'cover',
  },
  textContainer: {
    flexShrink: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colores.dark2,
    marginBottom: 4,
  },
  text: {
    fontWeight: 'normal',
    color: '#555',
  },
});
