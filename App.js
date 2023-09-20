import { Alert, FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useEffect, useState } from "react";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [isShowAddDialog, setIsShowAddDialog] = useState(false);
  const [inputTodo, setInputTodo] = useState("");

  const [todoList, setTodoList] = useState([]);

  const [newList, setNewList] = useState([]);

  useEffect(() => {
    loadTodoList();
    setNewList(todoList);
  }, []);

  useEffect(() => {
    saveTodoList();
    setNewList(todoList);
  }, [todoList]);

  function renderTodoList() {
    return newList.map((todo) => {
      return (
        <View key={todo.id} style={s.cardItem}>
          <CardTodo onPress={updateTodo} todo={todo} onLongPress={deteleTodo} />
        </View>
      );
    });
  }

  function updateTodo(todo) {
    const updateTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const updateTodoList = [...todoList];

    //  const angkaRandom = [{"id":1 },{"id":2 },{"id":3 }]

    //  const filterAngka = angkaRandom.filter((angka)=> angka.id%2===0);

    // const angkaYgDiPilih =  angkaRandom.findIndex((angka)=> angka.id=== 3);

    //console.log(angkaYgDiPilih);

    const indexToUpdate = updateTodoList.findIndex(
      (todo) => todo.id === updateTodo.id
    );

    updateTodoList[indexToUpdate] = updateTodo;

    setTodoList(updateTodoList);
  }

  function deteleTodo(todoDelete) {
    Alert.alert("Hapus", "Apakah anda yakin ingin menghapus data ini?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoDelete.id));
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function filterCompleted() {
    setNewList(todoList.filter((todo) => todo.isCompleted === true));
  }
  function filterNotCompleted() {
    setNewList(todoList.filter((todo) => todo.isCompleted === false));
  }
  function allTodo() {
    setNewList(todoList);
  }

  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={isShowAddDialog}
        onBackdropPress={() => setIsShowAddDialog(false)}
      >
        <Dialog.Title>Tambah Todo</Dialog.Title>
        <Dialog.Description>Apa yang ingin kamu lakukan?.</Dialog.Description>
        <Dialog.Input
          onChangeText={setInputTodo}
          placeholder="Mis : Mandi dan gosok gigi"
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => setIsShowAddDialog(false)}
        />
        <Dialog.Button
          disabled={inputTodo.length === 0}
          label="Save"
          onPress={addTodo}
        />
      </Dialog.Container>
    );
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputTodo,
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]);
    setIsShowAddDialog(false);
    setInputTodo("");
  }

  async function saveTodoList() {
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (error) {
      console.log(error);
    }
  }

  async function loadTodoList() {
    try {
      const todolistString = await AsyncStorage.getItem("@todoList");
      const parsedTodoList = JSON.parse(todolistString);
      setTodoList(parsedTodoList);
      setNewList(parsedTodoList);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            {/* <FlatList
         data = {todoList}
         renderItem={({item}) => <CardTodo todo={item} />}
          keyExtractor={item => item.id}>
        </FlatList> */}

            <ScrollView>{renderTodoList()}</ScrollView>

            <ButtonAdd onPress={() => setIsShowAddDialog(true)} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Footer
          filterCompleted={filterCompleted}
          filterNotCompleted={filterNotCompleted}
          allTodo={allTodo}
        />
      </View>
      {renderAddDialog()}
    </>
  );
}
