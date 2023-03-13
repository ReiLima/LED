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

const AddTurmaScreen = ({ navigation, route }) => {
    const [turma, setTurma] = useState("");
  
    async function addTurma() {

        if(turma.length < 2){
            Alert.alert('Por favor digite o nome de uma nova turma ou o código de uma turma existente.')
        }
        else if(turma.charAt(0) == '#'){
            //Alert.alert('Turma Existente');
            const response = await fetch('http://192.168.1.104/api/membros/cadastrar.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: route.params.id,
              turma: turma
            })
          });
      
          const data = await response.json();      
  
          navigation.navigate('Home',{ id: route.params.id, nome: route.params.nome, render: false });
        }else{
          const response = await fetch('http://192.168.1.104/api/turmas/cadastrar.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: route.params.id,
              nome: turma
            })
          });
      
          const data = await response.json();
      
  
          navigation.navigate('Home',{ id: route.params.id, nome: route.params.nome, render: false });

        }
      /**/
  
    }
  
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/icon.png")} />
  
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nome da Turma / Código"
            placeholderTextColor="#ffffff"
            onChangeText={(turma) => setTurma(turma)}
          />
        </View>
  
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={addTurma}
        >
          <Text style={styles.loginText}>Adicionar Turma</Text>
        </TouchableOpacity>
      </View>
    );
  }

  export default AddTurmaScreen;

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