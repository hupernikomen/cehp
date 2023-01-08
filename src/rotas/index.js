import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { AuthContext } from '../Context/context'

export default function Routes() {

    const { signed,loading } = useContext(AuthContext)


    //tela de loading
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={50} color={'#000'} />
            </View>
        )
    }

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})