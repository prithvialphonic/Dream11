import React from 'react';
import { Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeTabStack from './TabNavigation/HomeTabStack';
import My_Leagues from './TabNavigation/My_Leagues';
import MyProfileTab from './TabNavigation/MyProfileTab';
import MoreOptionsTab from './TabNavigation/MoreOptionsTab';


export default createAppContainer(
  createBottomTabNavigator(
    {
      HomeTabStack: { 
        screen: HomeTabStack,
        navigationOptions: {
          tabBarLabel: 'Home',
          header: null,
          tabBarIcon: ({ tintColor }) => (
            <Entypo name='home' color= {tintColor} size= {20} />
          )
        }
      },
      My_Leagues: { 
        screen: My_Leagues ,
        navigationOptions: {
          tabBarLabel: 'My League',
          tabBarIcon: ({ tintColor }) => (
            <Entypo name='trophy' color= {tintColor} size= {20} />
          ),
        }
      },
      MyProfileTab: { 
        screen: MyProfileTab,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor }) => (
            <Entypo name='user' color= {tintColor} size= {20} />
          )
        }
      },
      MoreOptionsTab: { 
        screen: MoreOptionsTab,
        navigationOptions: {
          tabBarLabel: 'More',
          header: null,
          tabBarIcon: ({ tintColor }) => (
            <Entypo name='dots-three-horizontal' color= {tintColor} size= {20} />
          )
        }
      },
    },
    {
      initialRouteName: 'HomeTabStack',
      navigationOptions: {
        tabBarVisible: false,
      },
      tabBarOptions: {
        elevation: 5,
        swipeEnabled: true,
        activeTintColor: '#27ae60',
        inactiveTintColor: '#b8e994'
      },
      indicatorStyle: {
      backgroundColor : 'transparent',
      height : 0
    },
    }
  )
);