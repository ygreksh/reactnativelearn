import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
// import { State } from "zustand";
import useStore from './sidStore'


const Login = ({navigation}) => {
    const setSid = useStore(state => state.setSid);


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

    let url = baseUrl + "login?login=" + username + "&" + "pass=" + password + "&softid=apple";
    console.log(user);
    console.log(url);
    fetch(url, {method:'GET'})
    .then(response => response.json())
    .then(json => {
        if (!json.error) {
            setSid(json.sid);
            console.log('LOGIN: ', json);
            navigation.navigate('Home');
        } else {
            console.log('Failed login: ', json.error.message);
            alert(json.error.message);
        }
        });
    
  }


  return (
    <View>
      <Text>Login Screen</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 2,
    height: 40,
    width: 200,
  },
  input: {
    height: 40,
    width: 300,
    margin: 10,
    borderWidth: 1,
    padding: 5,
  }
});
export default Login;