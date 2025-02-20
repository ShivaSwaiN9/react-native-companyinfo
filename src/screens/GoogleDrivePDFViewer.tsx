import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import ReactNativePdf from 'react-native-pdf';

const GoogleDrivePDFViewer = () => {
  // URL for the Google Drive PDF
  const googleDriveFileId = '1j9PL14nVkhYi9pzUgeO3odWFGSuOOuUx'; // Replace with your actual file ID
  const fileUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;
  
  // Define the local path where the file will be saved
  const localFilePath = RNFS.DocumentDirectoryPath + '/downloadedFile.pdf';
  
  const [isDownloaded, setIsDownloaded] = useState(false);

  // Function to check if the PDF already exists
  const checkIfFileExists = async () => {
    try {
      const fileExists = await RNFS.exists(localFilePath);
      if (fileExists) {
        setIsDownloaded(true);  // Set state to true if file exists
      } else {
        setIsDownloaded(false);  // Set state to false if file doesn't exist
      }
    } catch (error) {
      console.log('Error checking file existence:', error);
    }
  };

  // Function to download the PDF file
  const downloadFile = async () => {
    try {
      const result = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: localFilePath,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('Download Complete', 'The PDF has been downloaded.');
        setIsDownloaded(true);
      } else {
        Alert.alert('Download Failed', 'There was an issue downloading the PDF.');
      }
    } catch (error) {
      console.log('Error downloading file:', error);
      Alert.alert('Download Error', 'There was an error downloading the PDF.');
    }
  };

  useEffect(() => {
    checkIfFileExists(); // Check if the file exists when the component mounts
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!isDownloaded ? (
        // Show a button to download the file if not downloaded
        <Button title="Download PDF" onPress={downloadFile} />
      ) : (
        // Show the PDF viewer once the file is downloaded
        <ReactNativePdf
          source={{ uri: localFilePath, cache: true }}
          onLoadComplete={(numberOfPages) => {
            console.log(`Loaded ${numberOfPages} pages.`);
          }}
          onError={(error) => {
            console.log('Error:', error);
            Alert.alert('Error', 'Failed to load the PDF');
          }}
        />
      )}
    </View>
  );
};

export default GoogleDrivePDFViewer;
