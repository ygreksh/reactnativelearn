import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../Login";
import Player from "../Player";
import VODItemDetails from "../VODItemDetails";
import Settings from "../Settings";
import DrawerNavigator from "./DrawerNavigator";
import ParentalControl from "../ParentalControl";


const Stack = createNativeStackNavigator();



export default function StackNavigator() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={DrawerNavigator} 
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
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Parental Control" component={ParentalControl} />
      </Stack.Navigator>
  ) 
}
