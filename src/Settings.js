import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';
import useStore from "./store";


const Settings = () => {

  const sid = useStore(state => state.sid);
  const [isLoaded, setIsLoaded] = useState(false);
  const [settings, setSettings] = useState({
                                                http_caching: {value: "0",
                                                          list: [0, 1]},
                                                bitrate: {value: "0",
                                                          list: ["0", "1"]},
                                                stream_server: {value: "0",
                                                          list: ["0", "1"]}
                                            });

const {http_caching, stream_server, bitrate} = settings;

let baseUrl = 'https://online.polbox.tv/api/json/';
let url = baseUrl + "settings?"+ "var=all";
let headers = new Headers();
headers.append('Cookie', sid);
if(!isLoaded) {fetch(url, {method:'GET',
            headers: headers,})
      .then(response => response.json())
      .then(json => {
                    console.log('Settings JSON: ', JSON.stringify(json));
                    setSettings(json.settings);
                    setIsLoaded(true);
                    console.log("http_list: ", settings.http_caching.list)
                  });
}
    return (
      <View>
        <Text> Settings Screen </Text>
        <Text> =============== </Text>
        <Text> Buffering {settings.http_caching.value} </Text>
        <Picker 
            mode="dropdown"
            selectedValue={settings.http_caching.value}
            onValueChange={(itemValue, itemIndex)=>{console.log("Select PickerItem: ", itemValue)}}>
          {settings.http_caching.list.map((item, index) => {
          return (<Picker.Item label={item.toString()} value={item} key={index}/>)
          })}
          {/* <Picker.Item label="One" value="1" />
          <Picker.Item label="Two" value="2" /> */}
        </Picker>
        <Text> Stream server {settings.stream_server.value} </Text>
        <Text> Bitrate {settings.bitrate.value} </Text>
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