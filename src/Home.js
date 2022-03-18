import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TVScreen from "./TVScreen";
import VODScreen from "./VODScreen";
import 'react-native-gesture-handler';
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

const Home = () => {
 
    return (
      <Tab.Navigator>
        <Tab.Screen name="TV Channels" component={TVScreen} />
        <Tab.Screen name="VOD" component={VODScreen} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    button: {
      padding: 10,
      elevation: 2,
      height: 40,
      width: 300,
    }
  });

export default Home;