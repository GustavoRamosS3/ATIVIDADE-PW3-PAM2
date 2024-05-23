import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Celulares({ nome, marca, data_criacao }){
    return(
        <View style={estilo.container}>
            <Text style={estilo.info}>{nome}</Text>
            <Text style={estilo.info}>{marca}</Text>
            <Text style={estilo.info}>{data_criacao}</Text>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {        
        flexDirection: 'row',
        padding: 10,
        width: 400
    },
    info:{
        width:185,
        margin: 2,
        fontSize:18,
        paddingVertical: 10,
        paddingStart: 5,
        borderRadius: 20,
        flex: 1,
        backgroundColor: '#483D8B',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: '#fff'
    }
});