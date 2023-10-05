import {Image, ListRenderItemInfo, TouchableOpacity} from 'react-native';
import React, {FC, memo} from 'react';
import Box from '../../themes/Box';
import {palette} from '../../themes/light';
import Text from '../../themes/Text';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IRootStackParamList} from '../../routes/navigationTypes';
import RNFS, {ReadDirItem} from 'react-native-fs';
import {IFiles} from '../home/Home';

type NavigationPropType = NavigationProp<IRootStackParamList>;
interface IProps {
  file: ListRenderItemInfo<IFiles>;
  handleFileDelete: (filePath: string) => void;
  handleFileFavorite: (fileName: string) => void;
  handleUpdateUpdatedAt: (fileName: string) => void;
}

const SingleFile: FC<IProps> = ({
  file,
  handleFileDelete,
  handleFileFavorite,
  handleUpdateUpdatedAt,
}) => {
  const navigation = useNavigation<NavigationPropType>();
  const {name, path, isFavorite, updatedAt} = file.item;

  const handlFileOpen = (filePath: string) => {
    navigation.navigate('PdfViewer', {pdfUri: filePath});
    handleUpdateUpdatedAt(name);
  };

  const fileName = `${name.slice(0, 12)}...pdf`;

  return (
    <Box
      width={'100%'}
      my="xs"
      bg="$primary"
      p="xs"
      pl="md"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <TouchableOpacity
        onPress={() => handlFileOpen(path)}
        style={{width: '70%'}}>
        <Box flexDirection="row">
          <Image
            source={require('../../images/pdf-2.png')}
            style={{width: 20, height: 20, tintColor: palette.white}}
          />
          <Text ml="sm" color="white">
            {name.length < 12 ? name : fileName}
          </Text>
        </Box>
      </TouchableOpacity>
      <Box flexDirection="row" width={'30%'} justifyContent="space-between">
        <TouchableOpacity
          style={{padding: 8}}
          onPress={() => handleFileFavorite(name)}>
          <Image
            source={require('../../images/star.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: isFavorite ? palette.yellow : palette.white,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFileDelete(path)}
          style={{padding: 8}}>
          <Image
            source={require('../../images/bin.png')}
            style={{width: 20, height: 20, tintColor: palette.white}}
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default memo(SingleFile);
