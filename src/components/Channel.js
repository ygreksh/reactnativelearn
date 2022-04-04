import React, { useState } from "react";
import { Text, Button, View, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Alert, FlatList } from "react-native";
// import Modal from "react-native-modal"
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useSidStore, usePCodeStore, useAskPCodeStore } from "../store";
import { Checkbox, Portal, Provider, Switch } from "react-native-paper";


const Channel = ({channel}) => {
    const navigation = useNavigation();
    const sid = useSidStore(state => state.sid);
    const [isModalVisible, setModalVisible] = useState(false);
    const pcode = usePCodeStore(state => state.pcode);
    const setPCode = usePCodeStore(state => state.setPCode);
    const resetPCode = usePCodeStore(state => state.resetPCode);

    const askPCode = useAskPCodeStore(state => state.askPCode);
    const setAskPCode = useAskPCodeStore(state => state.setAskPCode);

    const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        protectCode: ''
      }
    });

    let baseUrl = 'https://online.polbox.tv/api/json/';
    
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

    async function handleModalOk(data) {
      setPCode(data.protectCode);
      console.log("PCode now:", pcode);
      let videoUrl = await getUrl(channel.id, data.protectCode);
      if (videoUrl === "protected") {
        console.log(channel.name + " Wrong protect_code");
        Alert.alert("Wrong code!");
        setModalVisible(false);
      } else {
        // videoUrl = videoUrl + ".m3u8";
        navigation.navigate("ChannelPlayer", {
            url: videoUrl,
            channel: channel,
        });
      }
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
            // resetPCode();
          }
          videoUrl = videoUrl + ".m3u8";
          navigation.navigate("Player", {
              url: videoUrl,
              channel: channel,
          });
        }

    }
    const toggleAskSwitch = () => {
      setAskPCode(!askPCode);
      // console.log("isAskEnabled =", askPCode.toString());
    }
    const hideModal = () => setModalVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return(
      <Provider>
        <View style={{padding: 5, alignItems: "center", alignContent: 'center'}}
            >
                <TouchableOpacity onPress={handleOnPress}>
                    <Image
                        style={{width: 60, height: 60, resizeMode: 'contain'}}
                        source={{uri: 'http://online.polbox.tv/' + channel.icon}}
                    />
                    <View style={{
                      // justifyContent: 'center',
                      alignItems: 'center'
                      }}
                    >
                      <Text >
                        {channel.name}
                      </Text>    
                    </View>
                    
                </TouchableOpacity>
        </View>
        <View 
          style={styles.centeredView}
        >
        <Portal>
        <Modal
              animationType="slide"
              visible={isModalVisible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
            <View style={styles.container} >
              <Text>Enter code</Text>
              <Controller
                control={control}
                name="protectCode"
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.firstName && <Text>This is required.</Text>}
              <Text> Ask parental code: {askPCode.toString()}</Text>
              <Switch 
                    onValueChange={toggleAskSwitch}
                    value={askPCode}
              />
              <Button 
                title="OK" 
                style={styles.button}
                onPress={handleSubmit(handleModalOk)} />
              <Button 
                title="Cancel" 
                style={styles.button}
                onPress={hideModal} />
            </View>
    
        </Modal>  
        </Portal>
            
      </View>
      </Provider>
            
    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    container: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      elevation: 10,
      backgroundColor: '#e6e6e6'
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
      height: 50,
      width: '80%',
      margin: 10,
      fontSize: 20,
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 0,
    },
  });
  
export default Channel;