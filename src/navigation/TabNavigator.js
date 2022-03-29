import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TVGuide, TVScreen, VODScreen } from "../screens";
import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
 
    return (
      <Tab.Navigator>
        <Tab.Screen name="TV Channels" component={TVScreen} />
        <Tab.Screen name="TV Guide" component={TVGuide} />
        <Tab.Screen name="VOD" component={VODScreen} />
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

export default TabNavigator;