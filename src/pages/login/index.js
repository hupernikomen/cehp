import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../Context/context';

export default function Login() {

  const [login, setLogin] = useState(true)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const { cadastrar, entrar, loadingAuth } = useContext(AuthContext)


  function TrocarLogin() {
    setLogin(!login)
    setNome('')
    setEmail('')
    setSenha('')
  }

  async function Entrar() {
    if (email === '' || senha === '') {
      console.log('PREENCHA TODOS OS CAMPOS');
    }

    //Logar Usuario
    await entrar(email, senha)
  }

  async function Cadastrar() {
    if (nome === '' || email === '' || senha === '') {
      console.log('PREENCHA TODOS OS CAMPOS');
    }

    //Cadastrar Usuario 
    await cadastrar(nome, email, senha)

  }

  if (login) {
    return (
      <View style={styles.container}>

        <View style={styles.form}>

          <TextInput
            value={email}
            onChangeText={(t) => setEmail(t)}
            placeholder='seuemail@email.com'
            style={styles.inputs} />

          <TextInput
            value={senha}
            onChangeText={(t) => setSenha(t)}
            placeholder='****'
            style={styles.inputs} />

          <TouchableOpacity
            style={styles.btn_entrar}
            onPress={Entrar}
          >
            {loadingAuth ?
              <ActivityIndicator size={20} color={'#fff'} /> :
              <Text style={styles.txt_entrar}>Entrar</Text>
            }

          </TouchableOpacity>

          <TouchableOpacity

            onPress={TrocarLogin}
          >

            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.form}>

        <TextInput
          value={nome}
          onChangeText={(t) => setNome(t)}
          placeholder='nome'
          style={styles.inputs} />

        <TextInput
          value={email}
          onChangeText={(t) => setEmail(t)}
          placeholder='seuemail@email.com'
          style={styles.inputs} />

        <TextInput
          value={senha} onChangeText={(t) => setSenha(t)}
          placeholder='****'
          style={styles.inputs} />

        <TouchableOpacity
          onPress={Cadastrar}
          style={styles.btn_entrar}
        >
          {loadingAuth ?
            <ActivityIndicator size={20} color={'#fff'} /> :
            <Text style={styles.txt_entrar}>Cadastrar</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity

          onPress={TrocarLogin}
        >
          <Text>Ja tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: '85%',
    padding: 15,
  },
  inputs: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 15
  },
  btn_entrar: {
    padding: 15,
    backgroundColor: 'green'
  },
  txt_entrar: {
    color: '#fff'
  }
})