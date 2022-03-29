import React, {useEffect, useLayoutEffect, useState} from "react";
import { Alert, Button, Text, View, StyleSheet, FlatList } from "react-native";
import Groups from "../components/Groups";
import { useSidStore, usePCodeStore, useHideStore, useTVStore } from "../store";


const TVGuide = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';
    let now = new Date();
    const sid = useSidStore(state => state.sid);
    const [currentEPG, setCurrentEPG] = useState();
    
    const handleGetEPG = async () => {
        // Alert.alert("Get EPG");

        let url = baseUrl + "epg?"+ "cid=" + 1534 + "&day=290322";
        
        console.log(url);
        let headers = new Headers();
        headers.append('Cookie', sid);
        let response = await fetch(url, {method:'GET',
                        headers: headers,});
        if (response.ok) {
          let json = await response.json();
          setCurrentEPG(json.epg);
          console.log("CurrentEPG :", currentEPG);
        } else {
          Alert.alert("Error HTT: " + response.status);
        }
    }
       
    const renderEPGItem = ({item}) => <Text> {item.ut_start} : {item.progname} </Text>
    return (
        <View style={styles.container}>
             <Text> TV Guide </Text>
             <Button 
                title="Get EPG"
                style={styles.button}
                onPress={handleGetEPG}
             />
             <Text> Today: {now.toString()} </Text>
             <FlatList 
              data={currentEPG}
              renderItem={renderEPGItem}
              keyExtractor={(item) => item.ut_start}
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