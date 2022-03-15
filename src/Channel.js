import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Channel = ({channel}) => {
    return(
        <View style={{padding: 5, alignItems: "center"}}>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: 'http://online.polbox.tv/' + channel.icon}}
            >
            </Image>
            <Text >
                {channel.name}
            </Text>
        </View>
    )
}

export default Channel;