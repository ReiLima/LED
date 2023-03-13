import React, { useState, useEffect } from "react";
import {
    Alert,
    Text,
    Button,
    SectionList,
    FlatList,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    Pressable,
    Image,
    Modal
} from "react-native";
import { TouchableOpacity } from "react-native-web";
import { useIsFocused } from "@react-navigation/native";

import Assunto from 'app/components/assunto';

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

    const isFocused = useIsFocused();

    const [dados, setDados] = useState([]);
    const [render, setRender] = useState([]);
    const [loading, setLoading] = useState(true);

    if(route.params.render){
        setRender(!render);
    }


    const fetchData = async () => {
        const resp = await fetch('http://192.168.1.104/api/temas/consultarPorId.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              turma: route.params.id
            })
        });
        const dados = await resp.json();
        
        setDados(dados);          
        
        setLoading(!loading);
    };

    useEffect(() => {
        if(isFocused){ 
            fetchData();
        }
      }, [isFocused]);

    return (
        <View style={{ flexDirection: "column" }}>
          <View style={styles.botao}>
            <Button title="Adicionar Conteúdo" fontWeight="bold" fontSize="18" color="#fff" onPress={() => navigation.navigate('adicionarConteudo',{ id: route.params.id, nome: route.params.nome, membro: route.params.membro })}/>
          </View>

            <SectionList
                sections={[
                  { title: 'Background Histórico',
                      data: [
                        {
                          nome: "Ábaco",
                          descricao: "Conjunto de varetas de forma paralela que contêm pequenas bolas para realizar a contagem.",
                          foto: require('../../assets/abacus.png')
                        },
                        {
                          nome: "Pascalina",
                          descricao: "Criada por Blaise Pascal, é a primeira calculadora mecânica capaz de realizar operações de adição e subtração.",
                          foto: require('../../assets/pascalina.png')
                        },
                        {
                            nome: "Ada Lovelace",
                            descricao: "Considerada a primeira programadora da história, tendo desenvolvido o primeiro algoritmo para a máquina analítica de Babbage.",
                            foto: require('../../assets/ada.png')
                        },
                        {
                            nome: "George Boole",
                            descricao: "Pai da álgebra booleana, sistema de álgebra que é chave para a programação de hoje.",
                            foto: require('../../assets/boole.png')
                        },     
                        {
                          nome: "Alan Turing",
                          descricao: "Considerado o pai da computação, principalmente pela concepção de máquina de Turing, uma máquina teórica que pode ser considerada um modelo de um computador de uso geral.",
                          foto: require('../../assets/turing.png')
                        },            
                      {
                        nome: "ENIAC",
                        descricao: "Primeiro computador digital eletrônico de grande escala. O 'sistema operacional' da máquina era através de cartões perfurados.",
                        foto: require('../../assets/eniac.png')
                      },
                      {
                        nome: "Internet",
                        descricao: "Sistema global de redes de computadores interligadas. Surge no final dos anos 60 como Arpanet, conectando 4 universidades americanas.",
                        foto: require('../../assets/worldwide.png')
                      },
                    ]
                    },
                    { title: 'Componentes Básicos',
                      data: [
                        {
                            nome: "Resistor",
                            descricao: "Resistores são dispositivos elétricos usados para limitar a passagem da corrente elétrica.",
                            foto: require('../../assets/resistor.png')
                        },
                        {
                            nome: "Capacitor",
                            descricao: "Capacitores são dispositivos elétricos usados para armazenar carga elétrica.",
                            foto: require('../../assets/capacitor.png')
                        },
                        {
                            nome: "Indutor",
                            descricao: "Indutores são dispositivos elétricos usados para armazenar energia na forma de campo magnético.",
                            foto: require('../../assets/inductor.png')
                          },
                        {
                          nome: "Transistor",
                          descricao: "Transistores são dispositivos semicondutores usados para amplificar ou trocar sinais eletrônicos e potência elétrica.",
                          foto: require('../../assets/transistor.png')
                        },
                      {
                        nome: "Diodo",
                        descricao: "Diodos são dispositivos elétricos que permitem que a corrente o atravesse num sentido com muito mais facilidade do que no outro. LEDs são diodos capazes de emitir luz.",
                        foto: require('../../assets/led.png')
                      },
                      {
                        nome: "Sensor",
                        descricao: "Sensores são dispositivos elétricos que convertem uma forma de energia em energia elétrica, como por exemplo temperatura em tensão.",
                        foto: require('../../assets/sensor.png')
                      },
                      {
                        nome: "Bateria",
                        descricao: "Baterias são dispositivos elétricos que convertem a energia de uma reação química em corrente elétrica.",
                        foto: require('../../assets/battery.png')
                      },
                    ]
                    },
                    { title: 'Grandezas Elétricas',
                      data: [
                        {
                            nome: "Tensão",
                            descricao: "A tensão elétrica é a força necessária para movimentar os elétrons, criando uma corrente elétrica. Pode ser dividida em contínua (sem mudança de polaridade) e alternada(com mudanças de polaridade).",
                            foto: require('../../assets/battery.png')
                        },
                        {
                            nome: "Corrente",
                            descricao: "A corrente elétrica é um fluxo ordenado de cargas elétricas.",
                            foto: require('../../assets/current.png')
                        },
                        {
                            nome: "Resistência",
                            descricao: "Resistência é a capacidade de um corpo se opor à passagem da corrente elétrica.",
                            foto: require('../../assets/resistance.png')
                        },
                        {
                            nome: "Potência",
                            descricao: "Potência elétrica é a velocidade com que o dispositivo elétrico converte a energia elétrica em trabalho.",
                            foto: require('../../assets/power.png')
                        }
                    ]
                    },
                    { title: 'Álgebra Booleana',
                      data: [
                        {
                            nome: "Bit",
                            descricao: "O bit é a menor unidade de informação que pode ser armazenada ou transmitida. Um bit pode assumir somente 2 valores: 0 ou 1.",
                            foto: require('../../assets/binary.png')
                        },
                        {
                            nome: "Not",
                            descricao: "A função not é uma função que  tem como saída o inverso do valor lógico da entrada, ou seja, uma entrada ALTA (1) resulta em uma saída BAIXA (0) e analogamente uma entrada BAIXA (0) resulta em uma saída ALTA (1).",
                            foto: require('../../assets/not.png')
                        },
                        {
                            nome: "And",
                            descricao: "A função and é uma função que tem como saída o valor lógico 1 se, e somente se, todas as entradas tiverem valor lógico 1. Equivale a uma multiplicação.",
                            foto: require('../../assets/and.png')
                        },
                        {
                            nome: "Or",
                            descricao: "A função or é uma função que tem como saída o valor lógico 0 se, e somente se, todas as entradas tiverem valor lógico 0. Equivale a uma adição.",
                            foto: require('../../assets/or.png')
                        }
                    ]
                    },
                    { title: 'Sensores e Atuadores',
                      data: [
                        {
                            nome: "LDR",
                            descricao: "O LDR é um sensor de luminosidade que transforma intensidade luminosa em resistência elétrica.",
                            foto: require('../../assets/ldr.png')
                        },
                        {
                            nome: "Buzzer",
                            descricao: "O buzzer é um atuador que transforma corrente elétrica em som, a depender da frequência do sinal de entrada o som muda sua própria frequência, emitindo assim notas diferentes.",
                            foto: require('../../assets/buzzer.png')
                        },
                        {
                            nome: "Motor",
                            descricao: "O motor é um atuador que transforma corrente elétrica em energia mecânica rotativa.",
                            foto: require('../../assets/servo.png')
                        },
                        {
                            nome: "Sensor de Temperatura",
                            descricao: "O sensor de temperatura é um sensor que transforma a intensidade térmica em tensão elétrica.",
                            foto: require('../../assets/lm35.png')
                        }
                    ]
                    },
                    { title: 'Exemplos do dia a dia',
                      data: [
                        {
                            nome: "Carregador",
                            descricao: "O carregador é um conversor de energia que transforma tensão alternada (tomada) para tensão contínua (celular).",
                            foto: require('../../assets/phone-charger.png')
                        },
                        {
                            nome: "Microfone",
                            descricao: "O microfone é um sensor que transforma som em corrente elétrica, a corrente elétrica por sua vez pode ser transmitida a um atuador como uma caixa de som, que transforma-a novamente em som, de forma amplificada.",
                            foto: require('../../assets/microfone.png')
                        },
                        {
                            nome: "TV",
                            descricao: "A TV é um dispositivo eletrônico capaz de exibir imagens. As TVs modernas são compostas de um painel com inúmeros leds, que juntos formam a imagem colorida na tela.",
                            foto: require('../../assets/smart-tv.png')
                        }
                    ]
                    },
                    { title: 'Outros',
                      data: dados
                    }
                ]}
                renderItem={
                    ({ item }) => 
                            <Assunto nome = {item.nome} descricao = {item.descricao} foto = {item.foto}></Assunto>
                           
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