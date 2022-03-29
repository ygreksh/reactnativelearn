import React, {useEffect, useLayoutEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Groups from "../components/Groups";
import { useSidStore, usePCodeStore, useHideStore, useTVStore } from "../store";


const TVScreen = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';


    const sid = useSidStore(state => state.sid);
    const pcode = usePCodeStore(state => state.pcode);
    const hide = useHideStore(state => state.hide);
    const groups = useTVStore (state => state.groups);
    const setGroups = useTVStore (state => state.setGroups);

    useEffect(() => {
      let url = baseUrl + "channel_list?" + "MWARE_SSID=" + sid; 
      if (pcode) {
        url += "&protect_code=" + pcode;
      }
      console.log(url);
        fetch(url, {method:'GET'})
        .then(response => response.json())
        .then(json => {
            console.log('channel_list from API : ', json);
            if (hide === 0) {
              setGroups(json.groups);
            } else setGroups(json.groups.filter((f) => f.id !== "85"));
          });
    }, 
    [hide]
    );
  
    return (
        <View style={styles.container}>
          <Groups groups={groups}/>
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
export default TVScreen;