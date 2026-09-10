import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
export default function AddContactScreen({ navigation, contacts, setContacts }) {
    // TODO Task 3: build a form (name + phone TextInputs). 
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [error, setError] = useState('');

    // - validate both fields are non-empty; show an inline error if not  // - on success, add the new contact and navigate back to ContactList 
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                style={styles.input}    
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Phone"
                style={styles.input}    
                value={phone}
                onChangeText={setPhone}
            />  
            <Button title="Add Contact" onPress={() => {
                // Validate inputs
                if (name.trim() === '' || phone.trim() === '') {
                    // Show error message
                } else {
                    // Add new contact
                    setContacts([...contacts, { id: Date.now().toString(), name, phone }]);
                    navigation.goBack();
                }
            }} />       
            {error ? <Text style={styles.error}>{error}</Text> : null}

        </View>      
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 16 },
    error: { color: 'red', marginBottom: 16 },
    fact: { fontStyle: 'italic', marginTop: 16 },
}); 
