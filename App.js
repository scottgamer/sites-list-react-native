import React from 'react';
import AppNavigator from './src/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/store';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Provider store={store}>
          <AppNavigator />
      </Provider>
    </ApplicationProvider>
  );
}
