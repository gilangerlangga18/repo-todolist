import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  button: {
    backgroundColor: "#00B0FF",
    paddingHorizontal: 30,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
