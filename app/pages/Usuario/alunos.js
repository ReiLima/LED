import React, { useState, useEffect } from "react";
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Image
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

const userChatList = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        nome: "Pedro Coelho",
        pontuacao: 94,
        posicao: 1,
        foto: ""
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        nome: "Nicolau Ho Ho Ho",
        pontuacao: 70,
        posicao: 2
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        nome: "Joaquim José da Silva Xavier",
        pontuacao: 60,
        posicao: 3
    },
];

function Item({ item }) {
    return (
      <View style={styles.listItem}>
        <Image source={require('../../assets/account.png')}  style={{backgroundColor:"#fff",width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{fontWeight:"bold", color:"#fff"}}>{item.membro}</Text>
          <Text style={{color:"#808080"}}>#{item.posicao}</Text>
        </View>
        <View style={{backgroundColor:"#2d3142", borderRadius:"5", height:50}}>
        <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"#FFF"}}>{item.pontuacao} pts</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

const AlunosScreen = ({ navigation, route }) => {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);
    const [render, setRender] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      const resp = await fetch('http://192.168.1.104/api/membros/consultarPorId.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            turma: route.params.id
          })
      });
      const data = await resp.json();
      
      setData(data);          
      
      setLoading(!loading);
    };
    
    useEffect(() => {
      if(isFocused){ 
          fetchData();
      }
    }, [isFocused]);


    return (
        <View style={styles.container}>
        <FlatList
          style={{flex:1}}
          data={data}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.id}
        />
      </View>
    );
};

export default AlunosScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:60
    },
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#87ceeb",
      width:"80%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    }
  });