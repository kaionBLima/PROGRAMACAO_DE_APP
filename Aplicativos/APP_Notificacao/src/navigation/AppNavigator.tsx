import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import NovoLembreteScreen from '../screens/NovoLembreteScreen';

export type RootStackParamList = {
  Inicio: undefined;
  NovoLembrete: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ title: 'Meus lembretes' }}
      />

      <Stack.Screen
        name="NovoLembrete"
        component={NovoLembreteScreen}
        options={{ title: 'Novo lembrete' }}
      />
    </Stack.Navigator>
  );
}