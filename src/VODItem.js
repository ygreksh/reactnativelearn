import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useStore from './store';


const VODItem = ({vodInfo}) => {
    const navigation = useNavigation();
    const sid = useStore(state => state.sid);

    async function handleOnPress () {
        console.log("Details : " + vodInfo.name);

        // const video = {};
        // let videoUrl = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4";
        // let baseUrl = 'https://online.polbox.tv/api/json/';
        // let url = baseUrl + "get_url?"+ "cid=" + channel.id;
        // let headers = new Headers();
        // headers.append('Cookie', sid);
        // let result = await fetch(url, {method:'GET',
        //                 headers: headers,})
        //       .then(response => response.json())
        //       .then(json => {
        //             console.log('Channel JSON: ', JSON.stringify(json));
        //             let temp = json.url.replace("http/ts", "http");
        //             let matches = temp.split(' ');
        //             videoUrl = matches[0] + ".m3u8";
        //             console.log('Channel URL: ', videoUrl);
        //             navigation.navigate("Player", {
        //                 url: videoUrl
        //             });
        //           });
        navigation.navigate("VODItemDetails", {vodInfo: vodInfo})

    }

    return(
        <View style={{padding: 5, alignItems: "center"}}
            >
                <TouchableOpacity onPress={handleOnPress}>
                    <Image
                        style={{width: 60, height: 60}}
                        source={{uri: 'http://online.polbox.tv/' + vodInfo.poster}}
                    />
                    <Text >
                        {vodInfo.name}
                    </Text>    
                </TouchableOpacity>
            
        </View>
    )
}

export default VODItem;