import React, { useState, createContext, useEffect } from 'react';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true) // carregamento antes de redirecionar caso logado

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@cehp')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)

        }
        loadStorage()
    }, [])

    async function cadastrar(nome, email, senha) {

        setLoadingAuth(true)

        await auth().createUserWithEmailAndPassword(email, senha)
            .then(async (value) => {
                let uid = value.user.uid

                await firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        criacao: new Date()
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email
                        }

                        setUser(data)
                        storageUser(data)
                    })
                setLoadingAuth(false)
            })
            .catch((err) => {
                console.log(err);
                setLoadingAuth(false)
            })
    }

    async function entrar(email, senha) {

        setLoadingAuth(true)

        await auth().signInWithEmailAndPassword(email, senha)
            .then(async (value) => {
                let uid = value.user.uid

                const userProfile = await firestore()
                    .collection('users')
                    .doc(uid)
                    .get()

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    email: value.user.email
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
            })
            .catch((err) => {
                console.log(err);
                setLoadingAuth(false)
            })
    }

    async function deslogar(){
        await auth().signOut()
        await AsyncStorage.clear()
        .then(() => {
            setUser(null)
        })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('@cehp', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            cadastrar,
            entrar,
            deslogar,
            loadingAuth,
            loading,
            user

        }}>

            {children}

        </AuthContext.Provider>
    );
}