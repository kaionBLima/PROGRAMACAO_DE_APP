import React, { useContext } from "react";
import { UserProvider, UserContext } from "./src/contexts/UserContext";
import Login from "./src/screens/Login";
import ListaCompras from "./src/screens/ListaCompras";

const MainNavigator = () => {
  const { userName } = useContext(UserContext);

  if (userName === '') {
    return <Login />;
  }

  return <ListaCompras />;
};

export default function App() {
  return (
    <UserProvider>
      <MainNavigator />
    </UserProvider>
  );
}
