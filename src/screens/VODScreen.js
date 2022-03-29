import React, {useEffect, useState} from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useSidStore } from "../store";
import VODItem from "../components/VODItem";




const VODScreen = ({navigation}) => {
    let baseUrl = 'http://online.polbox.tv/api/json/';

    const [isGenresLoaded, setIsGenresLoaded] = useState(false);
    const [isVODLoaded, setIsVODLoaded] = useState(false);

    const sid = useSidStore(state => state.sid);

    const [genres, setGenres] = useState({genres: []});
    const [vodList, setVODList] = useState({rows:[{id:"0", name: "empty", poster: "", genre_str: ""}]});

    let genresUrl = baseUrl + "vod_genres?"; 
    let headers = new Headers();
        headers.append('Cookie', sid);
    fetch(genresUrl, {method:'GET'})
          .then(response => response.json())
          .then(json => {
            if(!isGenresLoaded) {
              // console.log('Genres_list from API : ', json);
              console.log("vod_genres loading");
              setGenres(json);
              setIsGenresLoaded(true);
            }
              
            })
          .catch((error)=>{
              console.log("vod_genres error", error.message);
           });

    let vodUrl = baseUrl + "vod_list?" + "&nums=100"; 
            fetch(vodUrl, {method:'GET'})
                .then(response => response.json())
                .then(json => {
                  if (!isVODLoaded){
                    console.log("vod_list loading");
                    // console.log('VOD_list from API : ', json);
                    setVODList(json);
                    setIsVODLoaded(true);
                  }
                  })
                .catch((error)=>{
                    console.log("channel_list error", error.message);
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