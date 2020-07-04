import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import configureStore from './src/Reducer/store';

const store = configureStore()

store.subscribe(()=>{
  console.log("CURRENT REDUX : : ",store.getState())
})

const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)


// import { AppRegistry } from 'react-native';




AppRegistry.registerComponent(appName, () => RNRedux);
