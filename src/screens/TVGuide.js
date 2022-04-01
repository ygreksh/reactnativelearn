import React, {useEffect, useState} from "react";
import { Alert, Button, Image, Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Channels from "../components/Channels";
import Groups from "../components/Groups";
import { useSidStore, usePCodeStore, useHideStore, useTVStore } from "../store";


const TVGuide = ({navigation}) => {
    let baseUrl = 'https://online.polbox.tv/api/json/';

    let now = new Date();
    let daysEPG = [];
    for (let i= -4; i <= 4; i++) {
      let newDate = new Date(now);
      newDate.setDate(now.getDate() + i);
      daysEPG.push(newDate);
    }
    // console.log(daysEPG.map(date => date.toDateString()));

    const [dateForEPG, setDateForEPG] = useState(now);
    const sid = useSidStore(state => state.sid);
    const [currentEPG, setCurrentEPG] = useState();
    const [selectedChannel, setSelectedChannel] = useState({name: "", icon: null});
    const groups = useTVStore (state => state.groups);

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
    useEffect(() => {
      let url = baseUrl + "epg?"+ "cid=" + selectedChannel.id + "&day=" + getEpgDate(dateForEPG);
        
      // console.log(url);
      let headers = new Headers();
      headers.append('Cookie', "MWARE_SSID=" + sid);
      fetch(url, {method:'GET',
                        headers: headers})
            .then(response => response.json())
            .then(json => {
                // console.log('Genres_list from API : ', json);
                // console.log("epg loading");
                setCurrentEPG(json.epg);
                
              })
            .catch((error)=>{
                console.log("epg error", error.message);
            });
     
    },[selectedChannel, dateForEPG]);

    const getEpgDate = (date) => {
      let yy = date.getFullYear() % 100;
      let mm = date.getMonth() + 1;
      if (mm < 10) mm = "0"+ mm;
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return String(dd) + String(mm) + String(yy);
    }

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
    const renderChannelsItem = ({item}) => <View>
                                            <View style={{padding: 5, alignItems: "center", alignContent: 'center'}}
                                                >
                                                    <TouchableOpacity onPress={()=> {
                                                                                      // console.log("Select channel", item.name);
                                                                                      setSelectedChannel(item);
                                                                                    }}>
                                                        <Image
                                                            style={{width: 60, height: 60, resizeMode: 'contain'}}
                                                            source={{uri: 'http://online.polbox.tv/' + item.icon}}
                                                        />
                                                        <View style={{
                                                          // flex: 1,
                                                          // justifyContent: 'center',
                                                          // alignItems: 'center'
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
                                          let videoUrl = await getUrl(selectedChannel.id + "&gmt=" + item.ut_start);
                                          // console.log("VideoUrl =", videoUrl);
                                          // setPcode(code);
                                              videoUrl = videoUrl + ".m3u8";
                                              navigation.navigate("Player", {
                                                  url: videoUrl,
                                                  channel: selectedChannel,
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
                renderItem={renderGroupItem}
                keyExtractor={(item) => item.id}
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
                  source={{uri: 'http://online.polbox.tv/' + selectedChannel.icon}}
              />
              <Text 
                style={{fontWeight: 'bold', fontSize: 18, margin: 5,}}
              >
                        {selectedChannel.name}
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