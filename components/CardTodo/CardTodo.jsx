import { TouchableOpacity, Text, Image } from "react-native";
import checkImg from "../../assets/check.png";
import { s } from "./CardTodo.style";

const CardTodo = ({ todo, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(todo);
      }}
      onLongPress={() => {
        onLongPress(todo);
      }}
      style={s.card}
    >
      <Text
        style={[
          s.text,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.image} source={checkImg} />}
    </TouchableOpacity>
  );
};

export default CardTodo;
