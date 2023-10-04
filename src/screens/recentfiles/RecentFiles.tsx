import React, {FC, useEffect, useState} from 'react';
import Box from '../../themes/Box';
import Text from '../../themes/Text';
import {ActivityIndicator, FlatList, Image, StatusBar} from 'react-native';
import {palette} from '../../themes/light';
import RNFS, {ReadDirItem} from 'react-native-fs';
import SingleFile from './SingleFile';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const RecentFiles = () => {
  const [files, setFiles] = useState<ReadDirItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    handleGetRecentFiles();
  }, [isFocused]);

  const handleGetRecentFiles = async () => {
    setIsLoading(true);
    const dirPath = `${RNFS.ExternalDirectoryPath}/recent/`;
    const result = await RNFS.readDir(dirPath);
    setFiles(result);
    setIsLoading(false);
  };

  const handleFileDelete = async (filePath: string) => {
    await RNFS.unlink(filePath);
    handleGetRecentFiles();
  };

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={'large'} color={palette.mehroon} />
      </Box>
    );
  }
  return (
    <Box flex={1}>
      <Box my="lg" />

      {files.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>No Recent files yet !</Text>
        </Box>
      ) : (
        <FlatList
          data={files}
          renderItem={file => (
            <SingleFile file={file} handleFileDelete={handleFileDelete} />
          )}
          style={{
            flex: 1,
            paddingHorizontal: 8,
            marginBottom: 30,
          }}
        />
      )}
    </Box>
  );
};

export default RecentFiles;
