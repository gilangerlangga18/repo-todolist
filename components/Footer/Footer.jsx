import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { s } from "./Footerstyle";

function Footer({ filterCompleted, filterNotCompleted, allTodo }) {
  return (
    <View style={s.container}>
      <TouchableOpacity style={s.button} onPress={allTodo}>
        <Text style={s.text}>All Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.button} onPress={filterCompleted}>
        <Text style={s.text}>Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.button} onPress={filterNotCompleted}>
        <Text style={s.text}>Proccess</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Footer;
