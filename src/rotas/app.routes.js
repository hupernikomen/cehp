import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Imports pages LOGADOS

import Venda from '../pages/venda'
import Home from '../pages/home'
import Estoque from '../pages/estoque'
import CadProduto from '../pages/cad_produto'



const Tabs = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Venda' component={Venda} />
            <Stack.Screen name='CadProduto' component={CadProduto} />
            <Stack.Screen name='Estoque' component={Estoque} />
        </Stack.Navigator>
    )
}

export default function AppRoutes() {
    return (

        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,

            }}
        >
            <Tabs.Screen name='HomeTab' component={StackRoutes} />
        </Tabs.Navigator>
    )
}