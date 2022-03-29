import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import Video from 'react-native-video'

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      color: 'red',
      textAlign: 'center',
      margin: 10,
    },
  });

const Player = ({route}) => {
    const {url} = route.params;
    return(
        <View 
          style={styles.container}
          >
          <Video
            style={styles.backgroundVideo}
            source={{uri: url}}
            controls={true}
            resizeMode={"contain"}
            />
          <Text
            // style={styles.text}
          >
          Video: {url}</Text>
          <View 
            style={styles.content}
            >
            <Text 
              style ={styles.text} 
            > 
            EPG current day 
            </Text>
          </View>
        </View>
        
    )
}

export default Player;