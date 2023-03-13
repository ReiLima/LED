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

const Card = (props) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.navigation.navigate('Turma',{id: props.id, title: props.nomeTurma, membro: props.membro});
            }}>
            <View style={styles.mainCardView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.subCardView}>
                        <Image
                            source={require("../assets/icon.png")}
                            resizeMode="contain"
                            style={{
                                borderRadius: 25,
                                height: 50,
                                width: 50,
                            }}
                        />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: '#ffffff',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                            }}>
                            {props.nomeTurma}
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
                <View
                    style={{
                        height: 25,
                        backgroundColor: '#2d3142',
                        borderWidth: 0,
                        width: 25,
                        marginLeft: -26,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50,
                    }}>
                    <Text style={{ color: '#ffffff' }}>
                        {props.tamanhoTurma}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
};

export default Card;

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
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
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
});