import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LINHAS_ONIBUS } from '../../data/linhas';

export default function ListaLinhas({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('DetalhesLinha', { linha: item })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Linha {item.codigo}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#0066CC" />
      </View>

      <Text style={styles.routeText}>{item.origem} ➔ {item.destino}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>
          <Ionicons name="people-outline" size={14} /> {item.passageiros.toLocaleString('pt-BR')} pas/dia
        </Text>
        <Text style={[styles.infoText, item.percentualAtrasos > 15 && styles.dangerText]}>
          <Ionicons name="time-outline" size={14} /> {item.percentualAtrasos}% atrasos
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={LINHAS_ONIBUS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F6F9' 
},

  listContainer: { 
    padding: 16 
},

  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    elevation: 2 
},

  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
},

  badge: { 
    backgroundColor: '#E3F2FD', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 6 
},

  badgeText: { 
    color: '#0066CC', 
    fontWeight: 'bold', 
    fontSize: 13 
},

  routeText: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10 
},

  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderTopWidth: 1, 
    borderTopColor: '#EEE', 
    paddingTop: 8 
},

  infoText: { 
    fontSize: 13, 
    color: '#666' 
},

  dangerText: { 
    color: '#D32F2F', 
    fontWeight: 'bold' 
},

});