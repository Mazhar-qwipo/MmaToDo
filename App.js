import React, { useState } from 'react';
import { Alert, FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Header from './components/header';
import ToDoItem from './components/todoitem';
import AddTodo from './components/addTodo';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy cofee', key: '1' },
    { text: 'Create an app', key: '2' },
    { text: 'play on the switch', key: '3' },
    { text: 'MMA testing mma ', key: '4' },
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }
  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ];
      })
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 chars long.', [
        { text: 'Understood', onPress: () => console.log('Alert Closed') }
      ]);
    }

  }
  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
      console.log("Dismis Keyboard.");
    }}>

    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <ToDoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 40,
    backgroundColor:'pink',
    flex:1
  },
  list: {
    flex:1,
    backgroundColor:'yellow',
    marginTop: 20,
  }
});
