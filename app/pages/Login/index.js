import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const LoginScreen = ({ navigation }) => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
  
    async function signIn() {
      const response = await fetch('http://192.168.1.104/api/usuarios/validar.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: usuario,
          senha: senha
        })
      });
  
      const status = await response.status;
      const data = await response.json();
  
      if(status == '200'){
        navigation.navigate('Home',{ id: data.id, nome: data.nome });
      }else if(status == '400'){
        Alert.alert(data.mensagem);
      }else if(status == '404'){
        Alert.alert(data.mensagem);
      }
  
    }
  
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/logo.png")} />
  
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Usuário"
            placeholderTextColor="#ffffff"
            onChangeText={(usuario) => setUsuario(usuario)}
          />
        </View>
  
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Senha"
            placeholderTextColor="#ffffff"
            secureTextEntry={true}
            onChangeText={(senha) => setSenha(senha)}
          />
        </View>
  
        <TouchableOpacity onPress={async()=> {navigation.navigate('Signup')}}>
          <Text style={styles.forgot_button}>Ainda não possui cadastro?</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={signIn}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  export default LoginScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  
    image: {
      marginBottom: 40,
      height: 100,
      width: 100
    },
  
    inputView: {
      backgroundColor: "#87ceeb",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center"
    },
  
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      color: "#ffffff"
    },
  
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
  
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#2d3142",
    },

    loginText: {
      color: "#ffffff"
    }
  });