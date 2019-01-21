import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Welcome from './Components/Welcome';
import MainScreen from './Components/MainScreen';
import Contests from './Components/Contests';
import ContestDetails from './Components/ContestDetails';
import SuperPlayer from './Components/SuperPlayer';
import indexOfTab from './Components/indexOfTab';
import Wallet from './Components/Wallet';
import Register from './Components/AuthScreens/Register';
import Login from './Components/AuthScreens/Login';

const App = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  indexOfTab: {
    screen: indexOfTab,
    navigationOptions: {
      header: null
    }
  },
  MainScreen: {
    screen: MainScreen
  },
  Register: {
    screen: Register
  },
  Login: {
    screen: Login
  },
  Contests: {
    screen: Contests
  },
  ContestDetails: {
    screen: ContestDetails
  },
  SuperPlayer: {
    screen: SuperPlayer
  },
  Wallet: {
    screen: Wallet
  },
});
export default createAppContainer(App);