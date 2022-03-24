import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from "react-native";
// import Modal from "react-native-modal"
import { useNavigation } from "@react-navigation/native";
import useStore from './sidStore';
import usePCodeStore from "./pcodeStore";
import useAskPCodeStore from "./askPCodeStore";
// import CheckBox from '@react-native-community/checkbox';
import { Button, Checkbox } from "react-native-paper";


const Channel = ({channel}) => {
    const navigation = useNavigation();
    const sid = useStore(state => state.sid);
    const [isModalVisible, setModalVisible] = useState(false);
    const pcode = usePCodeStore(state => state.pcode);
    const setPCode = usePCodeStore(state => state.setPCode);
    const resetPCode = usePCodeStore(state => state.resetPCode);

    const askPCode = useAskPCodeStore(state => state.askPCode);
    const setAskPCode = useAskPCodeStore(state => state.setAskPCode);

    let baseUrl = 'https://online.polbox.tv/api/json/';
    
    async function getUrl(id) {
      let url = baseUrl + "get_url?"+ "cid=" + id;
      if (pcode !== null ) {
        url +=  "&protect_code=" + pcode;
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
        return matches[0];
      } else {
        alert("Error HTT: " + response.status);
        return null
      }
    }

    async function handleModalOk() {
      // setModalVisible(false);
      await setPCode("785206");
      console.log("PCode now:", pcode)
      handleOnPress();
    }
    
    async function handleOnPress () {
      console.log("Channel : " + channel.name);
      let videoUrl = await getUrl(channel.id);
      // console.log("VideoUrl =", videoUrl);
      // setPcode(code);
      if (videoUrl === "protected") {
        console.log(channel.name + " is protected")
        setModalVisible(true);
      } else {
        if (askPCode) {
          resetPCode();
        }
        videoUrl = videoUrl + ".m3u8";
        navigation.navigate("Player", {
            url: videoUrl
        });
    }

    }

    return(
        <View style={{padding: 5, alignItems: "center"}}
            >
                <TouchableOpacity onPress={handleOnPress}>
                    <Image
                        style={{width: 60, height: 60}}
                        source={{uri: 'http://online.polbox.tv/' + channel.icon}}
                    />
                    <Text >
                        {channel.name}
                    </Text>    
                </TouchableOpacity>
                <View 
                  style={styles.centeredView}
                >
                  <Modal
                      animationType="slide"
                      visible={isModalVisible}
                  >
                      <Text>Enter parental code</Text>
                      <TextInput 
                          style={styles.input}
                          type="outlined"
                          label="Parental code"
                          value=""
                          onChangeText={() => {}}
                      />
                      <Checkbox
                        status={askPCode}
                        onPress={() => {
                          setAskPCode(!askPCode);
                        }}
                      />
                  <Button
                    title="OK"
                    onPress={handleModalOk}
                  />
                  </Modal>
                </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      color: 'red',
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "red",
    },
    buttonClose: {
      backgroundColor: "green",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    input: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
  });
  
export default Channel;