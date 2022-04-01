import React, {useEffect, useState} from 'react';
import { Image, Text, View, StyleSheet, FlatList, Button } from 'react-native'
import Video from 'react-native-video'
import { useSidStore } from '../store';

const Player = ({route}) => {
  let baseUrl = 'https://online.polbox.tv/api/json/';
    let now = new Date();
    // let dateForEPG = now;
    const [dateForEPG, setDateForEPG] = useState(now);
    // console.log(now);
    // console.log(now.toDateString());
    
    const {url, channel} = route.params;
    const sid = useSidStore(state => state.sid);
    const [currentEPG, setCurrentEPG] = useState();

    const addDay = () => {
      let newDate = new Date(dateForEPG);
      newDate.setDate(dateForEPG.getDate() + 1);
      // console.log("current epg date", dateForEPG.toDateString());
      // console.log("add newDate", newDate.toDateString());
      // dateForEPG = newDate;
      setDateForEPG(newDate);
    }
    const lessDay = () => {
      let newDate = new Date(dateForEPG);
      newDate.setDate(dateForEPG.getDate() - 1);
      // console.log("current epg date", dateForEPG.toDateString());
      // console.log("less newDate", newDate.toDateString());
      // dateForEPG = newDate;
      setDateForEPG(newDate);
    }

    const getEpgDate = (date) => {
      let yy = date.getFullYear() % 100;
      let mm = date.getMonth() + 1;
      if (mm < 10) mm = "0"+ mm;
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return String(dd) + String(mm) + String(yy);
    }

    useEffect(() => {
      let url = baseUrl + "epg?"+ "cid=" + channel.id + "&day=" + getEpgDate(dateForEPG);
        
      // console.log(url);
      let headers = new Headers();
      headers.append('Cookie', "MWARE_SSID=" + sid);
      fetch(url, {method:'GET',
                        headers: headers})
            .then(response => response.json())
            .then(json => {
                // console.log('Genres_list from API : ', json);
                // console.log("epg for "  + dateForEPG.toDateString() +  " loading");
                setCurrentEPG(json.epg);
                
              })
            .catch((error)=>{
                console.log("epg error", error.message);
            });
    },[dateForEPG]);

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
          style={{
            flex: 1, 
            justifyContent: 'center',
          }}
          >
          <View
            style={{
              flex: 1,
              // width: '100%',
              // alignContent: 'stretch',
              justifyContent: 'center',
              backgroundColor: 'black',
            }}
          >
            <Video
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              source={{uri: url}}
              controls={true}
              resizeMode={"contain"}
              />
          </View>
          <View 
            style={{
              flex: 2,
              justifyContent: 'center',
            }}
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
                onPress={lessDay}
              />
              <Text 
                style ={{fontWeight: 'bold', margin: 5, fontSize: 16, textAlign: 'center'}} 
              > 
                Day: {dateForEPG.toDateString()}
              </Text>
              <Button 
                title='>>'
                onPress={addDay}
              />
            </View>
            <FlatList
              data={currentEPG}
              renderItem={renderEPGItem}
              keyExtractor={(item) => item.ut_start}
            />
          </View>
        </View>
        
    )
};

export default Player;