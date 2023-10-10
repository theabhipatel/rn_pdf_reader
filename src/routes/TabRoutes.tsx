import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import RecentFiles from '../screens/recentfiles/RecentFiles';
import FavoriteFiles from '../screens/favoritefiles/FavoriteFiles';
import {IRootTabParamList} from './navigationTypes';
import {palette} from '../themes/light';
import Box from '../themes/Box';
import {Image} from 'react-native';
import Text from '../themes/Text';

const Tab = createBottomTabNavigator<IRootTabParamList>();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: palette.white,
          height: 65,
          paddingTop: 5,
        },
        headerShadowVisible: false,
      }}>
      <Tab.Screen
        name="RecentFiles"
        component={RecentFiles}
        options={{
          title: 'Recent Files',
          headerTransparent: true,
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <Box p="sm" justifyContent="center" alignItems="center">
                  <Box
                    position="absolute"
                    bottom={10}
                    borderRadius={40}
                    p="sm"
                    justifyContent="center"
                    alignItems="center"
                    bg="$whiteMilk">
                    <Box p="md" bg="$primary" borderRadius={40}>
                      <Image
                        source={require('../images/recent.png')}
                        style={{
                          width: 22,
                          height: 22,
                          tintColor: focused ? palette.white : palette.black,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box px="sm" justifyContent="center" alignItems="center">
                  <Image
                    source={require('../images/recent.png')}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: focused ? palette.mehroon : palette.black,
                    }}
                  />
                  <Text fontSize={12} color={focused ? '$primary' : 'black'}>
                    Recent
                  </Text>
                </Box>
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerTransparent: true,
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <Box p="sm" justifyContent="center" alignItems="center">
                  <Box
                    position="absolute"
                    bottom={10}
                    borderRadius={40}
                    p="sm"
                    justifyContent="center"
                    alignItems="center"
                    bg="$whiteMilk">
                    <Box p="md" bg="$primary" borderRadius={40}>
                      <Image
                        source={require('../images/home.png')}
                        style={{
                          width: 22,
                          height: 22,
                          tintColor: focused ? palette.white : palette.black,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box px="sm" justifyContent="center" alignItems="center">
                  <Image
                    source={require('../images/home.png')}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: focused ? palette.mehroon : palette.black,
                    }}
                  />
                  <Text fontSize={12} color={focused ? '$primary' : 'black'}>
                    Home
                  </Text>
                </Box>
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteFiles"
        component={FavoriteFiles}
        options={{
          title: 'Favorite',
          headerTransparent: true,
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <Box p="sm" justifyContent="center" alignItems="center">
                  <Box
                    position="absolute"
                    bottom={10}
                    borderRadius={40}
                    p="sm"
                    justifyContent="center"
                    alignItems="center"
                    bg="$whiteMilk">
                    <Box p="md" bg="$primary" borderRadius={40}>
                      <Image
                        source={require('../images/star.png')}
                        style={{
                          width: 22,
                          height: 22,
                          tintColor: focused ? palette.white : palette.black,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box px="sm" justifyContent="center" alignItems="center">
                  <Image
                    source={require('../images/star.png')}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: focused ? palette.mehroon : palette.black,
                    }}
                  />
                  <Text fontSize={12} color={focused ? '$primary' : 'black'}>
                    Favorite
                  </Text>
                </Box>
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
