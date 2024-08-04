import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Asset } from "expo-asset";
import { AuthContext } from "../Context/AuthContext";
import { AppGradient } from "../Components/AppGradient";
import colors from "../Shared/Colors";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const isRegistered = await register({ email, username, password });
    if (isRegistered) {
      navigation.navigate("MainTabs");
    } else {
      Alert.alert("Error", "Registration failed");
    }
  };

  const imageUri = Asset.fromModule(require("../Assets/Images/signin.png")).uri;

  return (
    <AppGradient>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Image
          source={{ uri: imageUri }} // Ensure this path is correct
          style={styles.image}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: colors.primary,
  },
  input: {
    width: 325,
    padding: 10,
    marginVertical: 10,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
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

export default RegisterScreen;
