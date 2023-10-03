import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import RecentFiles from '../screens/recentfiles/RecentFiles';
import FavoriteFiles from '../screens/favoritefiles/FavoriteFiles';
import {IRootTabParamList} from './navigationTypes';

const Tab = createBottomTabNavigator<IRootTabParamList>();

const TabRoutes = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="RecentFiles"
        component={RecentFiles}
        options={{
          title: 'Recent',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, headerTransparent: true}}
      />
      <Tab.Screen
        name="FavoriteFiles"
        component={FavoriteFiles}
        options={{
          title: 'Favorite',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
