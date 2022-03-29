import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { NativeRouter, Link } from 'react-router-native'
import Video from 'react-native-video'

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    }
  });

const Player = ({route}) => {
    const {url} = route.params;
    return(
        <View style={styles.container}>
          <Text>Video: {url}</Text>
            <Video
                style={styles.backgroundVideo}
                source={{uri: url}}
                controls={true}
                resizeMode="contain"
            />
          <Text> EPG current day </Text>
        </View>
        
    )
}

export default Player;