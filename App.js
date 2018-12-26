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

const App = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  MainScreen: {
    screen: MainScreen
  },
  Contests: {
    screen: Contests
  },
  ContestDetails: {
    screen: ContestDetails
  },
  SuperPlayer: {
    screen: SuperPlayer
  }
});
export default createAppContainer(App);