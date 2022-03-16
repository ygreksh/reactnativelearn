import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Groups from "./Groups";
import useStore from './store'




const TVScreen = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';

    const [isLoaded, setIsLoaded] = useState(false);

    const sid = useStore(state => state.sid);
    const resetSid = useStore(state => state.resetSid);

    const [groups, setGroups] = useState();

    useEffect(() => {
      let url = baseUrl + "channel_list?" + "MWARE_SSID=" + sid; 
      fetch(url, {method:'GET'})
          .then(response => response.json())
          .then(json => {
            if(!isLoaded) {
              console.log('channel_list from API : ', json);
              setGroups(json.groups);
              setIsLoaded(true);
            }
              
            });
    });

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
            <Text>
                Home Screen
            </Text>
            <Button 
                title="Logout" 
                style={styles.button}
                onPress={logoutFunc} />
            <Groups groups={groups}/>
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

export default TVScreen;