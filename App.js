import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactListScreen from './screens/ContactListScreen';
import AddContactScreen from './screens/AddContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [contacts, setContacts] = useState([]);

  // Load contacts from AsyncStorage when app starts
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const savedContacts = await AsyncStorage.getItem('contacts');
        if (savedContacts !== null) {
          setContacts(JSON.parse(savedContacts));
        } else {
          // If no saved data, use default sample contacts
          setContacts([
            { id: '1', name: 'Juan Dela Cruz', phone: '0917-000-0001' },
            { id: '2', name: 'Maria Santos', phone: '0917-000-0002' },
          ]);
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
        // Fallback to default contacts on error
        setContacts([
          { id: '1', name: 'Juan Dela Cruz', phone: '0917-000-0001' },
          { id: '2', name: 'Maria Santos', phone: '0917-000-0002' },
        ]);
      }
    };
    
    loadContacts();
  }, []);

  // Save contacts to AsyncStorage whenever contacts change
  useEffect(() => {
    const saveContacts = async () => {
      try {
        await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      } catch (error) {
        console.error('Error saving contacts:', error);
      }
    };
    
    // Only save if contacts array has been initialized (not empty array from initial state)
    // This prevents overwriting saved data with empty array on first render
    if (contacts.length > 0 || (contacts.length === 0 && contacts !== [])) {
      saveContacts();
    }
  }, [contacts]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" options={{ title: 'My Contacts' }}>
          {(props) => (
            <ContactListScreen {...props} navigation={props.navigation} contacts={contacts} setContacts={setContacts} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddContact" options={{ title: 'Add Contact' }}>
          {(props) => (
            <AddContactScreen {...props} navigation={props.navigation} contacts={contacts} setContacts={setContacts} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
