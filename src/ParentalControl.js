import React, { useState} from "react";
import { Text, View, TextInput, Button,StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import useStore from "./store";


const Settings = () => {

    const sid = useStore(state => state.sid);
    // const [isLoaded, setIsLoaded] = useState(false);
    const [inputOldCode, setInputOldCode] = useState(null);
    const [inputNewCode, setInputNewCode] = useState(null);
    const [inputConfirmCode, setInputConfirmCode] = useState(null);

    const [isAskEnabled, setIsAskEnabled] = useState(false);
    const toggleAskSwitch = () => setIsAskEnabled(!isAskEnabled);
    const [isChannelsHide, setIsChannelHide] = useState(false);
    const toggleChannelsHideSwitch = () => setIsChannelHide(!isChannelsHide);
    
    let baseUrl = 'https://online.polbox.tv/api/json/';
    

    const handleSubmit = () => {
        let url = baseUrl + "settings_set?"+ "var=pcode" + "&old_code=" + inputOldCode + "&new_code=" + inputNewCode + "&confirm_code=" + inputConfirmCode;
        let headers = new Headers();
        headers.append('Cookie', sid);

        fetch(url, {method:'GET',
                    headers: headers,})
            .then(response => response.json())
            .then(json => {
                console.log('Set PCode response JSON: ', JSON.stringify(json));
                if (json.error) {
                    alert("Error code: " + json.error.code + "\n" + json.error.message);
                } else if (json.message) {
                    alert(json.message.text);
                }
                // setIsLoaded(true);
                });
    }   


    return (
      <View>
          <View>
            <Text> Parental control Screen </Text>
            <Text> =============== </Text>
            <Text> Old code </Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setInputOldCode}
                value={inputOldCode}    
            />
            <Text> New code </Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setInputNewCode}
                value={inputNewCode}
            />
            <Text> Confirm new code </Text>
            <TextInput 
                style={styles.input} 
                onChangeText={setInputConfirmCode}
                value={inputConfirmCode}
            />
            <Button
                style={styles.button}
                title="Submit"
                onPress={() => handleSubmit()}
            />
          </View>
          <View>
                <Text> Ask parental code: {isAskEnabled.toString()}</Text>
                <Switch 
                    onValueChange={toggleAskSwitch}
                    value={isAskEnabled}
                />
                <Text> Hide 18+ Channels: {isChannelsHide.toString()} </Text>
                <Switch 
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