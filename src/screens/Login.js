import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSidStore } from "../store";


const Login = ({navigation}) => {
    const setSid = useSidStore(state => state.setSid);


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
    <View style={styles.loginContainer} >
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
         maxLength: 10,
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
  loginContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
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
  button: {
    width: '80%'
  },
});
export default Login;