import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function App() {
  const [userAccount, setUserAccount] = useState();
  const [userSid, setUserSid] = useState();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      login: '',
      password: ''
    }
  });
  let baseUrl = 'https://online.polbox.tv/api/json/';


  const onSubmit = data => {
    loginFunc(data);
  }

  const loginFunc = async (user) => {

    let username = user.login;
    let password = user.password;

    let url = baseUrl + "login?login=" + username + "&" + "pass=" + password;
    console.log(user);
    console.log(url);
    const response = await fetch(url, {method:'GET'})
    .then(response => response.json())
    .then(json => {
          console.log('LOGIN: ', json);
          setUserAccount(json);
          setUserSid(json.sid);
        })
    // console.log('userAccount.sid: ', userAccount.sid);
    // console.log('userSid: ', userSid);
  }

  const logoutFunc = () => {

    if(userAccount) {
      let url = baseUrl + "logout?" + "MWARE_SSID=" + userAccount.sid;
      fetch(url, {method:'GET',
        // headers: headers,
        //credentials: 'user:passwd'
       })
      .then(response => response.json())
      .then(json => {
          console.log('LOGOUT : ', json);
          setUserAccount(null);
          setUserSid(null);
        });
      // console.log('SID: ', userAccount);
    }
  }

  const getAccount = () => {
    let url = baseUrl + "account";
    let headers = new Headers();
    if (userAccount) {
        console.log('sid now', userAccount.sid);
        headers.append('Cookie', userAccount.sid);
      fetch(url, {method:'GET',
                headers: headers,})
      .then(response => response.json())
      .then(json => {
          console.log('GET ACCOUNT: ', json);
          });
          console.log('userAccount.sid: ', userAccount.sid);
          console.log('userSid: ', userSid);
      }

    //headers.append('Content-Type', 'text/json');
    // headers.append('Content-Type', 'application/json');
    
  }

  return (
    <View>
      <Controller
        control={control}
        name="login"
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

      <Controller
        name="password"
        control={control}
        rules={{
         maxLength: 100,
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

      <Button 
        title="Login" 
        style={styles.button}
        onPress={handleSubmit(onSubmit)} />
      <Button 
        title="Logout" 
        style={styles.button}
        onPress={logoutFunc} />
      <Button 
        title="Account" 
        style={styles.button}
        onPress={getAccount} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 2,
    height: 40,
    width: 300,
  },
  input: {
    height: 40,
    width: 300,
    margin: 10,
    borderWidth: 1,
    padding: 5,
  }
});
