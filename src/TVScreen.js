import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Groups from "./Groups";
import useStore from './sidStore';
import usePCodeStore from "./pcodeStore";




const TVScreen = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';

    const [isLoaded, setIsLoaded] = useState(false);

    const sid = useStore(state => state.sid);
    const pcode = usePCodeStore(state => state.pcode);

    const [groups, setGroups] = useState();

    
      let url = baseUrl + "channel_list?" + "MWARE_SSID=" + sid + "&protect_code=" + pcode + "&hide=1"; 
      console.log(url);
      fetch(url, {method:'GET'})
          .then(response => response.json())
          .then(json => {
            if(!isLoaded) {
              // console.log('channel_list from API : ', json);
              setGroups(json.groups);
              setIsLoaded(true);
            }
              
            });
   

      // const getAccount = () => {
      //   let url = baseUrl + "account";
      //   let headers = new Headers();
      //   if (sid) {
      //       console.log('sid now', sid);
      //       headers.append('Cookie', sid);
      //     fetch(url, {method:'GET',
      //               headers: headers,})
      //     .then(response => response.json())
      //     .then(json => {
      //         console.log('GET ACCOUNT: ', json);
      //         alert(JSON.stringify(json));
      //         });
      //     }
    
      // }

    return (
        <View>
            <Groups groups={groups}/>
        </View>
    )
}
export default TVScreen;