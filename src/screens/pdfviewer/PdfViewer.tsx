import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';

const PdfViewer = ({route}: any) => {
  console.log('----- routes -------->', route.params);

  return (
    <>
      <View style={{flex: 1}}>
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
      </View>
    </>
  );
};

export default PdfViewer;
