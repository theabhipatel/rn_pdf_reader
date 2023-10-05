import AsyncStorage from '@react-native-async-storage/async-storage';
import {IFiles} from '../screens/home/Home';

export const saveDataToStorage = async (files: IFiles[]) => {
  await AsyncStorage.setItem('@files', JSON.stringify(files));
};
