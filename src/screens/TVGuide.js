import React, {useEffect, useLayoutEffect, useState} from "react";
import { Alert, Button, Image, Text, View, StyleSheet, FlatList } from "react-native";
import Channels from "../components/Channels";
import Groups from "../components/Groups";
import { useSidStore, usePCodeStore, useHideStore, useTVStore } from "../store";


const TVGuide = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';

    let now = new Date();
    let yy = now.getFullYear() % 100;
    let mm = now.getMonth() + 1;
    if (mm < 10) mm = "0"+ mm;
    let dd = now.getDate();
    if (dd < 10) dd = "0" + dd;

    const sid = useSidStore(state => state.sid);
    const [currentEPG, setCurrentEPG] = useState();
    const [channelId, setCheannelId] = useState();
    const groups = useTVStore (state => state.groups);
    const setGroups = useTVStore (state => state.setGroups);

    // useEffect(() => {
    //   let url = baseUrl + "channel_list?"; 
      
    //   console.log(url);
    //   let headers = new Headers();
    //   headers.append('Cookie', "MWARE_SSID=" + sid);
    //     fetch(url, {method:'GET',
    //                 headers: headers})
    //     .then(response => response.json())
    //     .then(json => {
    //       // console.log('channel_list from API : ', json);
    //       console.log('channel_list loading');
    //           setGroups(json.groups);
    //       })
    //     .catch((error)=>{
    //         console.log("vod_genres error", error.message);
    //     });
    // }, 
    // []
    // );
    
    useEffect(() => {
      let url = baseUrl + "epg?"+ "cid=" + channelId + "&day=" + dd + mm + yy;
        
      console.log(url);
      let headers = new Headers();
      headers.append('Cookie', "MWARE_SSID=" + sid);
      fetch(url, {method:'GET',
                        headers: headers})
            .then(response => response.json())
            .then(json => {
                // console.log('Genres_list from API : ', json);
                console.log("epg loading");
                setCurrentEPG(json.epg);
                
              })
            .catch((error)=>{
                console.log("epg error", error.message);
            });
     
    },[channelId]);

    const renderItem = ({item}) => <Channels channels={item}/>
       
    const renderEPGItem = ({item}) => <View
                                        style={{
                                          flex: 1,
                                          flexDirection: 'row',
                                          margin: 5,
                                          borderWidth: 1,
                                          borderColor: '#b0b0b0',
                                        }}
                                      >
                                        <Text 
                                          style ={{fontSize: 16,
                                            // color: 'red',
                                            textAlign: 'center',
                                            margin: 5,
                                            fontWeight: 'bold',
                                          }} 
                                        > 
                                          {item.t_start} 
                                        </Text>
                                        <View
                                          style={{
                                            flex: 1,
                                          }}
                                        >
                                          <Text 
                                            style ={{fontSize: 16,
                                              margin: 5,
                                            }}  
                                          > 
                                            {item.progname} 
                                          </Text>
                                        </View>
                                        
                                      </View>
    return (
      <View 
      style={{
        width: '100%',
        // alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: '#e6e6e6'
      }}
      >
        <View>
            <FlatList
                data={groups}
                // data={hide === 0 ? groups : filteredGroups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
      <View 
        style={{
          // flex: 1,
          // padding: 10,
          // margin: 10,
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'orange',
          // backgroundColor: 'white',
        }}
        >
        <Text 
          style ={{fontWeight: 'bold', margin: 5, fontSize: 16, textAlign: 'center'}} 
        > 
         Today: {dd} : {mm} : {yy}  
        </Text>
        <FlatList
          style={{backgroundColor: 'white'}}
          data={currentEPG}
          // horizontal={true}
          renderItem={renderEPGItem}
          keyExtractor={(item) => item.ut_start}
        />
        <Text 
          style ={styles.text} 
        > 
        EPG controls
        </Text>
      </View>
    </View>
    )
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    color: 'red',
    padding: 10,
    elevation: 2
  }
});
export default TVGuide;