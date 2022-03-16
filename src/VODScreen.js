import React, {useEffect, useState} from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import Groups from "./Groups";
import useStore from './store'
import VODGenre from "./VODGenre";




const VODScreen = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';

    const [isLoaded, setIsLoaded] = useState(false);

    const sid = useStore(state => state.sid);

    const [genres, setGenres] = useState();

    useEffect(() => {
      let url = baseUrl + "vod_genres?" + "MWARE_SSID=" + sid; 
      fetch(url, {method:'GET'})
          .then(response => response.json())
          .then(json => {
            if(!isLoaded) {
              console.log('Genres_list from API : ', json);
              setGenres(json);
              setIsLoaded(true);
              // console.log('channel_list from inner value groups: ', groups);
            }
              
            });
    });

    const renderItem = ({item}) => <VODGenre name={item.name}/>

    const TEST_DATA = [
        {id: "15", name: "Animowany"},
        {id: "10", name: "Biograficzny"},
        {id: "27", name: "Dokumentalny"},
        {id: "8", name: "Dramat" }
    ];
    return (
        <View>
            <Text>
                Genres
            </Text>
            <FlatList
                data={genres.genres}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
      padding: 10,
      elevation: 2,
      height: 40,
      width: 300,
    }
  });

export default VODScreen;