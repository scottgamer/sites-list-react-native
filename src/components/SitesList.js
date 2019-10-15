import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Spinner } from 'react-native-ui-kitten'
import { setActiveSite, populateSiteData } from '../store/actions/sitesActions'

class SiteList extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://s3.amazonaws.com/decom_uploads/external/sites.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false
        })
        this.populateSiteData(responseJson.sites)
      })
      .catch(error => {
        console.error(error)
      })
  }

  populateSiteData = sites => {
    this.props.populateSiteData(sites)
  }

  openSiteDetails = index => {
    this.props.setActiveSite(index)
    this.props.navigation.navigate('SitesDetails')
  }

  renderGridItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        this.openSiteDetails(index)
      }}
    >
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.image }} style={styles.itemBgImage} />
        <View style={styles.nameAndAddressContainer}>
          <Text style={styles.itemNameText}>{item.name}</Text>
          <Text>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          {this.state.isLoading && this.props.sites.length === 0 ? (
            <View style={styles.flexCenterAll}>
              <Spinner size="giant" status="primary" />
            </View>
          ) : !this.state.isLoading && this.props.sites.length === 0 ? (
            <View style={styles.flexCenterAll}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                No sites found!.
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                data={this.props.sites}
                keyExtractor={site => site.id}
                renderItem={this.renderGridItem}
                contentContainerStyle={styles.listLayout}
              />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    )
  }
}

mapStateToProps = state => {
  return {
    sites: state.sitesReducer.sites
  }
}

mapDispatchToProps = dispatch => {
  return {
    setActiveSite: index => {
      dispatch(setActiveSite(index))
    },
    populateSiteData: sites => {
      dispatch(populateSiteData(sites))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  listLayout: {
    padding: 10,
    marginTop: 10
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 110,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    marginBottom: 15,
    borderRadius: 3,
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    alignContent: 'center',
    justifyContent: 'center'
  },
  itemBgImage: {
    height: '100%',
    width: '25%'
  },
  nameAndAddressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    marginRight: 7
  },
  itemNameText: { fontSize: 17, fontWeight: 'bold', marginBottom: 15 },
  flexCenterAll: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
