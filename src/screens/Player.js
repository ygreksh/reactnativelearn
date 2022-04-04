import React, {useEffect, useState} from 'react';
import { Image, Text, View, StyleSheet, FlatList, Button } from 'react-native'
import Video from 'react-native-video'
import { useSidStore } from '../store';

const Player = ({route}) => {
    
    const {url} = route.params;
  
    return(
        <View 
          style={{
            flex: 1, 
            justifyContent: 'center',
          }}
          >
          <View
            style={{
              flex: 1,
              // width: '100%',
              // alignContent: 'stretch',
              justifyContent: 'center',
              backgroundColor: 'black',
            }}
          >
            <Video
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              source={{uri: url}}
              controls={true}
              resizeMode={"contain"}
              />
          </View>
        </View>
        
    )
};

export default Player;