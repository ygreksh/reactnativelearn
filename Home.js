import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import useStore from './store'




const Home = ({navigation}) => {
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
    
      const getAccount = () => {
        let url = baseUrl + "account";
        let headers = new Headers();
        if (sid) {
            console.log('sid now', sid);
            headers.append('Cookie', sid);
          fetch(url, {method:'GET',
                    headers: headers,})
          .then(response => response.json())
          .then(json => {
              console.log('GET ACCOUNT: ', json);
              alert(JSON.stringify(json));
              });
          }
    
      }

    return (
        <View>
            <Text>
                Home Screen
            </Text>
            <Button 
                title="Logout" 
                style={styles.button}
                onPress={logoutFunc} />
            <Button 
                title="Account" 
                style={styles.button}
                onPress={getAccount} />
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

export default Home;