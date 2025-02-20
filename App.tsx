/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/Splash';
import Home from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import PDFViewer from './src/screens/PDFViewer';
import GoogleDrivePDFViewer from './src/screens/GoogleDrivePDFViewer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PDFViewer" component={PDFViewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


