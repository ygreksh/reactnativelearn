import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Channel from "./Channel";

const Channels = ({channels}) => {
    const renderItem = ({item}) => <Channel channel={item}/>

    return(
        <View>
            <Text>
                {channels.name}
            </Text>
            <FlatList
                data={channels}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Channels;