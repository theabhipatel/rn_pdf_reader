import React, {FC, useEffect, useState} from 'react';
import Box from '../../themes/Box';
import Text from '../../themes/Text';
import {ActivityIndicator, FlatList, Image, StatusBar} from 'react-native';
import {palette} from '../../themes/light';
import RNFS from 'react-native-fs';
import SingleFile from './SingleFile';
import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IFiles} from '../home/Home';
import {saveDataToStorage} from '../../utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  IRootStackParamList,
  IRootTabParamList,
} from '../../routes/navigationTypes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'RecentFiles'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const RecentFiles: FC<IProps> = () => {
  return (
    <>
      <RecentFilesCompo />
    </>
  );
};
//  {
//   const [isLoading, setIsLoading] = useState(false);
//   const [files, setFiles] = useState<IFiles[]>([]);

//   const isFocused = useIsFocused();

//   useEffect(() => {
//     handleGetAllFile();
//   }, [isFocused]);

//   /** ----> getting all files by Async Storage */
//   const handleGetAllFile = async () => {
//     setIsLoading(true);
//     const allFiles = await AsyncStorage.getItem('@files');
//     if (allFiles) {
//       const sortedFiles = JSON.parse(allFiles) as IFiles[];
//       sortedFiles.sort((a, b) => b.updatedAt - a.updatedAt);
//       setFiles(sortedFiles);
//     }
//     setIsLoading(false);
//   };

//   /** ----> deleting files from device and  Async Storage */
//   const handleFileDelete = async (filePath: string) => {
//     await RNFS.unlink(filePath);
//     setFiles(prev => {
//       return prev.filter(item => item.path !== filePath);
//     });
//     setFiles(prev => {
//       saveDataToStorage(prev);
//       return prev;
//     });
//   };

//   /** -----> add file to  favorite files */
//   const handleFileFavorite = (fileName: string) => {
//     setFiles(prev => {
//       const newState = prev.map(item => {
//         if (item.name === fileName) {
//           if (item.isFavorite === true) {
//             return {...item, isFavorite: false};
//           }
//           return {...item, isFavorite: true};
//         }
//         return item;
//       });
//       return newState;
//     });
//     setFiles(prev => {
//       saveDataToStorage(prev);
//       return prev;
//     });
//   };

//   /** ----> updating file opening time(updatedAt) when open any file */
//   const handleUpdateUpdatedAt = (fileName: string) => {
//     setFiles(prev => {
//       const newState = prev.map(item => {
//         if (item.name === fileName) {
//           return {...item, updatedAt: Date.now()};
//         }
//         return item;
//       });
//       return newState;
//     });
//     setFiles(prev => {
//       saveDataToStorage(prev);
//       return prev;
//     });
//   };

//   /** ----> while data is loading showing Activity Indicator */
//   if (isLoading) {
//     return (
//       <Box flex={1} justifyContent="center" alignItems="center">
//         <ActivityIndicator size={'large'} color={palette.mehroon} />
//       </Box>
//     );
//   }

//   /** ----> after data is loaded showing component */
//   return (
//     <Box flex={1}>
//       <Box my="lg" />

//       {files.length === 0 ? (
//         <Box flex={1} justifyContent="center" alignItems="center">
//           <Text>No Recent files yet !</Text>
//         </Box>
//       ) : (
//         <FlatList
//           data={files}
//           renderItem={file => (
//             <SingleFile
//               file={file}
//               handleFileDelete={handleFileDelete}
//               handleFileFavorite={handleFileFavorite}
//               handleUpdateUpdatedAt={handleUpdateUpdatedAt}
//             />
//           )}
//           style={{
//             flex: 1,
//             paddingHorizontal: 8,
//             marginBottom: 30,
//           }}
//         />
//       )}
//     </Box>
//   );
// };

export default RecentFiles;

export const RecentFilesCompo: FC<{isFavorite?: boolean}> = ({isFavorite}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<IFiles[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    handleGetAllFile();
  }, [isFocused]);

  /** ----> getting all files by Async Storage */
  const handleGetAllFile = async () => {
    setIsLoading(true);
    const allFiles = await AsyncStorage.getItem('@files');
    if (allFiles) {
      const sortedFiles = JSON.parse(allFiles) as IFiles[];
      sortedFiles.sort((a, b) => b.updatedAt - a.updatedAt);
      setFiles(sortedFiles);
    }
    setIsLoading(false);
  };

  /** ----> deleting files from device and  Async Storage */
  const handleFileDelete = async (filePath: string) => {
    await RNFS.unlink(filePath);
    setFiles(prev => {
      return prev.filter(item => item.path !== filePath);
    });
    setFiles(prev => {
      saveDataToStorage(prev);
      return prev;
    });
  };

  /** -----> add file to  favorite files */
  const handleFileFavorite = (fileName: string) => {
    setFiles(prev => {
      const newState = prev.map(item => {
        if (item.name === fileName) {
          if (item.isFavorite === true) {
            return {...item, isFavorite: false};
          }
          return {...item, isFavorite: true};
        }
        return item;
      });
      return newState;
    });
    setFiles(prev => {
      saveDataToStorage(prev);
      return prev;
    });
  };

  /** ----> updating file opening time(updatedAt) when open any file */
  const handleUpdateUpdatedAt = (fileName: string) => {
    setFiles(prev => {
      const newState = prev.map(item => {
        if (item.name === fileName) {
          return {...item, updatedAt: Date.now()};
        }
        return item;
      });
      return newState;
    });
    setFiles(prev => {
      saveDataToStorage(prev);
      return prev;
    });
  };

  /** ----> while data is loading showing Activity Indicator */
  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={'large'} color={palette.mehroon} />
      </Box>
    );
  }

  /** ----> after data is loaded showing component */
  return (
    <Box flex={1}>
      <Box my="xl" />

      {files.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>
            {isFavorite ? 'No Favorite files yet !' : 'No Recent files yet !'}
          </Text>
        </Box>
      ) : isFavorite &&
        files.filter(file => file.isFavorite === true).length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>No Favorite files yet !</Text>
        </Box>
      ) : (
        <FlatList
          data={
            isFavorite ? files.filter(file => file.isFavorite === true) : files
          }
          renderItem={file => (
            <SingleFile
              file={file}
              handleFileDelete={handleFileDelete}
              handleFileFavorite={handleFileFavorite}
              handleUpdateUpdatedAt={handleUpdateUpdatedAt}
            />
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
