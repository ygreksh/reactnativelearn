import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Channel = ({channel}) => {
    const navigation = useNavigation();

    const handleOnPress = () => {
        console.log("Channel : " + channel.name);
        navigation.navigate("Player", channel);
    }

    return(
        <View style={{padding: 5, alignItems: "center"}}
            >
                <TouchableOpacity onPress={handleOnPress}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'http://online.polbox.tv/' + channel.icon}}
                    />
                    <Text >
                        {channel.name}
                    </Text>    
                </TouchableOpacity>
            
        </View>
    )
}

export default Channel;