import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapes}>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
      </View>
      <Image
        source={require("../Assets/Images/onboard.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Balancing life, unlocking potential.</Text>
      <Text style={styles.description}>
        Empowering individuals to achieve harmony between their professional and
        personal lives through innovative and user-friendly solutions.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundShapes: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  circle1: {
    width: 290,
    height: 270,
    backgroundColor: "rgba(106, 224, 139, 0.49)",
    borderBottomLeftRadius: 145,
    borderBottomRightRadius: 145,
    position: "absolute",
    right: 116,
    top: -109,
  },
  circle2: {
    width: 290,
    height: 270,
    backgroundColor: "rgba(106, 224, 139, 0.49)",
    borderTopLeftRadius: 145,
    borderTopRightRadius: 145,
    position: "absolute",
    right: 115,
    top: 0,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    color: "rgba(0, 0, 0, 0.75)",
  },
  description: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    marginHorizontal: 48,
    marginBottom: 20,
    color: "rgba(0, 0, 0, 0.74)",
  },
  button: {
    width: 325,
    height: 62,
    backgroundColor: "#6AE08B",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default OnboardingScreen;
