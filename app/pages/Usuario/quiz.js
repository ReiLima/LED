import React, { useState } from "react";
import {
    Alert,
    Text,
    SectionList,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Pressable,
    Image,
    Modal,
    FlatList
} from "react-native";

import Assunto from 'app/components/assunto';
import Questao from 'app/components/questao';

var questoes = [
    {
        id: "0",
        pergunta: "Quem foi considerado(a) o(a) primeiro(a) programador(a)?",
        respostas: [
            {
                resposta: "Alan Turing",
                foto: require('../../assets/turing.png')
            },
            {
                resposta: "George Boole",
                foto: require('../../assets/boole.png')
            },
            {
                resposta: "Ada Lovelace",
                foto: require('../../assets/ada.png')
            },
            {
                resposta: "Pascalina",
                foto: require('../../assets/pascalina.png')
            },
        ],
        indiceCerto: 2
    },
    {
        id: "1",
        pergunta: "Qual é considerado o primeiro computador digital eletrônico?",
        respostas: [
            {
                resposta: "ENIAC",
                foto: require('../../assets/eniac.png')
            },
            {
                resposta: "Ábaco",
                foto: require('../../assets/abacus.png')
            },
            {
                resposta: "Pascalina",
                foto: require('../../assets/pascalina.png')
            },
            {
                resposta: "Transistor",
                foto: require('../../assets/transistor.png')
            },
        ],
        indiceCerto: 0
    },
    {
        id: "2",
        pergunta: "Qual o componente eletrônico que transforma energia elétrica em luz?",
        respostas: [
            {
                resposta: "Resistor",
                foto: require('../../assets/resistor.png')
            },
            {
                resposta: "LED",
                foto: require('../../assets/led.png')
            },
            {
                resposta: "Capacitor",
                foto: require('../../assets/capacitor.png')
            },
            {
                resposta: "Pilha",
                foto: require('../../assets/battery.png')
            },
        ],
        indiceCerto: 1
    }
    ,
    {
        id: "3",
        pergunta: "Qual a função lógica cuja saída é o inverso do valor lógico da entrada?",
        respostas: [
            {
                resposta: "Not",
                foto: require('../../assets/not.png')
            },
            {
                resposta: "And",
                foto: require('../../assets/and.png')
            },
            {
                resposta: "Or",
                foto: require('../../assets/or.png')
            },
            {
                resposta: "Bit",
                foto: require('../../assets/binary.png')
            },
        ],
        indiceCerto: 0
    }
];

questoes = questoes.sort(() => Math.random() - 0.5);

const QuizScreen = ({ navigation, route }) => {

    const indexQuestao = route.params.idQuestao;
    var score = route.params.score;

    const [modalVisible, setModalVisible] = useState(false);
    const [tituloModal, setTituloModal] = useState(false);
    const [descricaoModal, setDescricaoModal] = useState(false);

    async function pontuar() {

        console.log(route.params.score);

        const response = await fetch('http://192.168.1.104/api/membros/atualizar.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            turma: route.params.id,
            id: route.params.membro,
            pontuacao: route.params.score
          })
        });
    
        const status = await response.status;
        const data = await response.text();
    
        if(status == '201'){
          navigation.goBack();
        }else if(status == '400'){
            Alert.alert(data.mensagem);
            navigation.goBack();
        }else if(status == '503'){
          //Alert.alert(data.mensagem);
          navigation.goBack();
        }else{
            //Alert.alert(data.mensagem);
            navigation.goBack();
        }
    
      }
    

    return (
        <View style={{ flexDirection: "column" }}>
            <View>
                <Text style={styles.sectionHeader}>Questão {indexQuestao+1}</Text>
            </View>
            <View style={{marginTop:20, marginBottom:20,marginHorizontal:40, textAlign:"center", alignItems: "center"}}>
                <Text style={{fontSize: 18}}>{indexQuestao+1} - {questoes[indexQuestao].pergunta}</Text>
            </View>

            <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{tituloModal}</Text>
                    <Image
                            source={require("../../assets/medal.png")}
                            resizeMode="contain"
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 25,
                                height: 100,
                                width: 100,
                                margin: 10
                            }}
                        />
                    <Text style={styles.modalText}>{descricaoModal}</Text>
                    
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={
                        () => {
                            setModalVisible(!modalVisible);
                            pontuar();
                        }
                    }
                    >
                    <Text style={styles.textStyle}>Fechar</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            </View>

            <FlatList data={questoes[indexQuestao].respostas}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
                <View style={{ width: '100%', height: 8 }} />
            }
            ListFooterComponent={
                <View style={{ width: '100%', height: 28 }} />
            }
            renderItem={({ item, index }) => 
                
                    <TouchableOpacity onPress={() => {

                        if(questoes[indexQuestao].indiceCerto == index){                            
                            score = score + 1;
                        }

                        if(indexQuestao + 1 >= questoes.length){
                            setModalVisible(!modalVisible);
                            setDescricaoModal("Você acertou ".concat(score).concat(" questões!"));
                            setTituloModal("Resultado");
                        }else{
                            navigation.navigate('Quiz', {idQuestao: indexQuestao + 1, score: score, membro: route.params.membro, id: route.params.id})
                        }
                        
            
                    }}>
                    <Questao texto={item.resposta} foto={item.foto} navigation={navigation} indexQuestao={indexQuestao}></Questao>
                    </TouchableOpacity>
            } />

        </View>
    );
};

export default QuizScreen;

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
        color: '#fff',
        textAlign: "center",
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    mainCardView: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#87ceeb',
        borderRadius: 15,
        shadowColor: '#808080',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#808080',
        borderColor: '#808080',
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 14
      },
      modalTitle:{
        textAlign: "center",
        color: "#2d3142",
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 'bold'
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: "#87ceeb",
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