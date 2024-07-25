// Components/AppGradient.js
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export const AppGradient = ({ children }) => {
  return (
    <LinearGradient colors={["#6AE08B", "#5A5A5A"]} style={styles.gradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
