import React from 'react';
import { Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeMainScreen from './HomeMainScreen';
import HomeContests from './HomeContests';
import HomeContestDetails from './HomeContestDetails';


export default createAppContainer(
  createStackNavigator(
    {
      HomeMainScreen: { 
        screen: HomeMainScreen
      },
       HomeContests: { 
        screen: HomeContests
      },
      HomeContestDetails: { 
        screen: HomeContestDetails
      }
    }
));