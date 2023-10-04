import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes';
import {IRootStackParamList} from './navigationTypes';
import PdfViewer from '../screens/pdfviewer/PdfViewer';

const Stack = createNativeStackNavigator<IRootStackParamList>();

const StackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={TabRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewer}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
