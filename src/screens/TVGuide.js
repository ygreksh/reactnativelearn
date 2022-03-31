import React, {useEffect, useState} from "react";
import { Alert, Button, Image, Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
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
    const [channelId, setChannelId] = useState();
    const groups = useTVStore (state => state.groups);
    const setGroups = useTVStore (state => state.setGroups);
    // const [allChannels, setAllChannels] = useState();
    let channels = groups.map(group => group.channels.map(channel => channel.name));
    let allChannels = null;
    // allChannels = [].concat(...channels);
    // console.log("allChannels", channels);
    // console.log("allChannels", allChannels);
    useEffect(() => {
      // channels = groups.map(group => group.channels.map(channel => channel.name));
      allChannels = [].concat(...channels);
      // console.log("allChannels", channels);
      console.log("allChannels", allChannels);
    }, []);
    
    useEffect(() => {
      // let url = baseUrl + "epg?"+ "cid=" + channelId + "&day=" + dd + mm + yy;
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

    // const handleOnPressChannel = () => {
    //   console.log("Channel : " + channel.name);
    //   setChannelId(channelId);
    // }
    // const renderItem = ({item}) => <Channels channels={item}/>
    const renderGroupItem = ({item}) => <View style={{marginVertical: 5 }}>
                                      <Text style={{fontSize: 15, fontWeight: "bold"}}>
                                          {item.name}
                                      </Text>
                                      <FlatList
                                          style={{backgroundColor: '#cccccc'}}
                                          data={item.channels}
                                          horizontal={true}
                                          renderItem={renderChannelsItem}
                                          keyExtractor={(item) => item.id}
                                      />
                                  </View>
    // const renderItem = ({item}) => <Text> {item} </Text>
    const renderChannelsItem = ({item}) => <View>
                                            <View style={{padding: 5, alignItems: "center", alignContent: 'center'}}
                                                >
                                                    <TouchableOpacity onPress={()=> {
                                                                                      console.log();
                                                                                      setChannelId(item.id);
                                                                                    }}>
                                                        <Image
                                                            style={{width: 60, height: 60, resizeMode: 'contain'}}
                                                            source={{uri: 'http://online.polbox.tv/' + item.icon}}
                                                        />
                                                        <View style={{
                                                          // justifyContent: 'center',
                                                          alignItems: 'center'
                                                          }}
                                                        >
                                                          <Text >
                                                            {item.name}
                                                          </Text>    
                                                        </View>
                                                    </TouchableOpacity>
                                            </View>
                                            <View 
                                              style={styles.centeredView}
                                            >
                                          </View>
                                          </View>   
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
        flex: 1,
        justifyContent: 'center',
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
        <View
        style={{
          flex: 1,
          width: '100%',
          // alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: 10,
          elevation: 10,
          borderWidth: 1,
          borderColor: 'blue',
          backgroundColor: 'white'
        }}
        >
            <FlatList
                data={groups}
                // data={allChannels}
                // data={hide === 0 ? groups : filteredGroups}
                renderItem={renderGroupItem}
                // horizontal={true}
                keyExtractor={(item) => item.id}
            />
        </View>
      <View 
        style={{
          flex: 1,
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