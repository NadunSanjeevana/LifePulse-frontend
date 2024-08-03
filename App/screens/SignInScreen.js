import React, { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { AppGradient } from "../Components/AppGradient"; // Ensure this is the correct path
import colors from "../Shared/Colors";

const { width, height } = Dimensions.get("window");

const SignInScreen = ({ navigation }) => {
  const { signIn, loading, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    const isSignIn = await signIn({ email, password });
    if (isSignIn) {
      navigation.navigate("MainTabs");
    } else {
      Alert.alert("Error", "Email or Password Incorrect");
    }
  };

  return (
    <AppGradient>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <Image
          source={require("../Assets/Images/signin.png")} // Ensure this path is correct
          style={styles.image}
          resizeMode="contain"
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
        {error && <Text style={styles.error}>{error}</Text>}
        {loading ? (
          <ActivityIndicator size="large" color="#6AE08B" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
  error: {
    color: "red",
    marginVertical: 10,
  },
});

export default SignInScreen;
