import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { AppGradient } from "../Components/AppGradient"; // Ensure this is the correct path

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
          <Button title="Sign In" onPress={handleSignIn} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
});

export default SignInScreen;
