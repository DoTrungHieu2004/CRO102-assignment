import { Image, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { RootStackParamList } from '../navigation/StackNavigator';

type WelcomeProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/bg/ellipse1.png')} style={styles.image} />
      <Text style={styles.title}>Planta</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0f0c0'
  },
  image: {
    width: '100%',
    marginBottom: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32'
  }
});