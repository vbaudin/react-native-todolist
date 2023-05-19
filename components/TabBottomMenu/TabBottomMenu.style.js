import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    backgroundColor: "white",
  },
});
