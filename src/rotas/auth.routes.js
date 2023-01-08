import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Imports de pages NÃO LOGADOS
import Login from '../pages/login'

const Stack = createNativeStackNavigator()

export default function AuthRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
            options={{
                headerShown:false
            }}
            name='Login' 
            component={Login}
            />
        </Stack.Navigator>
    )
}