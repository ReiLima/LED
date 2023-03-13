import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Text,
    FlatList,
    Image,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal,
    Pressable
} from "react-native";

const Projeto = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [tituloModal, setTituloModal] = useState(false);
    const [descricaoModal, setDescricaoModal] = useState(false);

    return (
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
                            source={props.foto}
                            resizeMode="contain"
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 25,
                                height: 250,
                                width: 250,
                                margin: 10
                            }}
                        />                    
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Fechar</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
        <TouchableWithoutFeedback
        onPress={
            ()=>{
                setModalVisible(!modalVisible);
                setDescricaoModal(props.descricao);
                setTituloModal(props.nome);
            }}>
                
                <View style={styles.listItem}>
        <Image source={props.foto} style={{backgroundColor:"#fff",width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",justifyContent:'center', flex:1}}>
          <Text style={{fontWeight:"bold", color:"#fff"}}>{props.nome}</Text>
        </View>
        <Image source={props.foto}  style={{backgroundColor:"#fff",width:60, height:60,borderRadius:30}} />
      </View>
        </TouchableWithoutFeedback >
        </View>
    );
};

export default Projeto;

const styles = StyleSheet.create({
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