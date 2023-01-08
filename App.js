import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/rotas';

import AuthProvider from './src/Context/context';

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>

                <StatusBar />
                <Routes />
                
            </AuthProvider>
        </NavigationContainer>
    );
}