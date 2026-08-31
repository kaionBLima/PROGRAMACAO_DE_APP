import React, { useContext } from "react";
import { View, Text } from "react-native";
import { UserProvider, UserContext } from "./src/contexts/UserContext";
import Login from "./src/screens/Login";

const MainNavigator = () => {
  const { userName } = useContext(UserContext);

  if (userName === '') {
    return <Login />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Olá, {userName}! Sua lista de compras ficará aqui.</Text>
    </View>
  );
};

export default function App() {
  return (
    <UserProvider>
      <MainNavigator />
    </UserProvider>
  );
}