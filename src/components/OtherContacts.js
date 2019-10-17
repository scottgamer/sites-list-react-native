import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const OtherContacts = props => {
  return (
    <View style={styles.otherContacts}>
      <View style={styles.otherContactsHeader}>
        <Text>Other Contacts</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {props.contacts.map((contact, index) => {
            if (index !== 0) {
              return (
                <View
                  key={index.toString()}
                  style={styles.phoneNumberContainer2}
                >
                  <Text>{contact.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      props.dial(contact.phone);
                    }}
                  >
                    <View>
                      <Text style={styles.leftText}>{contact.phone}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  otherContacts: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 140
  },
  otherContactsHeader: {
    backgroundColor: '#eee',
    padding: 5,
    paddingLeft: 10
  },
  phoneNumberContainer2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  leftText: {
    textAlign: 'left'
  }
});

export default OtherContacts;
