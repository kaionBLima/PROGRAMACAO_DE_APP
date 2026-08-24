import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
const [texto, setTexto] = useState('');
const [frase, setFrase] = useState('Madrugada');
const [numeroDado, setnumeroDado] = useState (1);

const sortear_numDado = () => { 
  const numSorteado = Math.floor(Math.random() * 6) + 1;
  setnumeroDado(numSorteado)

  if (numSorteado === 6) {
    setFrase("Boa noite");
  } else if (numSorteado === 5) {
    setFrase("Boa tarde")
  } else if (numSorteado == 4) {
    setFrase("Bom dia")
  } else {
    setFrase("Vai dormir")
  }

  };

  return (
    <View style={styles.container}>

      <TextInput style={styles.input}
        onChangeText={texto => setTexto(texto)}
        value={texto}
        placeholder="Nome"
        placeholderTextColor="#999"/>
      
      <Text style={styles.titulo}>Hora de descansar!</Text>

      <Text style = {styles.subtitulo}>{frase}</Text>

      <Text style = {styles.nomeApp}>DiceAPP</Text>

      <Image
      source={{ uri: `https://githubusercontent.com{numeroDado}.png`}}
      style={styles.imgDado}
      />

    <TouchableOpacity style= {styles.botao} onPress={sortear_numDado}>
      <Text style={styles.textoBotao}>Sortear</Text>
    </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingHorizontal: 50,
    paddingTop:50,
    marginTop:100,
  },

  input: {
    height: 50,
    width: 150,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor:"#000",
    marginBottom: 40,
    marginLeft: 70,
  },

  titulo: {
    fontSize: 28,
    textAlign: "center",
    color: "#2c3e50",
  fontWeight: "bold",
  },

  subtitulo: {
    fontSize: 16,
    color: '#7f8c8d',
    marginVertical: 20,
    textAlign: "center",
  },

  nomeApp: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 15,
    marginVertical: 50,
  textAlign: "center",
  }, 

  imgDado: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 80,
  },

  botao: {
    backgroundColor: "#1b5e20",
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 70,
    marginRight: 70,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
  },

});
