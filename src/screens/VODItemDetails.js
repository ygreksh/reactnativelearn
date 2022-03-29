import React, {useState} from "react";
import { Text, View, Image, StyleSheet, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSidStore } from "../store";


const VODItemDetails = ({route}) => {
    const {vodInfo} = route.params;
    const navigation = useNavigation();
    const sid = useSidStore(state => state.sid);
    const [film, setFilm] = useState({});

    async function handleOnPress (video) {
        console.log("Playing film : " + "id=" + vodInfo.film.id + ", name=" + vodInfo.film.name + ", video: " + video.title);
        
        let baseUrl = 'https://online.polbox.tv/api/json/';
        let url = baseUrl + "vod_geturl?" + "&fileid=" + video.id + "&ad=1";
        console.log("VOD fetch url: " + url);
        let headers = new Headers();
        headers.append('Cookie', sid);
        let result = await fetch(url, {method:'GET',
                        headers: headers,})
              .then(response => response.json())
              .then(json => {
                    // console.log('VOD url: ', JSON.stringify(json));
                    console.log("vod_geturl loading");
                    let temp = json.url;
                    let matches = temp.split(' ');
                    let videoUrl = matches[0];
                    console.log('film url: ', videoUrl);
                    navigation.navigate("Player", {
                        url: videoUrl
                    });
                  });

    }
    const renderFilmImages = ({item}) => <View>
                                            <Image
                                                style={{width: 200, height: 200}}
                                                source={{uri: 'http://online.polbox.tv/' + item.url}}
                                            />
                                         </View>

    const renderFilmButtons = ({item}) => <View style={{padding: 10}}>
                                        <Button 
                                                title={item.title} 
                                                style={styles.button}
                                                onPress={() => handleOnPress(item)}
                                                />
                                        </View>

    return(
        <View style={{padding: 5, alignItems: "center"}}
            >
            <Image
                style={{width: 350, height: 350}}
                source={{uri: 'http://online.polbox.tv/' + vodInfo.film.poster}}
            />
            <Text >
                {vodInfo.film.name}
            </Text>    
            <Text >
                Director: {vodInfo.film.director}
            </Text>
            <Text >
                Actors: {vodInfo.film.actors}
            </Text>
            <Text >
                Lenght: {vodInfo.film.lenght}
            </Text>
            <FlatList
                style={{backgroundColor: '#cccccc'}}
                data={vodInfo.film.images}
                horizontal={true}
                renderItem={renderFilmImages}
                keyExtractor={(item) => item.id}/>
            <FlatList
                style={{backgroundColor: '#cccccc'}}
                data={vodInfo.film.videos}
                horizontal={true}
                renderItem={renderFilmButtons}
                keyExtractor={(item) => item.id}/>
            {/* <Button 
                title="PLAY" 
                style={styles.button}
                onPress={handleOnPress} /> */}
        </View>
    )
};
const styles = StyleSheet.create({
    button: {
      padding: 10,
      elevation: 2,
      height: 40,
      width: 200,
    },
    input: {
      height: 40,
      width: 300,
      margin: 10,
      borderWidth: 1,
      padding: 5,
    }
  });

export default VODItemDetails;