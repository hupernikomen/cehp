import React, { useState,useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import firebase from '@react-native-firebase/firestore';

import { AuthContext } from '../../Context/context';

export default function CadProduto() {

  const {user} = useContext(AuthContext)

  const [nome, setNome] = useState('')
  const [quantidade, setQuatidade] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [cor, setCor] = useState('')
  const [preco, setPreco] = useState('')
  const [observacoes, setObservacoes] = useState('')

  async function CadastrarProduto() {
    if (nome === '' || quantidade === '' || tamanho === '' || cor === '' || preco === ''){
       console.log('PREENCHA TODOS OS SCAMPOS');
       return
    }

    let produto ={
      userID: user?.uid,
      createdAt: new Date(),
      autor: user?.nome,
      produto: nome,
      quantidade: Number(quantidade),
      tamanho,
      cor,
      preco: parseFloat(preco),
      observacoes
    }

    await firebase().collection('produtos')
    .add(produto)
    .then(() => {
      console.log('CRIADO COM SUCESSO');
      setNome('')
      setCor('')
      setObservacoes('')
      setPreco('')
      setTamanho('')
      setQuatidade('')
    })
    .catch((err) => {
      console.log(err);
    })

  }

  return (
    <View style={styles.container}>
      <ScrollView>

        <TextInput style={styles.inputs} value={nome} onChangeText={(t) => setNome(t)} placeholder='nome do produto' />
        <TextInput style={styles.inputs} value={quantidade} onChangeText={(t) => setQuatidade(t)} placeholder='quantidade' />
        <TextInput style={styles.inputs} value={tamanho} onChangeText={(t) => setTamanho(t)} placeholder='tamanho' />
        <TextInput style={styles.inputs} value={cor} onChangeText={(t) => setCor(t)} placeholder='cor' />
        <TextInput style={styles.inputs} value={preco} onChangeText={(t) => setPreco(t)} placeholder='preço' />
        <TextInput style={styles.inputs} value={observacoes} onChangeText={(t) => setObservacoes(t)} multiline placeholder='observações' />

        <TouchableOpacity
          onPress={CadastrarProduto}
        >
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  inputs: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 15
  },
})