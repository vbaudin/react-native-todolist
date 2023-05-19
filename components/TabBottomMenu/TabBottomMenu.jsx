import R from "ramda";

import { TouchableOpacity, Text, View } from "react-native";

import { TABS } from "../../constants";

import { s } from "./TabBottomMenu.style";

const TabBottomMenu = ({ todoList, selectedTab, onPress }) => {
  const setSelectedTab = (newTab) => {
    onPress(newTab);
  };

  const getTextStyle = (tabName) => {
    return {
      fontWeight: "bold",
      color: tabName === selectedTab ? "#2F76E5" : "black",
    };
  };

  const countByStatus = {
    all: R.reduce((acc) => {
      return acc + 1;
    })(0, todoList),
    inProgress: R.reduce((acc, todo) => {
      return !todo.isCompleted ? acc + 1 : acc;
    })(0, todoList),
    done: R.reduce((acc, todo) => {
      return todo.isCompleted ? acc + 1 : acc;
    })(0, todoList),
  };

  return (
    <View style={s.container}>
      <TouchableOpacity
        onPress={() => {
          onPress(TABS.all);
        }}
      >
        <Text style={getTextStyle(TABS.all)}>All ({countByStatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onPress(TABS.inProgress);
        }}
      >
        <Text style={getTextStyle(TABS.inProgress)}>
          In Progress ({countByStatus.inProgress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onPress(TABS.done);
        }}
      >
        <Text style={getTextStyle(TABS.done)}>Done ({countByStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBottomMenu;
