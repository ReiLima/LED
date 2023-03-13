import { TabRouter } from "@react-navigation/native";
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

const AddConteudoScreen = ({ navigation, route }) => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    async function addTema() {
            const response = await fetch('http://192.168.1.104/api/temas/cadastrar.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nome: nome,
              turma: route.params.id,
              descricao: descricao
            })
          });
      
          const data = await response.json();      
  
          navigation.goBack();
        
      /**/
  
    }
  
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/icon.png")} />
  
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nome do Tema"
            placeholderTextColor="#ffffff"
            onChangeText={(nome) => setNome(nome)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Descrição do Tema"
            placeholderTextColor="#ffffff"
            onChangeText={(descricao) => setDescricao(descricao)}
          />
        </View>
  
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={addTema}
        >
          <Text style={styles.loginText}>Adicionar Tema</Text>
        </TouchableOpacity>
      </View>
    );
  }

  export default AddConteudoScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#abc",
      alignItems: "center",
      justifyContent: "center",
    },
  
    image: {
      marginBottom: 40,
      height: 60,
      width: 60
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