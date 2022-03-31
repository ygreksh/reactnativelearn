import React, {useEffect, useState} from 'react';
import { Image, Text, View, StyleSheet, FlatList, Button } from 'react-native'
import Video from 'react-native-video'
import { useSidStore } from '../store';

const Player = ({route}) => {
  let baseUrl = 'https://online.polbox.tv/api/json/';
    let now = new Date();
    let yy = now.getFullYear() % 100;
    let mm = now.getMonth() + 1;
    if (mm < 10) mm = "0"+ mm;
    let dd = now.getDate();
    if (dd < 10) dd = "0" + dd;
    
    const {url, channel} = route.params;
    const sid = useSidStore(state => state.sid);
    const [currentEPG, setCurrentEPG] = useState();

    const getEpgDate = () => {

    }

    useEffect(() => {
      let url = baseUrl + "epg?"+ "cid=" + channel.id + "&day=" + dd + mm + yy;
        
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
    },[]);

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

    return(
        <View 
          style={styles.container}
          >
          <View
            style={styles.videocontainer}
          >
            <Video
              style={styles.backgroundVideo}
              source={{uri: url}}
              controls={true}
              resizeMode={"contain"}
              />
          </View>
          <View 
            style={styles.epgcontainer}
            >
            <View style={{flexDirection: 'row', justifyContent: 'center', padding: 10, alignItems: 'center', backgroundColor: '#a0a0a0',}}
            >
              <Image
                  style={{width: 40, height: 40, resizeMode: 'contain'}}
                  source={{uri: 'http://online.polbox.tv/' + channel.icon}}
              />
              <Text 
                style={{fontWeight: 'bold', fontSize: 18, margin: 5,}}
              >
                        {channel.name}
              </Text>    
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <Button 
                title='<<'
              />
              <Text 
                style ={{fontWeight: 'bold', margin: 5, fontSize: 16, textAlign: 'center'}} 
              > 
                Today: {dd} : {mm} : {yy}  
              </Text>
              <Button 
                title='>>'
              />
            </View>
            <FlatList
              data={currentEPG}
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
    flex: 1, 
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 5,
  },
  videocontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  epgcontainer: {
    flex: 2,
  },
  epgrow: {
    flexDirection: 'row',
    margin: 5,
    borderWidth: 1,
    borderColor: 'orange',
  },
});

export default Player;