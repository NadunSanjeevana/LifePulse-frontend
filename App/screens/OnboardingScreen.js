import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Asset } from "expo-asset";
import colors from "../Shared/Colors";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  const imageUri = Asset.fromModule(
    require("../Assets/Images/onboard.png")
  ).uri;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="contain"
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
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundShapes: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    color: colors.primary,
  },
  description: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    marginHorizontal: 48,
    marginBottom: 20,
    color: colors.primary,
  },
  button: {
    width: 325,
    height: 62,
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
});

export default OnboardingScreen;
