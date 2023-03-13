import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoginScreen = ({ navigation }) => {
    return (
      <Button
        title="Login"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
      />
    );
  };