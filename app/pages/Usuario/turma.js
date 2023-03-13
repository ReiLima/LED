import {React} from "react";
import {
    Text,
    FlatList,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    View
} from "react-native";

import LargerCard from 'app/components/largerCard';

const TurmaScreen = ({ navigation, route }) => {

    const input = route.params.id;

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: "row" }}>
                <View>
                    <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate('Alunos',{id: route.params.id})} style={{ justifyContent: 'flex-start', }}>
                        <LargerCard titulo = "Alunos" imagem = "aluno"></LargerCard>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate('Conteudo',{id: route.params.id})} style={{ justifyContent: 'flex-end', }}>
                        <LargerCard titulo = "Conteúdo" imagem = "conteudo"></LargerCard>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View>
                    <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate('Quiz', {idQuestao: 0, score: 0, id: route.params.id, membro: route.params.membro})} style={{ justifyContent: 'flex-start', }}>
                        <LargerCard titulo = "Quiz" imagem = "quiz"></LargerCard>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate('Tarefas',{id: route.params.id})} style={{ justifyContent: 'flex-end', }}>
                        <LargerCard titulo = "Projetos" imagem = "tarefa"></LargerCard>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default TurmaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#abc",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#00f"
    },
    image: {
        marginVertical: 20,
        height: 160,
        width: 140,
        marginHorizontal: 20,
        borderRadius: 10
    },
    box: {
        width: '100%',
        height: '50%'
    },
    minibox: {
        width: '40%',
        borderColor: '#0ff'
    }
});