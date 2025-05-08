import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import IconBack from 'react-native-vector-icons/Ionicons';
import IconProfile from 'react-native-vector-icons/MaterialCommunityIcons';
import IconUser from 'react-native-vector-icons/AntDesign';
import EmailIcon from 'react-native-vector-icons/Fontisto';
import LocationIcon from 'react-native-vector-icons/Entypo';
import PhoneIcon from 'react-native-vector-icons/Feather';
import PasswordIcon from 'react-native-vector-icons/MaterialIcons';
import { useGetProfileQuery } from '../redux/Actions/Authapi';
import Colores from '../style/Colores';
import { destroyAllSessions } from '../utils/session';
import Icon from 'react-native-vector-icons/AntDesign';



const InfoSection = ({ icon: Icon, value, iconName, onPress }: any) => (
  <View style={styles.inputContainer} onPress={onPress}>
    <Icon name={iconName} size={24} color={Colores.green1} />
    <Text style={styles.input}>{value}</Text>
  </View>
);

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { data } = useGetProfileQuery();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (data) {
      setFullname(data.fullname || '');
      setEmail(data.email || '');
    }
  }, [data]);

  const handleLogout = async () => {
    await destroyAllSessions();
    navigation.navigate('Login')
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <IconBack name="arrow-back" size={26} color={Colores.light} />
      </Pressable>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          <IconProfile name="account-circle" size={90} color={Colores.green1} />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>{fullname || 'User'}</Text>
          <Text style={styles.subtitle}>Your personal information</Text>
        </View>

        <View style={styles.form}>
          <InfoSection icon={IconUser} iconName="user" value={fullname || 'User'} />
          <InfoSection icon={EmailIcon} iconName="email" value={email || 'user@gmail.com'} />
          <InfoSection icon={PhoneIcon} iconName="smartphone" value="(+212) 633 382002" />
          <InfoSection icon={LocationIcon} iconName="location" value="Morocco, Casablanca" />
          <InfoSection
            icon={PasswordIcon}
            iconName="password"
            value="Edit Password"
            onPress={() => Alert.alert('Edit Password', 'Feature coming soon.')}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleLogout}>
              <Icon name='logout' size={20} color={Colores.dark} />
              <Text style={styles.saveText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colores.dark,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 14,
    zIndex: 100,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    color: Colores.greenLight,
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 6,
  },
  form: {
    backgroundColor: Colores.greenLight,
    borderRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: Colores.green1,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colores.greenLight,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 18,
    height: 52,
  },
  input: {
    fontSize: 15,
    color: Colores.dark,
    marginLeft: 10,
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: Colores.green1,
    height: 52,
    width: '60%',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colores.dark,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    flexDirection:'row'
  },
  saveText: {
    color: Colores.dark,
    fontWeight: '600',
    fontSize: 16,
    left:9
  },
});
