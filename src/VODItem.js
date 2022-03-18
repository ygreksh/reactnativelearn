import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useStore from './store';


const VODItem = ({vodItem}) => {
    const navigation = useNavigation();
    const sid = useStore(state => state.sid);

    async function handleOnPress () {
        console.log("Details : " + vodItem.name);
        console.log("Details JSON : " + JSON.stringify(vodItem));

        let baseUrl = 'https://online.polbox.tv/api/json/';
        let url = baseUrl + "vod_info?" + "id=" + vodItem.id;
        let headers = new Headers();
        headers.append('Cookie', sid);
        let result = await fetch(url, {method:'GET',
                        headers: headers,})
              .then(response => response.json())
              .then(json => {
                    console.log('VOD info JSON: ', JSON.stringify(json));
                    navigation.navigate("VODItemDetails", {vodInfo: json});
                  });

    }

    return(
        <View style={{padding: 5, alignContent: "center", maxWidth: 120}}
            >
                <TouchableOpacity onPress={handleOnPress}>
                    <Image
                        style={{width: 80, height: 100}}
                        source={{uri: 'http://online.polbox.tv/' + vodItem.poster}}
                    />
                    <Text >
                        {vodItem.name}
                    </Text>    
                </TouchableOpacity>
            
        </View>
    )
}

export default VODItem;