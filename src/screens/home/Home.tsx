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
import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {palette} from '../../themes/light';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveDataToStorage} from '../../utils';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Home'>,
  NativeStackScreenProps<IRootStackParamList>
>;

export interface IFiles {
  name: string;
  path: string;
  isFavorite: boolean;
  size: number;
  updatedAt: number;
}

const Home: FC<IProps> = ({navigation}) => {
  const [isOpeningInitialUrl, setIsOpeningInitialUrl] = useState(true);

  const [files, setFiles] = useState<IFiles[]>([]);

  // console.log('----- files from home ---->', files);

  useEffect(() => {
    handleDeepLink();
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    handleGetAllFile();
  }, [isFocused]);

  /** ----> getting all files by Async Storage */
  const handleGetAllFile = async () => {
    const allFiles = await AsyncStorage.getItem('@files');
    if (allFiles) {
      setFiles(JSON.parse(allFiles));
    }
  };

  /** ----> handling deeplinking initial url */
  const handleDeepLink = async () => {
    const initialUrl = await Linking.getInitialURL();
    // console.log('------ initialUrl -------> ', initialUrl);
    if (initialUrl) {
      setIsOpeningInitialUrl(true);
      handleOpenPdfFile(initialUrl, Date.now().toString());
    } else {
      setIsOpeningInitialUrl(false);
    }
  };

  /** ----> opening  files to pick pdf from device storage */
  const handlePickPdfDocument = async () => {
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

  /** ----> coping file in storage and  opening file in pdf viewer */
  const handleOpenPdfFile = async (filePath: string, fileName: string) => {
    try {
      const fileContents = await RNFS.readFile(filePath, 'base64');
      const internalFilePath = `${RNFS.ExternalDirectoryPath}/recent/${fileName}`;

      await RNFS.writeFile(internalFilePath, fileContents, 'base64');

      setFiles(prev => {
        const isFileExists = prev.find(item => item.path === internalFilePath);
        if (isFileExists) {
          return prev.map(file => {
            if (file.path === internalFilePath) {
              return {...file, updatedAt: Date.now()};
            }
            return file;
          });
        } else {
          return [
            ...prev,
            {
              name: fileName,
              isFavorite: false,
              path: internalFilePath,
              size: 34,
              updatedAt: Date.now(),
            },
          ];
        }
      });

      setFiles(prev => {
        saveDataToStorage(prev);
        return prev;
      });

      navigation.navigate('PdfViewer', {pdfUri: internalFilePath});
      setIsOpeningInitialUrl(false);
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
        <TouchableOpacity onPress={handlePickPdfDocument}>
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
