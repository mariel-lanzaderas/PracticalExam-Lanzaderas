import { View, Text, StyleSheet } from 'react-native';
// TODO Task 1: accept `name` and `phone` as props and display them. // Use Flexbox to lay the card out neatly (e.g. name bold on top, phone below). 
export default function ContactCard({ name, phone }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{name}</Text>
            <Text>{phone}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        padding: 12, marginVertical: 6, backgroundColor: '#EEF2F8', borderRadius: 8
    },
    title: { fontWeight: 'bold', fontSize: 16 },
}); 
