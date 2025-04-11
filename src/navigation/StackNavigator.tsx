import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabs from './MainTabs';
import ProductDetailScreen from '../screens/ProductDetailScreen';

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    MainTabs: undefined;
    ProductDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLogin = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            setIsLoggedIn(!!userInfo);
        };
        checkLogin();
    }, []);

    if (isLoggedIn === null) return null;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLoggedIn ? 'MainTabs' : 'Welcome'}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </Stack.Navigator>
    );
};