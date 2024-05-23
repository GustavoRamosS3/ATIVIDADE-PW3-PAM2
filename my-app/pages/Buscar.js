import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, Modal, Image, TouchableOpacity, ScrollView } from 'react-native';
import Perfumes from '../Perfumes';

export default function Peril() {
  const [dados, setPerfumes] = useState([]);
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  async function getDados(url = "") {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json();
  }

  useEffect(() => {
    getDados(`http://localhost:3000/perfumes?nome=${busca}`).then((listaDePerfumes) => {
      setPerfumes(listaDePerfumes);
    });
  }, [busca]);

  const exibirItens = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.nome}</Text>
        <TouchableOpacity style={styles.botao} onPress={() => handleSaibaMais(item)}>
          <Text style={styles.botaoTexto}>Mais informações</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSaibaMais = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  }

  return (
    <ScrollView>
<View style={styles.container}>
      <Text style={styles.titulo}>Perfumes</Text>
      <View>
          <TextInput
            style={styles.campoBusca}
            label='Buscar ...'
            value={busca}
            onChangeText={setBusca}
            placeholder='Buscar...'
          />
      </View>
      <View style={styles.listaperfumes}>
        <FlatList
          data={dados}
          renderItem={exibirItens}
          keyExtractor={(item) => item.nome.toString()}
        />
      </View>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{selectedItem && selectedItem.nome}</Text>
          <Text style={styles.modalText}>{selectedItem && selectedItem.marca}</Text>
          <Text style={styles.modalText}>{selectedItem && selectedItem.data_criacao}</Text>

          <TouchableOpacity style={styles.botaoFechar} onPress={() => setShowModal(false)} >
            <Text style={styles.botaoTexto}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listacelulares: {
    height: 600
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#03363a',
    marginVertical: 30
  },
  campoBusca: {
    borderWidth:1,
    width: 200,
    borderRadius: 20,
    textAlign: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  itemText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  botao: {
    width: 100,
    backgroundColor: '#04534d',
    borderRadius: 20,
    paddingVertical: 10,
  },
  botaoFechar: {
    width: 100,
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
  }
});
