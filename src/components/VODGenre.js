import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
// import Channel from "./Channel";

const VODGenre = ({name}) => {
    
    return(
        <View style={{marginVertical: 5 }}>
            <Text style={{fontSize: 15, fontWeight: "bold"}}>
                Genre name: {name}
            </Text>
        </View>
    )
}

export default VODGenre;