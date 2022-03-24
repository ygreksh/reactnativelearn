import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TVScreen from "./TVScreen";
import VODScreen from "./VODScreen";
import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const Home = () => {
 
    return (
      <Tab.Navigator>
        <Tab.Screen name="TV Channels" component={TVScreen} />
        <Tab.Screen name="VOD" component={VODScreen} />
      </Tab.Navigator>
    )
}

export default Home;