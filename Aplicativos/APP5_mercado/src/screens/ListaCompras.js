import React, { useState, useContext, useCallback, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';

export default function ListaCompras() {
  const { userName } = useContext(UserContext);

  const [listaDeItens, setListaDeItens] = useState([]);
  const [textoNovoItem, setTextoNovoItem] = useState('');
  const [textoBusca, setTextoBusca] = useState('');

  const adicionarItem = useCallback(() => {
    if (textoNovoItem === '') {
      return; 
    }
    
    const novoProduto = {
      id: Date.now().toString(),
      nome: textoNovoItem,
      comprado: false,
    };
    
    setListaDeItens(listaAntiga => [...listaAntiga, novoProduto]);
    setTextoNovoItem('');
  }, [textoNovoItem]);

  const marcarComoComprado = useCallback((idDoItem) => {
    setListaDeItens(listaAntiga => 
      listaAntiga.map(item => {
        if (item.id === idDoItem) {
          return { ...item, comprado: !item.comprado };
        }
        return item;
      })
    );
  }, []);

  const itensFiltrados = useMemo(() => {
    const apenasNaoComprados = listaDeItens.filter(item => item.comprado === false);
    return apenasNaoComprados.length;
  }, [listaDeItens]);

  const mostrarItemNaTela = ({ item }) => (
    <TouchableOpacity
    style={[styles.item, item.comprado && styles.itemComprado]}
    onPress={() => marcarComoComprado(item.id)}
    >
        <Text style={styles.comprado && styles.textoComprado}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Olá, {userName}!</Text>
      <Text style={styles.pendentes}>Faltam comprar: {quantidadePendentes}</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar produto..."
        value={textoBusca}
        onChangeText={setTextoBusca}
      />

      <View style={styles.linhaAdicionar}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Nome do novo produto..."
          value={textoNovoItem}
          onChangeText={setTextoNovoItem}
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarItem}>
          <Text style={styles.textoBotaoAdd}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={itensFiltrados}
        keyExtractor={item => item.id}
        renderItem={mostrarItemNaTela}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    marginTop: 30 
},

  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold' 
},

  pendentes: { 
    color: 'red', 
    marginBottom: 15, 
    fontSize: 16 
},

  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    borderRadius: 5,
    marginBottom: 15 
},

  linhaAdicionar: { 
    flexDirection: 'row',
     marginBottom: 20 
},

  botaoAdd: { 
    backgroundColor: 'green',
    padding: 15,
    marginLeft: 10,
    borderRadius: 5,
    justifyContent: 'center' 
},

  textoBotaoAdd: { 
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18 
},

  item: { 
    padding: 15, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    marginBottom: 10, 
    borderRadius: 5, 
    backgroundColor: 'white' 
},

  itemComprado: { 
    backgroundColor: '#d4edda' 
},

  textoComprado: { 
    textDecorationLine: 'line-through', 
    color: 'gray' 
}
}); 