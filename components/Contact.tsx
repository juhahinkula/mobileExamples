import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

export default function Contact() {
 const [contact, setContact] = useState<Contacts.Contact>();

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );

      if (data.length > 0) {
        setContact(data[0]); 
      }
      else {
        Alert.alert("Warning", "No contacts found.");
      }
    }
  }

  const sendSMS = async () => {
    const isSMSAvailable = await SMS.isAvailableAsync();
    
    if (isSMSAvailable && contact?.phoneNumbers) {
      const { result } = await SMS.sendSMSAsync(
        [contact.phoneNumbers[0].number || ""],
        `Hello ${contact.name}`
      );
    }
    else {
      Alert.alert("Warning", "SMS is not available on this device.");
    }
  }

  return (
    <View style = {styles.container}>
      { contact && <Text style={styles.textStyle}>{contact.name}</Text>}
      <View style={styles.buttonView}>
        <Button title="Get Contact" onPress={getContacts} />
        <Button title="Send SMS" onPress={sendSMS} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,   
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
  }, 
});