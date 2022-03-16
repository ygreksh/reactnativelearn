import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Groups from "./Groups";
import useStore from './store';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TVScreen from "./TVScreen";
import VODScreen from "./VODScreen";
const Tab = createBottomTabNavigator();


const Home = ({navigation}) => {
 
    return (
      <Tab.Navigator>
        <Tab.Screen name="TV Channels" component={TVScreen} />
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

export default Home;