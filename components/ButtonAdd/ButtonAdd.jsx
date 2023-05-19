import { TouchableOpacity, Text } from "react-native";
import { s } from "./ButtonAdd.style";

const ButtonAdd = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={s.button}>
      <Text style={s.text}>+ New todo</Text>
    </TouchableOpacity>
  );
};

export default ButtonAdd;
