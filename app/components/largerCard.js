import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Text,
    FlatList,
    Image,
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";

const imagens = {
    aluno: require('../assets/people.png'),
    conteudo: require('../assets/content.png'),
    quiz: require('../assets/choose-icon.png'),
    tarefa: require('../assets/clipboard.png')
};

const LargerCard = (props) => {
    return (
            <View style={styles.mainCardView}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View style={styles.subCardView}>
                        <Image
                            source={props.imagem == "aluno" ? imagens.aluno : props.imagem == "conteudo" ? imagens.conteudo : props.imagem == "quiz" ? imagens.quiz : imagens.tarefa}
                            resizeMode="contain"
                            style={{
                                height: 90,
                                width: 90,
                            }}
                        />
                    </View>
                    <View style={{ marginLeft: 0 }}>
                        <Text
                            style={{
                                fontSize: 24,
                                color: '#ffffff',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                            }}>
                            {props.titulo}
                        </Text>
                        <View
                            style={{
                                marginTop: 4,
                                borderWidth: 0,
                                width: '85%',
                            }}>
                            <Text
                                style={{
                                    color: '#808080',
                                    fontSize: 12,
                                }}>
                                {props.descricaoTurma}
                            </Text>
                        </View>
                    </View>
                </View>
                
            </View>
    );
};

export default LargerCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    mainCardView: {
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
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    subCardView: {
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
});