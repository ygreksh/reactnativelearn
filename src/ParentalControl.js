import React, { useState} from "react";
import { Text, View } from "react-native";
import useStore from "./store";


const Settings = () => {

    const sid = useStore(state => state.sid);
    const [isLoaded, setIsLoaded] = useState(false);

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
        <Text> Parental control Screen </Text>
        <Text> =============== </Text>
      </View>
      
    )
}

export default Settings;