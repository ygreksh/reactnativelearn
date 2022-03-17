import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/Home";
import Login from "./src/Login";
import Player from "./src/Player";
import VODItemDetails from "./src/VODItemDetails";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} 
          options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#dd0000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Player" component={Player} />
        <Stack.Screen name="VODItemDetails" component={VODItemDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  ) 
}
