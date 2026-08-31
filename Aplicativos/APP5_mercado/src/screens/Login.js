import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
    const [inputValue, setInputValue] = useState('');
    const { setUserName } = useContext(UserContext);

    function pegarLogin() {
        if (inputValue.trim() !== '') {
            setUserName(inputValue);
        } else {
            alert('Por favor, para acessar, digite um nome');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seja bem-vindo à lista de compras</Text>

            <TextInput
                style={styles.input}
                placeholder='Digite seu nome'
                value={inputValue}
                onChangeText={setInputValue}
            />

            <TouchableOpacity style={styles.entrar} onPress={pegarLogin}>
                <Text style={styles.botaoEntrar}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,    
    }, 
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    entrar: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    botaoEntrar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});