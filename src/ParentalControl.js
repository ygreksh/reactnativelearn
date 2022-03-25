import React, { useState} from "react";
import { Text, View, TextInput, Button,StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import useStore from "./sidStore";
import useAskPCodeStore from "./askPCodeStore";
import useHideStore from "./hideChannelsStore";


const Settings = () => {

    const sid = useStore(state => state.sid);
    // const [isLoaded, setIsLoaded] = useState(false);
    const [inputOldCode, setInputOldCode] = useState(null);
    const [inputNewCode, setInputNewCode] = useState(null);
    const [inputConfirmCode, setInputConfirmCode] = useState(null);
    const askPCode = useAskPCodeStore(state => state.askPCode);
    const setAskPCode = useAskPCodeStore(state => state.setAskPCode);
    const hide = useHideStore(state => state.hide);
    const setHideOn = useHideStore(state => state.setHideOn);
    const setHideOff = useHideStore(state => state.setHideOff);

    // const [isAskEnabled, setIsAskEnabled] = useState(false);
    const toggleAskSwitch = () => {
                    setAskPCode(!askPCode);
                    console.log("isAskEnabled =", askPCode.toString());
                }
    // const [isChannelsHide, setIsChannelHide] = useState(false);
    const toggleChannelsHideSwitch = () => {
                    if (hide) {setHideOff();}
                    else {setHideOn();}
                    // setIsChannelHide(!isChannelsHide);
                    console.log("isChannelsHide =", hide===0 ? "false" : "true");
                }
    
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
          <View style={styles.container}>
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
          <View style={styles.container}>
                <Text> Ask parental code: {askPCode.toString()}</Text>
                <Switch 
                    onValueChange={toggleAskSwitch}
                    value={askPCode}
                />
                <Text> Hide Channels: {hide===0 ? "false" : "true"} </Text>
                <Switch 
                    onValueChange={toggleChannelsHideSwitch}
                    value={hide===0 ? false : true}
                />
          </View>

      </View>
      
    )
}
const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      elevation: 10,
      backgroundColor: '#e6e6e6'
    },
    input: {
      height: 40,
      width: '80%',
      margin: 10,
      fontSize: 18,
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 0,
    },
    button: {
      width: '80%'
    },
  });
export default Settings;