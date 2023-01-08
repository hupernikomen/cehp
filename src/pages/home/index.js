import React, { useContext } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';

import { AuthContext } from '../../Context/context';

import { useNavigation } from '@react-navigation/native';

export default function Home() {

    const navigation= useNavigation()

    const { user, deslogar } = useContext(AuthContext)

    async function deslogarUser() {
        await deslogar()
    }

    return (
        <View style={styles.container}>

            <Text>{user.nome}</Text>

            <TouchableOpacity
            style={styles.btn}
            onPress={()=>navigation.navigate('CadProduto')}
            >
                <Text>Cadastrar Produto</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btn}
                onPress={deslogarUser}
            >
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        padding:15
    },
    btn:{
        paddingVertical:15
    }
})