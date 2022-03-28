import React, {useEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Groups from "../components/Groups";
import useSidStore from '../store/sidStore';
import usePCodeStore from "../store/pcodeStore";
import useHideStore from "../store/hideChannelsStore";



const TVScreen = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';

    const [isLoaded, setIsLoaded] = useState(false);

    const sid = useSidStore(state => state.sid);
    const pcode = usePCodeStore(state => state.pcode);
    const hide = useHideStore(state => state.hide);
    const [groups, setGroups] = useState();

    useEffect(() => {
      let url = baseUrl + "channel_list?" + "MWARE_SSID=" + sid + "&show=" + hide; 
      if (pcode) {
        url += "&protect_code=" + pcode;
      }
      console.log(url);
      if(!isLoaded) {
        fetch(url, {method:'GET'})
        .then(response => response.json())
        .then(json => {
            // console.log('channel_list from API : ', json);
            setGroups(json.groups);
            setIsLoaded(true);
          });
      }
    });
       
  //  const handleGetList = async () => {
  //   let url = baseUrl + "rule?"+ "cmd=reset_channels" + "&protect_code=" + "785206";
    
  //   console.log(url);
  //   let headers = new Headers();
  //   headers.append('Cookie', sid);
  //   let response = await fetch(url, {method:'GET',
  //                   headers: headers,});
  //   if (response.ok) {
  //     let json = await response.json();
  //     console.log("RULE: get_list:", JSON.stringify(json));
  //   } else {
  //     alert("Error HTT: " + response.status);
  //   }
  //  }

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
        <View style={styles.container}>
          {/* <Button 
            title="RULE: get_list" 
            style={styles.button}
            onPress={handleGetList}
          /> */}
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