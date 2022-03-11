import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      login: '',
      password: ''
    }
  });
  const onSubmit = data => console.log(data);

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
        title="Submit" 
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
