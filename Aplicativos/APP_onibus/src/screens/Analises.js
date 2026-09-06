import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LINHAS_ONIBUS } from '../../data/linhas';

export default function Analises() {
  const totalArrecadacao = LINHAS_ONIBUS.reduce((acc, item) => acc + (item.arrecadacao || item.arredacao || 0), 0);
  const mediaOcupacao = Math.round(
    LINHAS_ONIBUS.reduce((acc, item) => acc + (item.ocupacaoMediaPercentual || item.mediaOcupacaoPercentual || 0), 0) / LINHAS_ONIBUS.length
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Indicadores de Desempenho</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="cash-outline" size={24} color="#2E7D32" />
          <Text style={styles.cardTitle}>Arrecadação Total Diária</Text>
        </View>
        <Text style={styles.mainValue}>
          R$ {totalArrecadacao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="speedometer-outline" size={24} color="#0066CC" />
          <Text style={styles.cardTitle}>Média de Ocupação do Sistema</Text>
        </View>
        <Text style={styles.mainValue}>{mediaOcupacao}%</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${mediaOcupacao}%` }]} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ranking por Arrecadação</Text>
      {[...LINHAS_ONIBUS]
        .sort((a, b) => (b.arrecadacao || b.arredacao) - (a.arrecadacao || a.arredacao))
        .map((linha, index) => (
          <View key={linha.id} style={styles.rankRow}>
            <Text style={styles.rankNumber}>#{index + 1}</Text>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text style={styles.rankCode}>Linha {linha.codigo}</Text>
              <Text style={styles.rankRoute}>{linha.origem}</Text>
            </View>
            <Text style={styles.rankValue}>
              R$ {(linha.arrecadacao || linha.arredacao).toLocaleString('pt-BR')}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F6F9', 
    padding: 16 },

  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1A1A1A', 
    marginBottom: 16 
},

  card: { 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 16, 
    elevation: 2 
},

  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8 
},

  cardTitle: { 
    fontSize: 14, 
    color: '#666', 
    marginLeft: 8, 
    fontWeight: '500' 
},

  mainValue: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1A1A1A' 
},

  progressBarBg: { 
    height: 8, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 4, 
    marginTop: 12 
},

  progressBarFill: { 
    height: '100%', 
    backgroundColor: '#0066CC', 
    borderRadius: 4 
},

  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 12, 
    marginTop: 8 
},

  rankRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF',
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 8 
},

  rankNumber: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#0066CC', 
    width: 28 
},

  rankCode: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#333' 
},

  rankRoute: { 
    fontSize: 12, 
    color: '#666' 
},

  rankValue: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#2E7D32' 
},

});