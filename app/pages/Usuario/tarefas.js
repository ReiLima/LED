import React, { useState } from "react";
import {
    Alert,
    Text,
    Button,
    SectionList,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    Pressable,
    Image,
    Modal
} from "react-native";
import { TouchableOpacity } from "react-native-web";

import Projeto from 'app/components/projeto';

function Item({ item }) {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World! Lorem Ipsum quam dolor et amet</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

const userChatList = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        nome: "Pedro Coelho",
        pontuacao: 94,
        posicao: 1
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

const ConteudoScreen = ({ navigation, route }) => {

    return (
        <View style={{ flexDirection: "column" }}>
          <View style={styles.botao}>
            <Button title="Adicionar Projeto" fontWeight="bold" fontSize="18" color="#fff" onPress={() => navigation.navigate('adicionarConteudo',{ id: route.params.id, nome: route.params.nome })}/>
          </View>

            <SectionList
                sections={[
                    { title: 'Projetos',
                      data: [
                        {
                            nome: "Hello World",
                            descricao: "Resistores são dispositivos elétricos usados para limitar a passagem da corrente elétrica.",
                            foto: require('../../assets/p1.png')
                        },
                        {
                            nome: "Caixa de Som",
                            descricao: "2 - Gostaria de enfatizar que a revolução dos costumes não pode mais se dissociar das posturas dos órgãos dirigentes com relação às suas atribuições.",
                            foto: require('../../assets/p2.png')
                        },
                        {
                            nome: "Detector de Luminosidade",
                            descricao: "3 - Desta maneira, a necessidade de renovação processual acarreta um processo de reformulação e modernização das posturas dos órgãos dirigentes com relação às suas atribuições.",
                            foto: require('../../assets/p3.png')
                          },
                        {
                          nome: "Somador de 2 bits",
                          descricao: "3 - Desta maneira, a necessidade de renovação processual acarreta um processo de reformulação e modernização das posturas dos órgãos dirigentes com relação às suas atribuições.",
                          foto: require('../../assets/p4.png')
                        },
                      {
                        nome: "Contador Hexadecimal",
                        descricao: "3 - Desta maneira, a necessidade de renovação processual acarreta um processo de reformulação e modernização das posturas dos órgãos dirigentes com relação às suas atribuições.",
                        foto: require('../../assets/p5.png')
                      },
                    ]
                    }
                ]}
                renderItem={
                    ({ item }) => 
                            <Projeto nome = {item.nome} descricao = {item.descricao} foto = {item.foto}></Projeto>
                           
                }
                renderSectionHeader={({ section }) => <View style={styles.header}><Text style={styles.sectionHeader}>{section.title}</Text></View>}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
};

export default ConteudoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginVertical: 20
    },
    text: {
        color: "#00f"
    },
    image: {
        height: 40,
        width: 40,
        marginRight: 20
    },
    trophy: {
        height: 60,
        width: 60,
        marginVertical: 20
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#2d3142',
        color: '#fff'
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      botao:{
        backgroundColor: "#2d3142",
        marginVertical: 20,
        marginHorizontal: 15,
        borderRadius: 5        
    }
      
});