import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../Context/AuthContext";

const WelcomeHeader = () => {
  const { userData } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, {userData?.name || "Guest"}!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WelcomeHeader;
