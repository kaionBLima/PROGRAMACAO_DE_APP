import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={[styles.quadrant, styles.person]}>
        <Ionicons name="person" size={20} color="#741414" />
        <Text style={styles.label}>person</Text>
      </View>

      <View style={[styles.quadrant, styles.map]}>
        <Ionicons name="map" size={20} color="#85600e" />
        <Text style={styles.label}>map</Text>
      </View>

      <View style={[styles.quadrant, styles.heart]}>
        <Ionicons name="heart" size={20} color="#006b3c" />
        <Text style={styles.label}>heart</Text>
      </View>

      <View style={[styles.quadrant, styles.globe]}>
        <Ionicons name="globe" size={20} color="#80630f" />
        <Text style={styles.label}>globe</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  quadrant: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  person: {
    top: 0,
    left: 0,
    backgroundColor: '#ff3035',
  },

  map: {
    top: 0,
    right: 0,
    backgroundColor: '#ff8525',
  },

  heart: {
    bottom: 0,
    left: 0,
    backgroundColor: '#00bf5b',
  },

  globe: {
    bottom: 0,
    right: 0,
    backgroundColor: '#ffc336',
  },

  label: {
    marginTop: 4,
    fontSize: 10,
    color: '#555',
  },
});