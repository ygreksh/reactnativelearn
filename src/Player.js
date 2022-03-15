import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { NativeRouter, Link } from 'react-router-native'
import Video from 'react-native-video'
import useStore from './store';

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

const Player = ({route}) => {
    // const video = {uri: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8'};
    const {id, name} = route.params;
    const video = {};
    let videoUrl = null;
    const sid = useStore(state => state.sid);
    let baseUrl = 'https://online.polbox.tv/api/json/';
    let url = baseUrl + "get_url?"+ "cid=" + id;
    let regexp = "^\S+\s";
        let headers = new Headers();
        if (sid) {
            headers.append('Cookie', sid);
          fetch(url, {method:'GET',
                    headers: headers,})
          .then(response => response.json())
          .then(json => {
              console.log('Channel JSON: ', JSON.stringify(json));
            //   videoUrl = json.url.replace("http/ts", "https").replace("^\S+","");
                let temp = json.url.replace("http/ts", "http");
                let matches = temp.split(' ');
                videoUrl = matches[0] + ".m3u8";
              console.log('Channel URL: ', videoUrl);
            //   video = {uri: json.url}
              });
          }

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Video
                style={styles.backgroundVideo}
                source={{uri: videoUrl}}
                controls
                resizeMode="contain"
            />
        </View>
        
    )
}

export default Player;