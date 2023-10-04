import React, {FC, useEffect, useState} from 'react';
import Box from '../../themes/Box';
import {
  ActivityIndicator,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Text from '../../themes/Text';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  IRootStackParamList,
  IRootTabParamList,
} from '../../routes/navigationTypes';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {palette} from '../../themes/light';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Home'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const Home: FC<IProps> = ({navigation}) => {
  const [isOpeningInitialUrl, setIsOpeningInitialUrl] = useState(true);

  useEffect(() => {
    handleDeepLink();
  }, []);

  /** ----> handling deeplinking initial url */
  const handleDeepLink = async () => {
    const initialUrl = await Linking.getInitialURL();
    console.log('------ initialUrl -------> ', initialUrl);
    if (initialUrl) {
      setIsOpeningInitialUrl(true);
      handleOpenPdfFile(initialUrl, Date.now().toString());
    } else {
      setIsOpeningInitialUrl(false);
    }
  };

  /** ----> opening pdf file from device storage */
  const openPdfDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      handleOpenPdfFile(result[0].uri, result[0].name!);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        console.log(err);
      }
    }
  };

  /** ----> caching and  opening file in pdf viewer */
  const handleOpenPdfFile = async (filePath: string, fileName: string) => {
    try {
      const fileContents = await RNFS.readFile(filePath, 'base64');
      const internalFilePath = `${RNFS.ExternalDirectoryPath}/recent/${fileName}`;

      await RNFS.writeFile(internalFilePath, fileContents, 'base64');

      navigation.navigate('PdfViewer', {pdfUri: internalFilePath});
      setIsOpeningInitialUrl(false);
      console.log('internalFilePath ---->', internalFilePath);
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  if (isOpeningInitialUrl) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={'large'} color={palette.mehroon} />
      </Box>
    );
  }

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$whiteMilk">
      <Box bg="$lightRed" p="lg" borderRadius={100}>
        <TouchableOpacity onPress={openPdfDocument}>
          <Box bg="$primary" p="lg" borderRadius={100} opacity={1.6}>
            <Image
              source={require('../../images/pdf-1.png')}
              style={{width: 100, height: 100}}
            />
          </Box>
        </TouchableOpacity>
      </Box>
      <Box mt="sm">
        <Text fontSize={20} fontWeight="600">
          Tab to open Pdf
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
