import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LINHAS_ONIBUS } from '../../data/linhas';

export default function Dashboard() {
  // Processamento de dados dinâmicos
  const totalPassageiros = LINHAS_ONIBUS.reduce((acc, item) => acc + item.passageiros, 0);
  const maisPassageiros = [...LINHAS_ONIBUS].sort((a, b) => b.passageiros - a.passageiros)[0];
  const maisAtrasos = [...LINHAS_ONIBUS].sort((a, b) => b.percentualAtrasos - a.percentualAtrasos)[0];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Resumo da Operação</Text>

      <View style={styles.metricsGrid}>
        <View style={styles.kpiCard}>
          <Ionicons name="bus" size={26} color="#0066CC" />
          <Text style={styles.kpiNumber}>{LINHAS_ONIBUS.length}</Text>
          <Text style={styles.kpiLabel}>Linhas Monitoradas</Text>
        </View>

        <View style={styles.kpiCard}>
          <Ionicons name="people" size={26} color="#2E7D32" />
          <Text style={styles.kpiNumber}>{totalPassageiros.toLocaleString('pt-BR')}</Text>
          <Text style={styles.kpiLabel}>Passageiros/Dia</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Maior Movimentação</Text>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.badgeCode}>Linha {maisPassageiros.codigo}</Text>
          <Ionicons name="trending-up" size={22} color="#2E7D32" />
        </View>
        <Text style={styles.cardRoute}>{maisPassageiros.origem} ➔ {maisPassageiros.destino}</Text>
        <Text style={styles.cardDetail}>Total de Passageiros: <Text style={styles.boldText}>{maisPassageiros.passageiros.toLocaleString('pt-BR')}</Text></Text>
      </View>

      <Text style={styles.sectionTitle}>Atenção Operacional</Text>
      <View style={[styles.card, styles.alertCard]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.badgeCode, styles.alertBadge]}>Linha {maisAtrasos.codigo}</Text>
          <Ionicons name="alert-circle" size={22} color="#D32F2F" />
        </View>
        <Text style={styles.cardRoute}>{maisAtrasos.origem} ➔ {maisAtrasos.destino}</Text>
        <Text style={styles.cardDetail}>Índice de Atrasos: <Text style={styles.alertText}>{maisAtrasos.percentualAtrasos}%</Text></Text>
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

  headerTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#1A1A1A', 
    marginBottom: 16 
},

  metricsGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
},

  kpiCard: { 
    flex: 0.48, 
    backgroundColor: '#FFF',
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    elevation: 2 
},

  kpiNumber: { 
    fontSize: 20,
    fontWeight: 'bold', 
    color: '#1A1A1A', 
    marginTop: 8 
},

  kpiLabel: { 
    fontSize: 12, 
    color: '#666', 
    marginTop: 4 
},

  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 8, 
    marginTop: 10 
},

  card: { 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 16, 
    elevation: 2 
},

  alertCard: { 
    borderLeftWidth: 4, 
    borderLeftColor: '#D32F2F' 
},

  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
},

  badgeCode: { 
    backgroundColor: '#E3F2FD', 
    color: '#0066CC', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 6, 
    fontWeight: 'bold' 
},

  alertBadge: { 
    backgroundColor: '#FFEBEE', 
    color: '#D32F2F' 
},

  cardRoute: { 
    fontSize: 15, 
    fontWeight: '500', 
    color: '#333', 
    marginBottom: 6 
},

  cardDetail: { 
    fontSize: 13, 
    color: 
    '#666' 
},

  boldText: { 
    fontWeight: 'bold', 
    color: '#1A1A1A' 
},

  alertText: { 
    fontWeight: 'bold', 
    color: '#D32F2F' 
},

});