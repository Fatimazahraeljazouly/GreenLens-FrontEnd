import { View, Pressable, StyleSheet, Image, Text, ScrollView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Colores from '../style/Colores';
import { useNavigation } from '@react-navigation/native';
import { useGetHistoryQuery } from '../redux/Actions/Predictapi';
import { host } from '../../Config';
import Laoding from '../components/loading';

export default function HistoryScreen() {
  const navigation = useNavigation<any>();
  const { data, isLoading } = useGetHistoryQuery();

  return (
    <View style={styles.container}>
     <Laoding isVisible={isLoading}/>

      {data?.data?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {data?.data?.map((item, index) => (
            <View key={index} style={styles.historyCard}>
              <Image style={styles.image} source={{ uri: `${host}/${item.image}` }} />
              <View style={styles.textContainer}>
                <View style={styles.row}>
                  <Icon name="leaf" size={18} color={Colores.primary} />
                  <Text style={styles.title}>Plant: <Text style={styles.text}>{item?.class_name?.split('_')[0] || 'N/A'}</Text></Text>
                </View>

                <View style={styles.row}>
                  <Icon name="barcode" size={18} color={Colores.primary} />
                  <Text style={styles.title}>Class: <Text style={styles.text}>{item?.class_name?.replace(/_/g, ' ') || 'N/A'}</Text></Text>
                </View>

                <View style={styles.row}>
                  <Icon name="document-text" size={18} color={Colores.primary} />
                  <Text style={styles.title}>Description:</Text>
                </View>
                <Text style={styles.text} numberOfLines={4} ellipsizeMode="tail">{item?.Description || 'N/A'}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noData}>
          <Icon name="folder-open" size={48} color="#999" />
          <Text style={{ marginTop: 10, fontSize: 16, color: '#777' }}>No history found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colores.light,
    paddingHorizontal: 16,

  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: Colores.primary,
    padding: 10,
    borderRadius: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  title: {
    fontSize: 14.5,
    fontWeight: '600',
    color: Colores.dark2,
    marginLeft: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#444',
    lineHeight: 20,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
