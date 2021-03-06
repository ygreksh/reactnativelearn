import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { useSidStore } from "../store";


const Settings = () => {

  const sid = useSidStore(state => state.sid);
  const [isLoaded, setIsLoaded] = useState(false);
  const [httpCaching, sethttpCaching] = useState(0);
  const [streamServer, setStreamServer] = useState(0);
  const [bitRate, setBitRate] = useState(0);
  const [settings, setSettings] = useState({
                                                http_caching: {value: "0",
                                                          list: [0, 1]},
                                                bitrate: {value: "0",
                                                          list: ["0", "1"]},
                                                stream_server: {value: "0",
                                                          list: ["0", "1"]}
                                            });

// const {http_caching, stream_server, bitrate} = settings;

let baseUrl = 'https://online.polbox.tv/api/json/';
let url = baseUrl + "settings?"+ "var=all";
let headers = new Headers();
headers.append('Cookie', sid);
if(!isLoaded) {
  fetch(url, {method:'GET',
            headers: headers,})
      .then(response => response.json())
      .then(json => {
                    console.log('Settings JSON: ', JSON.stringify(json));
                    setSettings(json.settings);
                    setIsLoaded(true);
                    sethttpCaching(settings.http_caching.value);
                    setStreamServer(settings.stream_server.value);
                    setBitRate(settings.bitrate.value);
                  });
  }

const handelOnChangePicker = (param, value) => {
  let url = baseUrl + "settings_set?"+ "var=" + param + "&val=" + value;
  let headers = new Headers();
  console.log("Gnabge settings GET: ", url);
  headers.append('Cookie', sid);
    fetch(url, {method:'GET',
              headers: headers,})
        .then(response => response.json())
        .then(json => {
                      console.log('Settings_set JSON: ', JSON.stringify(json));
                    });
}
    return (
      <View>
        <Text> Settings Screen </Text>
        <Text> =============== </Text>
        <Text> Buffering {httpCaching} </Text>
        <Picker 
            mode="dropdown"
            selectedValue={httpCaching}
            onValueChange={(itemValue, itemIndex)=>{
                                                    console.log("Select PickerItem: ", itemValue);
                                                    sethttpCaching(itemValue);
                                                    handelOnChangePicker("http_caching", bitRate);
                                                    }}>
          {settings.http_caching.list.map((item, index) => {
          return (<Picker.Item label={item.toString()} value={item} key={index}/>)
          })}
          {/* <Picker.Item label="One" value="1" />
          <Picker.Item label="Two" value="2" /> */}
        </Picker>
        <Text> Stream server {streamServer} </Text>
        <Picker 
            mode="dropdown"
            selectedValue={streamServer}
            onValueChange={(itemValue, itemIndex)=>{
                                                    console.log("Select PickerItem: ", itemValue);
                                                    setStreamServer(itemValue);
                                                    handelOnChangePicker("stream_server", itemValue);
                                                    }}>
          {settings.stream_server.list.map((item, index) => {
          return (<Picker.Item label={item.ip} value={item.ip} key={index}/>)
          })}
        </Picker>
        <Text> Bitrate {bitRate} </Text>
        <Picker 
            mode="dropdown"
            selectedValue={bitRate}
            onValueChange={(itemValue, itemIndex)=>{
                                                    console.log("Select PickerItem: ", itemValue);
                                                    setBitRate(itemValue);
                                                    handelOnChangePicker("bitrate", itemValue);
                                                    }}>
          {settings.bitrate.list.map((item, index) => {
          return (<Picker.Item label={item.toString()} value={item} key={index}/>)
          })}
        </Picker>
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