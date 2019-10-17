import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'react-native-ui-kitten';
import {
  setActiveSite,
  populateSiteData,
  populateMoreSiteData
} from '../store/actions/sitesActions';

class SiteList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isLoadingMore: false
    };
  }

  async componentDidMount() {
    const data = await this.fetchData();
    this.setState({
      isLoading: false
    });
    this.populateSiteData(data.sites);
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        'https://s3.amazonaws.com/decom_uploads/external/sites.json'
      );
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  handleLoadMore = async () => {
    if (!this.state.isLoadingMore) {
      this.setState({
        isLoadingMore: true
      });
      const data = await this.fetchData();
      this.setState(
        {
          isLoadingMore: false
        },
        () => {
          this.populateMoreSiteData(data.sites);
        }
      );
    }
  };

  populateSiteData = sites => {
    this.props.populateSiteData(sites);
  };

  populateMoreSiteData = sites => {
    this.props.populateMoreSiteData(sites);
  };

  openSiteDetails = index => {
    this.props.setActiveSite(index);
    this.props.navigation.navigate('SitesDetails');
  };

  renderGridItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        this.openSiteDetails(index);
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
  );

  renderFooter = () => {
    if (!this.state.isLoadingMore) return null;
    return (
      <View
        style={{
          backgroundColor: '#fefefe',
          padding: 10,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spinner size="giant" status="primary" />
      </View>
    );
  };

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
            <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.sites}
                keyExtractor={site => site.index}
                renderItem={this.renderGridItem}
                contentContainerStyle={styles.listLayout}
                onEndReached={() => {
                  this.handleLoadMore();
                }}
                onEndReachedThreshold={0.01}
                ListFooterComponent={this.renderFooter}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

mapStateToProps = state => {
  return {
    sites: state.sitesReducer.sites
  };
};

mapDispatchToProps = dispatch => {
  return {
    setActiveSite: index => {
      dispatch(setActiveSite(index));
    },
    populateSiteData: sites => {
      dispatch(populateSiteData(sites));
    },
    populateMoreSiteData: sites => {
      dispatch(populateMoreSiteData(sites));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteList);

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
    borderColor: 'black',
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.75 },
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
});
