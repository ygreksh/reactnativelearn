import React, {useEffect, useState} from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import Groups from "./Groups";
import useStore from './store'
import VODGenre from "./VODGenre";
import VODItem from "./VODItem";




const VODScreen = ({navigation}) => {
    let baseUrl = 'http://online.polbox.tv/api/json/';

    const [isGenresLoaded, setIsGenresLoaded] = useState(false);
    const [isVODLoaded, setIsVODLoaded] = useState(false);

    const sid = useStore(state => state.sid);

    const [genres, setGenres] = useState({genres: []});
    const [vodList, setVODList] = useState({rows:[{id:"000", name: "empty", poster: ""}]});

    let genresUrl = baseUrl + "vod_genres?" + "MWARE_SSID=" + sid; 
      fetch(genresUrl, {method:'GET'})
          .then(response => response.json())
          .then(json => {
            if(!isGenresLoaded) {
              // console.log('Genres_list from API : ', json);
              setGenres(json);
              setIsGenresLoaded(true);
            }
              
            });

    let vodUrl = baseUrl + "vod_list?" + "MWARE_SSID=" + sid + "&nums=30"; 
            fetch(vodUrl, {method:'GET'})
                .then(response => response.json())
                .then(json => {
                  if (!isVODLoaded){
                    // console.log('VOD_list from API : ', json);
                    setVODList(json);
                    setIsVODLoaded(true);
                  }
                  });
      
    const renderGenreItem = ({item}) => <VODGenre name={item.name}/>
    const renderVODItem = ({item}) => <VODItem vodItem={item}/>

    // const TEST_DATA = [
    //     {id: "15", name: "Animowany"},
    //     {id: "10", name: "Biograficzny"},
    //     {id: "27", name: "Dokumentalny"},
    //     {id: "8", name: "Dramat" }
    // ];
    return (
        <View>
            <Text>
                Films
            </Text>
            {/* <FlatList
                data={genres.genres}
                renderItem={renderGenreItem}
                keyExtractor={(item) => item.id}
            /> */}
            <FlatList
                style={{backgroundColor: '#cccccc'}}
                data={vodList.rows}
                horizontal={true}
                renderItem={renderVODItem}
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