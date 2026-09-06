import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetalhesLinha({ route }) {
  const { linha } = route.params || {};

  if (!linha) {
    return (
      <View style={styles.center}>
        <Text>Selecione uma linha na tela anterior.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.badgeCode}>Linha {linha.codigo}</Text>
        <Text style={styles.titleRoute}>{linha.origem}</Text>
        <Ionicons name="arrow-down" size={20} color="#FFF" style={{ marginVertical: 4 }} />
        <Text style={styles.titleRoute}>{linha.destino}</Text>
      </View>

      <Text style={styles.sectionTitle}>Métricas da Operação</Text>

      <View style={styles.detailCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Frota em Operação:</Text>
          <Text style={styles.value}>{linha.qtdOnibus} ônibus</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Passageiros Diários:</Text>
          <Text style={styles.value}>{linha.passageiros.toLocaleString('pt-BR')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tempo Médio de Percurso:</Text>
          <Text style={styles.value}>{linha.tempoMedioMinutos || linha.tempoMedio} min</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Taxa de Ocupação:</Text>
          <Text style={styles.value}>{linha.ocupacaoMediaPercentual || linha.mediaOcupacaoPercentual}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Índice de Atrasos:</Text>
          <Text style={[styles.value, linha.percentualAtrasos > 15 ? styles.redText : styles.greenText]}>
            {linha.percentualAtrasos}%
          </Text>
        </View>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={styles.label}>Arrecadação Estimada:</Text>
          <Text style={styles.value}>
            R$ {(linha.arrecadacao || linha.arredacao || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F6F9', 
    padding: 16 
},

  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
},

  headerCard: { 
    backgroundColor: '#0066CC', 
    padding: 20, borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 20 
},

  badgeCode: { 
    backgroundColor: '#FFF', 
    color: '#0066CC', 
    fontWeight: 'bold', 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 12, 
    marginBottom: 10 
},

  titleRoute: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#FFF' 
},

  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10 
},

  detailCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 16, 
    elevation: 2 
},

  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
},

  label: { 
    fontSize: 14, 
    color: '#666' 
},

  value: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1A1A1A' 
},

  redText: { 
    color: '#D32F2F' 
},

  greenText: { 
    color: '#2E7D32' 
},

});