import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.phone}>

        <View style={styles.dynamicIsland} />


        <Pressable
          style={[styles.quadrant, styles.person]}
          onPress={() => console.log('Person')}
        >
          <Ionicons
            name="person"
            size={11}
            color="#741414"
          />

          <Text style={styles.label}>
            person
          </Text>
        </Pressable>

        <Pressable
          style={[styles.quadrant, styles.map]}
          onPress={() => console.log('Map')}
        >
          <Ionicons
            name="map"
            size={11}
            color="#85600e"
          />

          <Text style={styles.label}>
            map
          </Text>
        </Pressable>

        <Pressable
          style={[styles.quadrant, styles.heart]}
          onPress={() => console.log('Heart')}
        >
          <Ionicons
            name="heart"
            size={11}
            color="#006b3c"
          />

          <Text style={styles.label}>
            heart
          </Text>
        </Pressable>

        <Pressable
          style={[styles.quadrant, styles.globe]}
          onPress={() => console.log('Globe')}
        >
          <Ionicons
            name="globe"
            size={11}
            color="#80630f"
          />

          <Text style={styles.label}>
            globe
          </Text>
        </Pressable>

      </View>

      <StatusBar style="dark" />

    </View>
  );
}


const styles = StyleSheet.create({


  container: {
    flex: 1,

    backgroundColor: '#eeeeee',

    alignItems: 'center',
    justifyContent: 'center',
  },


  phone: {
    width: '82%',

    aspectRatio: 0.51,

    backgroundColor: '#000000',

    borderRadius: 42,

    borderWidth: 5,
    borderColor: '#111111',

    overflow: 'hidden',

    position: 'relative',

    elevation: 8,

    shadowColor: '#000000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.35,

    shadowRadius: 6,
  },


  dynamicIsland: {
    position: 'absolute',

    zIndex: 10,

    top: 10,

    alignSelf: 'center',

    width: 52,

    height: 13,

    borderRadius: 20,

    backgroundColor: '#000000',
  },


  quadrant: {
    position: 'absolute',

    width: '50%',
    height: '50%',

    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 10,
  },


  person: {
    left: 0,
    top: 0,

    backgroundColor: '#ff3035',
  },


  map: {
    right: 0,
    top: 0,

    backgroundColor: '#ff8525',
  },


  heart: {
    left: 0,
    bottom: 0,

    backgroundColor: '#00bf5b',
  },


  globe: {
    right: 0,
    bottom: 0,

    backgroundColor: '#ffc336',
  },


  label: {
    marginTop: 2,

    fontSize: 6,

    color: '#555555',

    fontWeight: '500',
  },

});