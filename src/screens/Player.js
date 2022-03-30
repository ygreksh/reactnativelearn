import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native'
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
    const {url} = route.params;
    const sid = useSidStore(state => state.sid);
    const [currentEPG, setCurrentEPG] = useState();

    useEffect(() => {
      let url = baseUrl + "epg?"+ "cid=" + 1534 + "&day=" + dd + mm + yy;
        
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
                                        style={styles.epgrow}
                                      >
                                        <Text 
                                          style ={styles.text} 
                                        > 
                                          {item.t_start} 
                                        </Text>
                                        <Text 
                                          style ={styles.text} 
                                        > 
                                          {item.progname} 
                                        </Text>
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
{/*           
          <Text
            style={styles.text}
          >
          Video: {url}</Text> */}
          <View 
            style={styles.epgcontainer}
            >
            <Text 
              style ={styles.text} 
            > 
             Today: {dd} : {mm} : {yy}  
            </Text>
            <FlatList
              // style={{backgroundColor: '#cccccc'}}
              data={currentEPG}
              // horizontal={true}
              renderItem={renderEPGItem}
              keyExtractor={(item) => item.id}
            />
            <View
              style={styles.epgrow}
            >
              <Text 
                style ={styles.text} 
              > 
                EPG time 
              </Text>
              <Text 
                style ={styles.text} 
              > 
                EPG program 
              </Text>
            </View>
            <View
              style={styles.epgrow}
            >
              <Text 
                style ={styles.text} 
              > 
                EPG time 
              </Text>
              <Text 
                style ={styles.text} 
              > 
                EPG program 2 
              </Text>
            </View>
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
    // alignItems: 'center', 
    justifyContent: 'center',
    // padding: 10,
    borderWidth: 1,
    borderColor: 'red'    
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderWidth: 1
  },
  content: {
    // flex: 1,
    justifyContent: 'center',
    borderWidth: 1
  },
  text: {
    fontSize: 16,
    // color: 'red',
    textAlign: 'center',
    // margin: 10,
    borderWidth: 1
  },
  videocontainer: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1
  },
  epgcontainer: {
    flex: 2,
    // justifyContent: 'center',
    borderWidth: 1
  },
  epgrow: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'orange',
  },
});

export default Player;