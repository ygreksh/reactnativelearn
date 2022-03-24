import React, {useEffect, useState} from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import useStore from './sidStore'
import VODItem from "./VODItem";




const VODScreen = ({navigation}) => {
    let baseUrl = 'http://online.polbox.tv/api/json/';

    const [isGenresLoaded, setIsGenresLoaded] = useState(false);
    const [isVODLoaded, setIsVODLoaded] = useState(false);

    const sid = useStore(state => state.sid);

    const [genres, setGenres] = useState({genres: []});
    const [vodList, setVODList] = useState({rows:[{id:"0", name: "empty", poster: "", genre_str: ""}]});

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

    let vodUrl = baseUrl + "vod_list?" + "MWARE_SSID=" + sid + "&nums=100"; 
            fetch(vodUrl, {method:'GET'})
                .then(response => response.json())
                .then(json => {
                  if (!isVODLoaded){
                    // console.log('VOD_list from API : ', json);
                    setVODList(json);
                    setIsVODLoaded(true);
                  }
                  });
      
    const renderGenreItem = ({item}) => <View>
                                          <Text> {item.name}</Text>
                                          <FlatList 
                                            style={{backgroundColor: '#cccccc'}}
                                            data={vodList.rows.filter((r) => r.genre_str.toLowerCase().includes(item.name.toLowerCase()))}
                                            horizontal={true}
                                            renderItem={(i) => <VODItem vodItem={i.item}/>}
                                            keyExtractor={(i) => i.id}
                                          />
                                        </View>
    const renderVODItem = ({item}) => <VODItem vodItem={item}/>

    return (
        <View>
            <Text>
                All films
            </Text>
            <FlatList
                style={{backgroundColor: '#cccccc'}}
                data={vodList.rows}
                horizontal={true}
                renderItem={renderVODItem}
                keyExtractor={(item) => item.id}
            />
            <FlatList
                data={genres.genres}
                // data={TEST_DATA}
                renderItem={renderGenreItem}
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