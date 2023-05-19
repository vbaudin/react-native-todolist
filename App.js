import R from "ramda";
import { useEffect, useState } from "react";
import { TABS } from "./constants";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Alert, ScrollView, Text, View } from "react-native";
import { v4 as uuid } from "uuid";
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s } from "./App.style";

import Header from "./components/Header/Header";
import CardTodo from "./components/CardTodo/CardTodo";
import TabBottomMenu from "./components/TabBottomMenu/TabBottomMenu";
import ButtonAdd from "./components/ButtonAdd/ButtonAdd";
import DialogContainer from "react-native-dialog/lib/Container";

let isFirstRender = true;
let isLoadUpdate = false;

const App = () => {
  const [selectedTab, setSelectedTab] = useState(TABS.all);
  const [todoList, setTodoList] = useState([]);
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);

  const saveTodoList = async () => {
    try {
      console.log("save");
      await AsyncStorage.setItem("@todolist", JSON.stringify(todoList));
    } catch (e) {
      alert("Erreur " + e);
    }
  };

  const loadTodoList = async () => {
    try {
      console.log("load");
      const stringifiedTodoList = await AsyncStorage.getItem("@todolist");
      if (stringifiedTodoList !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (e) {
      alert("Erreur " + e);
    }
  };

  const getFilteredList = () => {
    switch (selectedTab) {
      case TABS.all:
        return todoList;
      case TABS.inProgress:
        return R.filter((todoList) => {
          return !todoList.isCompleted;
        })(todoList);
      case TABS.done:
        return R.filter((todoList) => {
          return todoList.isCompleted;
        })(todoList);
      default:
        return 0;
    }
  };
  const filteredList = getFilteredList();

  const updateTodo = (todo) => {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const indexToUpdate = R.findIndex(R.propEq(updatedTodo.id, "id"), todoList);

    const updatedTodoList = [...todoList];
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  };

  const deleteTodo = (todoToDelete) => {
    Alert.alert("Suppression", "Supprimer cette tache ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(R.filter((todo) => todo !== todoToDelete)(todoList));
        },
      },
      { text: "Annuler", style: "cancel" },
    ]);
  };

  const renderTodoList = () => {
    return R.map(
      (todo) => (
        <View style={s.cardItem} key={todo.id}>
          <CardTodo onPress={updateTodo} onLongPress={deleteTodo} todo={todo} />
        </View>
      ),
      filteredList
    );
  };

  const showAddDialog = () => {
    setIsAddDialogVisible(true);
  };

  const addTodo = () => {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogVisible(false);
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView style={s.container}>{renderTodoList()}</ScrollView>
          </View>
          <ButtonAdd onPress={showAddDialog} />
        </SafeAreaView>
      </SafeAreaProvider>
      <TabBottomMenu
        todoList={todoList}
        selectedTab={selectedTab}
        onPress={setSelectedTab}
      />
      <DialogContainer
        visible={isAddDialogVisible}
        onBackdropPress={() => setIsAddDialogVisible(false)}
      >
        <Dialog.Title>Créer une tâche</Dialog.Title>
        <Dialog.Description>
          Choisi un nom pour la nouvelle tâche
        </Dialog.Description>
        <Dialog.Input onChangeText={setInputValue} />
        <Dialog.Button
          disabled={inputValue.trim().length === 0}
          label="Créer"
          onPress={addTodo}
        />
      </DialogContainer>
    </>
  );
};

export default App;
