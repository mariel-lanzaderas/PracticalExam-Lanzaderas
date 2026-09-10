import { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'; 
import ContactCard from '../components/ContactCard';
export default function ContactListScreen({ navigation, contacts, setContacts }) {
    // TODO Task 5: fetch a fun fact and store it in state; display it above the  list.\
    
    const [fact, setFact] = useState('');
    useEffect(() => {
        // Simulate an API call to fetch a fun fact
        setTimeout(() => {
            setFact('Did you know that the shortest war in history lasted only 38 minutes?');
        }, 1000);
    }, []);
    // TODO Task 2: render `contacts` with FlatList + ContactCard.  // - show a ListEmptyComponent message when there are no contacts  // - show a header like "2 contacts saved" (correct singular/plural) 
    const renderItem = ({ item }) => (
        <ContactCard name={item.name} phone={item.phone} />
    );
    function renderHeader() {
        const contactCount = contacts.length;
        return (
            <Text style={styles.header}>
                {contactCount} {contactCount === 1 ? 'contact' : 'contacts'} saved
            </Text>
        );
    }

    return (
        <View style={styles.container}>
            <Button title="Add Contact" onPress={() =>
                navigation.navigate('AddContact')} />
            {renderHeader()}
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ContactCard name={item.name} phone={item.phone} />}
                ListEmptyComponent={<Text>No contacts saved</Text>}
            />
            <Text style={styles.fact}>Did you know? {fact}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
    input: { borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 16 },
    fact: { fontStyle: 'italic', marginTop: 16 },
    error: { color: 'red', marginBottom: 16 },
    
}); 
