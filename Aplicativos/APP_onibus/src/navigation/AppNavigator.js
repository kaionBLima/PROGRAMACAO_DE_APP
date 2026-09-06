import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ListaLinhas from '../screens/ListaLinhas';
import DetalhesLinha from '../screens/DetalhesLinha';
import Analises from '../screens/Analises';
import Dashboard from '../screens/Dashboard';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LinhasStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListaLinhas" 
        component={ListaLinhas} 
        options={{ title: 'Linhas de Ônibus' }} 
      />
      <Stack.Screen 
        name="DetalhesLinha" 
        component={DetalhesLinha} 
        options={{ title: 'Detalhes da Linha' }} 
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#0066CC' },
        headerTintColor: '#FFF',
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'DashboardTab') iconName = 'analytics-outline';
          else if (route.name === 'LinhasTab') iconName = 'bus-outline';
          else if (route.name === 'AnalisesTab') iconName = 'pie-chart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="DashboardTab" 
        component={Dashboard} 
        options={{ title: 'Dashboard' }} 
      />
      <Tab.Screen 
        name="LinhasTab" 
        component={LinhasStackNavigator} 
        options={{ headerShown: false, title: 'Linhas' }} 
      />
      <Tab.Screen 
        name="AnalisesTab" 
        component={Analises} 
        options={{ title: 'Análises' }} 
      />
    </Tab.Navigator>
  );
}