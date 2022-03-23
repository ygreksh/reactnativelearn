import React, { useState} from "react";
import { Text, View, TextInput, Button,StyleSheet,Switch } from "react-native";
import useStore from "./store";


const Settings = () => {

    const sid = useStore(state => state.sid);
    const [isLoaded, setIsLoaded] = useState(false);

    const [isAskEnabled, setIsAskEnabled] = useState(false);
    const toggleAskSwitch = () => setIsAskEnabled(previousState => !previousState);
    const [isChannelsHide, setIsChannelHide] = useState(false);
    const toggleChannelsHideSwitch = () => setIsChannelHide(previousState => !previousState);
    
    let baseUrl = 'https://online.polbox.tv/api/json/';
    let url = baseUrl + "settings_set?"+ "var=pcode";
    let headers = new Headers();
    headers.append('Cookie', sid);

    // if(!isLoaded) {
    //     fetch(url, {method:'GET',
    //                 headers: headers,})
    //         .then(response => response.json())
    //         .then(json => {
    //                         console.log('PCode JSON: ', JSON.stringify(json));
    //                         setIsLoaded(true);
    //                     });
    //     }


    return (
      <View>
          <View>
            <Text> Parental control Screen </Text>
            <Text> =============== </Text>
            <Text> Old code </Text>
            <TextInput style={styles.input} />
            <Text> New code </Text>
            <TextInput style={styles.input} />
            <Text> Confirm new code </Text>
            <TextInput style={styles.input} />
            <Button
            style={styles.button}
            title="Submit" />
          </View>
          <View>
                <Text> Ask parental code: {isAskEnabled.toString()}</Text>
                <Switch 
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isAskEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleAskSwitch}
                    value={isAskEnabled}
                />
                <Text> Hide 18+ Channels: {isChannelsHide.toString()} </Text>
                <Switch 
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isChannelsHide ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleChannelsHideSwitch}
                    value={isChannelsHide}
                />
          </View>

      </View>
      
    )
}
const styles = StyleSheet.create({
    button: {
      padding: 10,
      elevation: 2,
      height: 40,
      width: 200,
    },
    input: {
      height: 40,
      width: 300,
      margin: 10,
      borderWidth: 1,
      padding: 5,
    }
  });
export default Settings;