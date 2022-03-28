import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Channels from "./Channels";

const Groups = ({groups}) => {
    const renderItem = ({item}) => <Channels channels={item}/>
    return(
        <View>
            <FlatList
                data={groups}
                // data={hide === 0 ? groups : filteredGroups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Groups;