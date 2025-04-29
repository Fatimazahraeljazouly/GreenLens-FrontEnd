import AsyncStorage from '@react-native-async-storage/async-storage';

// Durée de vie de la session en millisecondes (2 jours)
const SESSION_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000;

// Fonction pour enregistrer une session avec une date d'expiration
export const setSession = async (key, value) => {
  try {
    const expirationDate = new Date().getTime() + SESSION_EXPIRATION_TIME;
    const sessionData = JSON.stringify({
      value,
      expirationDate,
    });
    await AsyncStorage.setItem(key, sessionData);
    console.log('Session saved successfully');
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

// Fonction pour obtenir une session et vérifier l'expiration
export const getSession = async (key) => {
  try {
    const sessionData = await AsyncStorage.getItem(key);
    if (sessionData !== null) {
      const { value, expirationDate } = JSON.parse(sessionData);
      if (new Date().getTime() < expirationDate) {
        console.log('Session retrieved successfully');
        return value;
      } else {
        console.log('Session expired');
        await AsyncStorage.removeItem(key); // Supprimer la session expirée
      }
    }
    return null;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
};


// Fonction pour détruire toutes les sessions
export const destroyAllSessions = async () => {
    try {
      await AsyncStorage.clear(); // Supprime toutes les données stockées dans AsyncStorage
      console.log('All sessions destroyed successfully');
    } catch (error) {
      console.error('Error destroying all sessions:', error);
    }
  };
  