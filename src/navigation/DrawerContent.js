import React from "react";
import useStore from "../store";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, StyleSheet } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';


  

export function DrawerContent() {
    const navigation = useNavigation();
    let baseUrl = 'https://online.polbox.tv/api/json/';
    
    const sid = useStore(state => state.sid);
    const resetSid = useStore(state => state.resetSid);

    const logoutFunc = () => {
        if(sid) {
          let url = baseUrl + "logout?" + "MWARE_SSID=" + sid;
          fetch(url, {method:'GET'})
          .then(response => response.json())
          .then(json => {
              console.log('LOGOUT : ', json);
              resetSid();
                navigation.navigate('Login');
            });
        }
      }


    return (
        <DrawerContentScrollView >
            <DrawerItem
                label="Settings"
                onPress={() => navigation.navigate("Settings")}
            />
            <DrawerItem
                label="Parental Control"
                onPress={() => navigation.navigate("Parental Control")}
            />
            <DrawerItem
                label="Logout"
                onPress={() => logoutFunc()}
            />
            
        </DrawerContentScrollView>
    );
  }