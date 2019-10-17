import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking
} from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OtherContacts from './OtherContacts';

class SiteDetails extends Component {
  constructor() {
    super();
    this.state = {
      isImageLoaded: false
    };
  }

  // TODO: activate EditIcon component when logic is defined
  header = () => {
    return (
      <Header
        leftComponent={<BackArrow />}
        // rightComponent={<EditIcon />}
        containerStyle={{
          backgroundColor: '#00aae9'
        }}
      />
    );
  };

  handleDialCall = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`).catch(err => console.log(err));
  };

  handleEmail = email => {
    Linking.openURL(`mailto:${email}`).catch(err => console.log(err));
  };

  loadRealImage = () => {
    this.setState({ isImageLoaded: true });
  };

  render() {
    BackArrow = () => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.replace('SitesList');
          }}
        >
          <View style={styles.headerContainer}>
            <Ionicons name="ios-arrow-back" size={30} color="#fff" />
            <Text style={styles.headertext}>All Sites</Text>
          </View>
        </TouchableOpacity>
      );
    };

    EditIcon = () => {
      return (
        <TouchableOpacity>
          <FontAwesome name="pencil" size={25} color="#fff" />
        </TouchableOpacity>
      );
    };

    return (
      <View>
        {this.header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bodyContainer}>
            <View style={styles.detailsContainer}>
              <View style={styles.childContainerOne}>
                <Image
                  source={
                    this.state.isImageLoaded
                      ? { uri: this.props.activeSite.image }
                      : require('../../assets/images/default_image_thumbnail.png')
                  }
                  style={styles.itemBgImage}
                  onLoad={() => {
                    console.log('on load start', this.state.isImageLoaded);
                    this.loadRealImage();
                  }}
                />
                <View style={styles.nameContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.boldText}>Name:</Text>
                    <Text>{this.props.activeSite.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.boldText}>Main Contact:</Text>
                    <Text>
                      {this.props.activeSite.contacts.length > 0 &&
                        this.props.activeSite.contacts[0].name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.childContainerTwo}>
                <Text style={styles.boldText}>Address:</Text>
                <Text>{this.props.activeSite.address}</Text>
              </View>
              {this.props.activeSite.contacts.length > 0 && (
                <View>
                  <View style={styles.childContainerThree}>
                    <Text style={styles.boldText}>Phone:</Text>
                    <View style={styles.phoneNumberContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          this.handleDialCall(
                            this.props.activeSite.contacts[0].phone
                          );
                        }}
                      >
                        <View>
                          <Text>{this.props.activeSite.contacts[0].phone}</Text>
                        </View>
                      </TouchableOpacity>
                      <Text style={styles.leftText}>Work</Text>
                    </View>

                    <View
                      style={[styles.phoneNumberContainer, { marginTop: 7 }]}
                    >
                      <Text>
                        {this.props.activeSite.contacts[0].phone_home}
                      </Text>
                      <Text style={styles.leftText}>Home</Text>
                    </View>
                  </View>

                  <View style={styles.childContainerFour}>
                    <Text style={styles.boldText}>Email:</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.handleEmail(
                          this.props.activeSite.contacts[0].email
                        );
                      }}
                    >
                      <View>
                        <Text>{this.props.activeSite.contacts[0].email}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <OtherContacts
                    contacts={this.props.activeSite.contacts}
                    dial={this.handleDialCall}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    sites: state.sitesReducer.sites,
    activeSite: state.sitesReducer.activeSite
  };
};

export default connect(
  mapStateToProps,
  null
)(SiteDetails);

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headertext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10
  },
  bodyContainer: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column'
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10
  },
  childContainerOne: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30
  },
  itemBgImage: {
    height: 110,
    width: '45%'
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 40,
    justifyContent: 'space-around',
    height: 110
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  childContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30
  },
  phoneNumberContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftText: {
    textAlign: 'left'
  },
  childContainerFour: {
    marginTop: 30,
    marginBottom: 20
  }
});
