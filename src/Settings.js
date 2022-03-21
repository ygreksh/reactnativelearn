import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";


const Settings = () => {
 
    return (
      <View>
        <Text> Settings Screen </Text>
        <Text> =============== </Text>
        <Text> Buffering </Text>
        <Text> Stream server </Text>
        <Text> Bitrate </Text>
      </View>
      
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

export default Settings;