import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'app/pages/Login/index';
import SignupScreen from 'app/pages/Login/cadastro';
import ProfileScreen from 'app/pages/Usuario/perfil';
import HomeScreen from 'app/pages/Usuario/home';
import TurmaScreen from 'app/pages/Usuario/turma';
import {
  Button
} from "react-native";
import AlunosScreen from "app/pages/Usuario/alunos";
import ConteudoScreen from "app/pages/Usuario/conteudo";
import QuizScreen from "app/pages/Usuario/quiz";
import TarefasScreen from "app/pages/Usuario/tarefas";
import AddTurmaScreen from "app/pages/Usuario/adicionarTurma";
import AddConteudoScreen from "app/pages/Usuario/adicionarConteudo";
import AddProjetoScreen from "app/pages/Usuario/adicionarProjeto";
import AddPerguntaScreen from "app/pages/Usuario/adicionarPergunta";


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Cadastro' }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Minhas Turmas'}}/>
        <Stack.Screen name="Turma" component={TurmaScreen} options={({ route }) => ({ title: route.params.title })}/>
        <Stack.Screen name="Alunos" component={AlunosScreen} options={{ title: 'Alunos' }}/>
        <Stack.Screen name="Conteudo" component={ConteudoScreen} options={{ title: 'Conteudo' }}/>
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }}/>
        <Stack.Screen name="Tarefas" component={TarefasScreen} options={{ title: 'Projetos' }}/>
        <Stack.Screen name="adicionarTurma" component={AddTurmaScreen} options={{ title: 'Adicionar Turma' }}/>
        <Stack.Screen name="adicionarConteudo" component={AddConteudoScreen} options={{ title: 'Adicionar Conteúdo' }}/>
        <Stack.Screen name="adicionarProjeto" component={AddProjetoScreen} options={{ title: 'Adicionar Projeto' }}/>
        <Stack.Screen name="adicionarPergunta" component={AddPerguntaScreen} options={{ title: 'Adicionar Pergunta' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}