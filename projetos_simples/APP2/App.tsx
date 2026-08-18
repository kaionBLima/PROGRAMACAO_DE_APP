import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [jogo, setJogo] = useState<'forca' | 'velha'>('forca');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {jogo === 'forca' ? 'JOGO DA FORCA' : 'JOGO DA VELHA'}
        </Text>

        <Pressable
          onPress={() =>
            setJogo(jogo === 'forca' ? 'velha' : 'forca')
          }
        >
          <Ionicons
            name="swap-horizontal"
            size={28}
            color="#ffffff"
          />
        </Pressable>
      </View>

      {/* JOGO DA FORCA */}
      {jogo === 'forca' && (
        <View style={styles.gameArea}>

          {/* Forca */}
          <View style={styles.hangman}>
            <View style={styles.base} />
            <View style={styles.pole} />
            <View style={styles.top} />
            <View style={styles.rope} />
          </View>

          {/* Palavra */}
          <Text style={styles.word}>
            _ _ _ _ _ _
          </Text>

          <Text style={styles.errors}>
            Erros: 0 / 6
          </Text>

        </View>
      )}

      {/* JOGO DA VELHA */}
      {jogo === 'velha' && (
        <View style={styles.gameArea}>

          <View style={styles.board}>

            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.x}>X</Text>
              </View>

              <View style={styles.cell}>
                <Text style={styles.o}>O</Text>
              </View>

              <View style={styles.cell} />
            </View>

            <View style={styles.row}>
              <View style={styles.cell} />

              <View style={styles.cell}>
                <Text style={styles.x}>X</Text>
              </View>

              <View style={styles.cell} />
            </View>

            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.o}>O</Text>
              </View>

              <View style={styles.cell} />

              <View style={styles.cell} />
            </View>

          </View>

          <Text style={styles.turn}>
            Sua vez
          </Text>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },

  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  gameArea: {
    flex: 1,
    alignItems: 'center',
  },

  /* FORCA */

  hangman: {
    width: 160,
    height: 200,
    position: 'relative',
    marginTop: 30,
  },

  base: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    width: 140,
    height: 8,
    backgroundColor: '#ffffff',
  },

  pole: {
    position: 'absolute',
    bottom: 8,
    left: 30,
    width: 8,
    height: 160,
    backgroundColor: '#ffffff',
  },

  top: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 100,
    height: 8,
    backgroundColor: '#ffffff',
  },

  rope: {
    position: 'absolute',
    top: 38,
    right: 30,
    width: 5,
    height: 35,
    backgroundColor: '#ffffff',
  },

  word: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 8,
    marginTop: 20,
  },

  errors: {
    color: '#ef4444',
    fontSize: 16,
    marginTop: 20,
  },

  /* VELHA */

  board: {
    width: 300,
    height: 300,
    marginTop: 50,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  },

  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  x: {
    color: '#3b82f6',
    fontSize: 55,
    fontWeight: 'bold',
  },

  o: {
    color: '#ef4444',
    fontSize: 55,
    fontWeight: 'bold',
  },

  turn: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 30,
  },
});