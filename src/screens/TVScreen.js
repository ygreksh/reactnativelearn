import React, {useEffect, useLayoutEffect, useState} from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Groups from "../components/Groups";
import { useSidStore, usePCodeStore, useHideStore, useTVStore } from "../store";


const TVScreen = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';


    const sid = useSidStore(state => state.sid);
    const pcode = usePCodeStore(state => state.pcode);
    const hide = useHideStore(state => state.hide);
    // const [groups, setGroups] = useState();
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
    // groups
    // hide
    [hide]
    );
       
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