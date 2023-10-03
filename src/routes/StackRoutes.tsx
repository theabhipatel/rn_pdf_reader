import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes';
import {IRootStackParamList} from './navigationTypes';

const Stack = createNativeStackNavigator<IRootStackParamList>();

const StackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={TabRoutes}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
