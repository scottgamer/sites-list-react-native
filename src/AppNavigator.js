import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SitesList from "./components/SitesList";
import SitesDetails from "./components/SiteDetails";

const NavigationStack = createStackNavigator(
  {
    SitesList: {
      screen: SitesList,
      navigationOptions: {
        header: null
      }
    },
    SitesDetails: {
      screen: SitesDetails,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "SitesList"
  }
);

const AppNavigator = createAppContainer(NavigationStack);

export default AppNavigator;
