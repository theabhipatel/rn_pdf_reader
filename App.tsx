import React, {useEffect} from 'react';
import StackRoutes from './src/routes/StackRoutes';
import {ThemeProvider} from '@shopify/restyle';
import {NavigationContainer} from '@react-navigation/native';
import theme from './src/themes';
import RNFS from 'react-native-fs';
import {StatusBar} from 'react-native';
import {palette} from './src/themes/light';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    handleCheckDirExists();
  }, []);

  const handleCheckDirExists = async () => {
    const dirPath = `${RNFS.ExternalDirectoryPath}/recent/`;
    const isExists = await RNFS.exists(dirPath);
    if (isExists) return;
    await RNFS.mkdir(dirPath);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={palette.mehroon}
          barStyle={'light-content'}
        />
        <StackRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
