import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

//Navigators
import Main from './Navigators/Main';

//screens
import Header from './shared/Header';

export default function App() {
  return (
    <Provider store={store}>
         <NavigationContainer>         
      <Header />
      <Main />
        
    </NavigationContainer>
    </Provider>
   
   
  );
}
