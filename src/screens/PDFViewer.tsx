import React from 'react';
import { View, Alert, Share, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const PDFViewer = ({ route, navigation }: any) => {
  const { pdfUrl, pdfdownload } = route.params; // Receiving pdfUrl

  // Function to share the PDF link
  const handleShare = async () => {
    try {
      await Share.share({
        message: `UtkalGroup Profile: ${pdfdownload}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share the link');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* WebView to display PDF */}
      <WebView
        source={{ uri: pdfUrl }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        onError={(error) => {
          console.log('WebView Error:', error);
          Alert.alert('Error', 'Failed to load PDF.');
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      {/* Bottom Bar with Icons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 10,
          backgroundColor: '#1E1E1E', // Dark background
        }}
      >
        {/* Home Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            backgroundColor: '#333', // Slightly lighter black
            padding: 12,
            borderRadius: 50,
          }}
          activeOpacity={0.7}
        >
          <Image
            source={require('../assets/icons/home-agreement.png')}
            style={{ width: 28, height: 28, tintColor: '#FFFFFF' }} // White icon color
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          onPress={handleShare}
          style={{
            backgroundColor: '#333',
            padding: 12,
            borderRadius: 50,
          }}
          activeOpacity={0.7}
        >
          <Image
            source={require('../assets/icons/share.png')}
            style={{ width: 28, height: 28, tintColor: '#FFFFFF' }} // White icon color
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PDFViewer;
