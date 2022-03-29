import React, {useEffect, useLayoutEffect, useState} from "react";
import { Alert, Button, Text, View, StyleSheet } from "react-native";
import Groups from "../components/Groups";
import { useSidStore, usePCodeStore, useHideStore, useTVStore } from "../store";


const TVGuide = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';

    const handleGetEPG = () => {
        Alert.alert("Get EPG");

        let url = baseUrl + "epg?"+ "cid=" + id;
        if (code !== undefined) {
          url +=  "&protect_code=" + code;
        }
  
        console.log(url);
        let headers = new Headers();
        headers.append('Cookie', sid);
        let response = await fetch(url, {method:'GET',
                        headers: headers,});
        if (response.ok) {
          let json = await response.json();
          let temp = json.url.replace("http/ts", "http");
          let matches = temp.split(' ');
          let videoUrl = matches[0];
          console.log("VideoUrl:", videoUrl);
          return videoUrl;
        } else {
          Alert.alert("Error HTT: " + response.status);
          return null
        }
    }
       
 
    return (
        <View style={styles.container}>
             <Text> TV Guide </Text>
             <Button 
                title="Get EPG"
                style={styles.button}
                onPress={handleGetEPG}
             />
        </View>
    )
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  button: {
    color: 'red',
    padding: 10,
    elevation: 2
  }
});
export default TVGuide;