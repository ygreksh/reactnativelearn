import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Channels from "./Channels";
// import useHideStore from "../store/hideChannelsStore";

const Groups = ({groups}) => {
    const renderItem = ({item}) => <Channels channels={item}/>
    // const renderItem = ({item}) => <Text> {item.name} </Text>
    // let filteredGroups = [];
    // filteredGroups = groups.filter((f) => !f.name.toLowerCase().includes("erot"));
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