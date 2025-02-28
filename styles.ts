import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,   
  },
  textInput: {
    minWidth: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
  }, 
  listView: {
    flexDirection: 'row',
    marginBottom: 5,
  }
});