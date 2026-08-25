import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Switch } from 'react-native';

export default function App() {
  const [valorEmprestimo, setValorEmprestimo] = useState('');
  const [intimidade, setIntimidade] = useState('Melhor amigo');
  const [arredondar, setArredondar] = useState(false);
  const [valorFinal, setValorFinal] = useState(0);


  function calcularJuros() {
    const valorDigitado = parseFloat(valorEmprestimo.replace(',', '.'));

    if (isNaN(valorDigitado)) {
      setValorFinal(0);
      return;
    }

    let taxa = 0;
    
    if (intimidade === "Amigo") {
      taxa = 0.05;
    } else if (intimidade === "Colega") {
      taxa = 0.10;
    } else if (intimidade === "Desconhecido") {
      taxa = 0.25;
    } else {
      taxa = 0; 
    }

    let resultado = valorDigitado + (valorDigitado * taxa);

    if (arredondar) {
      resultado = Math.ceil(resultado);
    }

    setValorFinal(resultado);
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>Calculadora de juros</Text>

      <TextInput 
        style={styles.valEmprest}
        keyboardType="numeric"
        onChangeText={texto => setValorEmprestimo(texto)}
        value={valorEmprestimo}
        placeholder='Dinheiro emprestado'
        placeholderTextColor="#999"
      />

      <Text style={styles.labelLaranja}>Quanto a pessoa é sua amiga?</Text>

      <TouchableOpacity onPress={() => setIntimidade('Melhor amigo')} style={styles.opcao}>
        <Text style={styles.textoOpcao}>
          {intimidade === 'Melhor amigo' ? '🔘' : '⚪'} Melhor amigo (Sem juros)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIntimidade('Amigo')} style={styles.opcao}>
        <Text style={styles.textoOpcao}>
          {intimidade === 'Amigo' ? '🔘' : '⚪'} Amigo (5%)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIntimidade('Colega')} style={styles.opcao}>
        <Text style={styles.textoOpcao}>
          {intimidade === 'Colega' ? '🔘' : '⚪'} Colega (10%)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIntimidade('Desconhecido')} style={styles.opcao}>
        <Text style={styles.textoOpcao}>
          {intimidade === 'Desconhecido' ? '🔘' : '⚪'} Desconhecido (25%)
        </Text>
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text style={styles.textoOpcao}>Arredondar?</Text>
        <Switch 
          value={arredondar} 
          onValueChange={(valor) => setArredondar(valor)} 
        />
      </View>

      <Text style={styles.labelResultado}>A pessoa deve te pagar:</Text>

      <Text style={styles.resultado}>
        R$ {valorFinal.toFixed(2).replace('.', ',')}
      </Text>

      <TouchableOpacity style={styles.botao} onPress={calcularJuros}>
        <Text style={styles.textoBotao}>Calcular</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 30,
  },
  valEmprest: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 30,
    fontSize: 16,
  },
  labelLaranja: {
    fontSize: 14,
    color: '#e67e22',
    fontWeight: '600',
    marginBottom: 15,
  },
  opcao: {
    marginBottom: 15,
  },
  textoOpcao: {
    fontSize: 14,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  labelResultado: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  resultado: {
    fontSize: 34,
    color: '#4CAF50', // Verde
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  botao: {
    backgroundColor: '#5e35b1', // Roxo
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});