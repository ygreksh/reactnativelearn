import React, {useEffect, useState} from 'react';
import { Image, Text, View, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native'
import Video from 'react-native-video'
import { useSidStore } from '../store';

const ChannelPlayer = ({route, navigation}) => {
  let baseUrl = 'https://online.polbox.tv/api/json/';
    let now = new Date();
    let daysEPG = [];
    for (let i= -4; i <= 4; i++) {
      let newDate = new Date(now);
      newDate.setDate(now.getDate() + i);
      daysEPG.push(newDate);
    }
    const [dateForEPG, setDateForEPG] = useState(now);
    // console.log(now);
    // console.log(now.toDateString());
    
    const {url, channel} = route.params;
    const sid = useSidStore(state => state.sid);
    const [currentEPG, setCurrentEPG] = useState();

    async function getUrl(id, code) {
        let url = baseUrl + "get_url?"+ "cid=" + id;
        if (code !== undefined) {
          url +=  "&protect_code=" + code;
        }
        console.log(url);
        let headers = new Headers();
        headers.append('Cookie', sid);
        let response = await fetch(url, {method:'GET',
                        headers: headers,});
        if (response.ok) {
          let json = await response.json();
          let temp = json.url.replace("http/ts", "http");
          let matches = temp.split(' ');
          let videoUrl = matches[0];
          console.log("VideoUrl:", videoUrl);
          return videoUrl;
        } else {
          Alert.alert("Error HTT: " + response.status);
          return null
        }
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

    // const renderEPGItem = ({item}) => <View
    //                                     style={{
    //                                       flex: 1,
    //                                       flexDirection: 'row',
    //                                       margin: 5,
    //                                       borderWidth: 1,
    //                                       borderColor: '#b0b0b0',
    //                                     }}
    //                                   >
    //                                     <Text 
    //                                       style ={{fontSize: 16,
    //                                         textAlign: 'center',
    //                                         margin: 5,
    //                                         fontWeight: 'bold',
    //                                       }} 
    //                                     > 
    //                                       {item.t_start} 
    //                                     </Text>
    //                                     <View
    //                                       style={{
    //                                         flex: 1,
    //                                       }}
    //                                     >
    //                                       <Text 
    //                                         style ={{fontSize: 16,
    //                                           margin: 5,
    //                                         }}  
    //                                       > 
    //                                         {item.progname} 
    //                                       </Text>
    //                                     </View>
                                        
    //                                   </View>
    const renderDaysEPGItem = ({item}) => <View
                                                style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                padding: 5,
                                                margin: 5,
                                                borderWidth: 2,
                                                borderColor: item.setHours(0,0,0,0) === dateForEPG.setHours(0,0,0,0) ? 'red' : 'white',
                                                borderRadius: 10,
                                                backgroundColor: item.setHours(0,0,0,0) === now.setHours(0,0,0,0) ? 'pink' : 'white'
                                                }}
                                            >
                                                <TouchableOpacity onPress={
                                                                        () => {
                                                                            setDateForEPG(item);
                                                                        }
                                                                                }>
                                                <Text 
                                                style ={{ margin: 5, fontSize: 16, textAlign: 'center'}} 
                                                > 
                                                {item.toDateString()}  
                                                </Text>
                                                </TouchableOpacity>
                                            </View>


    const renderEPGItem = ({item}) => <TouchableOpacity 
                                        onPress={async () => {
                                          // console.log("Select Epg", item.t_start, item.ut_start, item.progname)
                                          let videoUrl = await getUrl(channel.id + "&gmt=" + item.ut_start);
                                          // console.log("VideoUrl =", videoUrl);
                                          // setPcode(code);
                                            //   videoUrl = videoUrl + ".m3u8";
                                              navigation.navigate("Channel Player", {
                                                  url: videoUrl,
                                                  channel: channel,
                                              });
                                        }}
                                      >
                                        <View
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
                                      </TouchableOpacity>

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
          borderWidth: 1,
          borderColor: 'orange',
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
            backgroundColor: 'white'
        }}
        >
          <FlatList
            style={{
                    backgroundColor: 'white'
                  }}
            data={daysEPG}
            horizontal={true}
            renderItem={renderDaysEPGItem}
            initialScrollIndex={3}
          />  
        </View>
        
        <Text 
          style ={{fontWeight: 'bold', margin: 5, fontSize: 16, textAlign: 'center'}} 
        > 
         {dateForEPG.toDateString()}  
        </Text>
        <FlatList
          style={{backgroundColor: 'white'}}
          data={currentEPG}
          renderItem={renderEPGItem}
          keyExtractor={(item) => item.ut_start}
        />
      </View>
        </View>
        
    )
};

export default ChannelPlayer;