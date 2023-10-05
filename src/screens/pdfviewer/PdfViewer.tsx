import React from 'react';
import Pdf from 'react-native-pdf';
import Box from '../../themes/Box';

const PdfViewer = ({route}: any) => {
  // console.log('----- routes -------->', route.params);

  return (
    <>
      <Box flex={1}>
        <Pdf
          source={{
            uri: route.params.pdfUri,
            cache: true,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.error(error);
          }}
          style={{
            flex: 1,
            width: '100%',
          }}
        />
      </Box>
    </>
  );
};

export default PdfViewer;
