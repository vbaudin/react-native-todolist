import { Text, Image } from "react-native";
import { s } from "./Header.style";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <>
      <Image style={s.logo} source={logo} resizeMode="contain" />
      <Text style={s.tagline}>Tu as probablement un truc à faire</Text>
    </>
  );
};

export default Header;
