import React from "react";

import { Button, Text, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Settings from "../Settings";
import Home from "../Home";
import StackNavigator from "./StackNavigator";
import { DrawerContent } from "./DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} >
      <Drawer.Screen name="Main" component={StackNavigator} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;