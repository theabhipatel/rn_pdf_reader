import React from 'react';
import Box from '../../themes/Box';
import {Image} from 'react-native';
import Text from '../../themes/Text';

const Home = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$whiteMilk">
      <Box bg="$primary" p="lg" borderRadius={100}>
        <Box bg="mehroon" p="lg" borderRadius={100} opacity={1.6}>
          <Image
            source={require('../../images/pdf-1.png')}
            style={{width: 100, height: 100}}
          />
        </Box>
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
