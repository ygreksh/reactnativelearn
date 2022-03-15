import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Channels from "./Channels";

const Groups = ({groups}) => {
    const renderItem = ({item}) => <Channels channels={item.channels}/>

    return(
        <View>
            <Text>
                TV Channels
            </Text>
            <FlatList
                data={groups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <Text>End of groups</Text>
        </View>
    )
}

export default Groups;