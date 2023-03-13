import React, { useState, useEffect } from "react";
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    Button,
    Alert
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Card from 'app/components/card';

const HomeScreen = ({ navigation, route }) => {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);
    const [render, setRender] = useState([]);
    const [loading, setLoading] = useState(true);

    if(route.params.render){
        setRender(!render);
    }

    const fetchData = async () => {
        const resp = await fetch('http://192.168.1.104/api/turmas/consultarPorMembro.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: route.params.id
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

        <View>

        <View style={styles.botao}>
        <Button title="Adicionar Turma" color="#fff" onPress={() => navigation.navigate('adicionarTurma',{ id: route.params.id, nome: route.params.nome })}/>
        </View>

        { data.length > 0 ?

        <FlatList data={data}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
                <View style={{ width: '100%', height: 8 }} />
            }
            ListFooterComponent={
                <View style={{ width: '100%', height: 28 }} />
            }
            renderItem={({ item }) =>
                <Card id={item.id} navigation={navigation} nomeTurma={item.nome} descricaoTurma={item.id} tamanhoTurma={item.tamanho} membro={route.params.id} ></Card>

            }
            extraData={data}
        />

        :

        <Text style={{textAlign: 'center', marginVertical: 150, fontWeight: 'bold'}}>Você ainda não possui nenhuma turma</Text>

        }

            </View>

            //route.params.id
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#abc",
        alignItems: "center"
    },
    text: {
        color: "#00f"
    },
    botao:{
        backgroundColor: "#2d3142",
        marginVertical: 20,
        marginHorizontal: 15,
        borderRadius: 5
    }
});