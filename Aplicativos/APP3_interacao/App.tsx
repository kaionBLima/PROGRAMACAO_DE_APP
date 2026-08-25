import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
const [texto, setTexto] = useState('');
const [frase, setFrase] = useState('Madrugada Fria');
const [numeroDado, setnumeroDado] = useState (1);
const imgDado = [
    'dice-1',
    'dice-2',
    'dice-3',
    'dice-4',
    'dice-5',
    'dice-6',
] as const;

function sortear_numDado() { 
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

      <MaterialCommunityIcons
        style={styles.imgDado}
        name={imgDado[numeroDado-1]}
        size={150}
        color="#850a2b"
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
    marginVertical: 30,
  textAlign: "center",
  }, 

  imgDado: {
    textAlign: "center",
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
