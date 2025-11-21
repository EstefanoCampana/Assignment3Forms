import { StyleSheet, Text, View } from "react-native";
import SignIn from "./sign-in";

const LandingPage = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>簡単漢字</Text>
      <View>
        <SignIn/>
      </View>
    </View>
  );
}
export default LandingPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  }
})