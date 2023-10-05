import {Image, ListRenderItemInfo, TouchableOpacity} from 'react-native';
import React, {FC, memo} from 'react';
import Box from '../../themes/Box';
import {palette} from '../../themes/light';
import Text from '../../themes/Text';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IRootStackParamList} from '../../routes/navigationTypes';
import {IFiles} from '../home/Home';
import moment from 'moment';

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

  /** ---> filename slice if it is more then 12 letters */
  const fileName = `${name.slice(0, 12)}...pdf`;

  /** ---> calculating how many(sec, min, day) Ago time */
  const now = moment();
  const secondsAgo = now.diff(updatedAt, 'seconds');
  const minutesAgo = now.diff(updatedAt, 'minutes');
  const daysAgo = now.diff(updatedAt, 'days');

  let timeAgo: string;
  if (secondsAgo < 60) {
    timeAgo = `${secondsAgo} sec ago`;
  } else if (minutesAgo < 60) {
    timeAgo = `${minutesAgo} min ago`;
  } else if (daysAgo < 1) {
    timeAgo = 'today';
  } else if (daysAgo === 1) {
    timeAgo = 'last day';
  } else {
    timeAgo = `${daysAgo} days ago`;
  }

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
        <Box flexDirection="row" alignItems="center">
          <Image
            source={require('../../images/pdf-2.png')}
            style={{width: 20, height: 20, tintColor: palette.white}}
          />
          <Box>
            <Text ml="sm" color="white">
              {name.length < 12 ? name : fileName}
            </Text>
            <Text ml="sm" color="white" fontSize={10} lineHeight={10}>
              {timeAgo}
            </Text>
          </Box>
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
