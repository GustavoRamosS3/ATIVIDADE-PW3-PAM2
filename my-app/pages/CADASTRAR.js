import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";

const theme = {
  colors: {
    primary: '#04534d',
  }
};

export default function CADASTRAR() {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');



  

  async function PostDados(url = "", data = {}) {
    try {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/perfumes',
            headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.1'},
            data: {nome: nome, marca: marca}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
    } catch (error) {
      console.error('Erro ao cadastrar perfume:', error);
    }
  }

  const handleSubmit = () => {
    PostDados("http://localhost:3000/perfumes", { nome, marca })
      .then((newPerfume) => {
        console.log('Perfume cadastrado com sucesso:', newPerfume);
        setNome('');
        setMarca('');
      })
      .catch(error => console.error('Erro ao cadastrar perfume:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Perfume</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder='Nome do perfume'
      />
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
        placeholder='Marca do perfume'
      />
      <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#03363a',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  botao: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
