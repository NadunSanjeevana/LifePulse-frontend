// Components/AppGradient.js
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import colors from "../Shared/Colors";

export const AppGradient = ({ children }) => {
  return (
    <LinearGradient
      colors={[colors.orange, colors.white]}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
