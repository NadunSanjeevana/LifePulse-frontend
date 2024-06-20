import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { AuthContext } from "../Context/AuthContext";

const SignInScreen = ({ navigation }) => {
  const { googleLogin, setUser } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      const userInfo = await googleLogin();
      setUser(userInfo);
      navigation.replace("HomeTabs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <GoogleSigninButton onPress={handleGoogleSignIn} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SignInScreen;
