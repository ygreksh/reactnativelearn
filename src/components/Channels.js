import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Channel from "./Channel";

const Channels = ({channels}) => {
    const renderItem = ({item}) => <Channel channel={item}/>
    
    return(
        <View style={{marginVertical: 5 }}>
            <Text style={{fontSize: 15, fontWeight: "bold"}}>
                {channels.name}
            </Text>
            <FlatList
                style={{backgroundColor: '#cccccc'}}
                data={channels.channels}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Channels;