import React from 'react';
import StackRoutes from './src/routes/StackRoutes';
import {ThemeProvider} from '@shopify/restyle';
import {NavigationContainer} from '@react-navigation/native';
import theme from './src/themes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
