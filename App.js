// Gavin Stuart
// iOS and Android App Development project

import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import CalculatorScreen from "./screens/CalculatorScreen";
import { useFonts } from "expo-font";

const App = () => {
  //load font
  const [loaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  //useEffect to check if the font is loaded
  useEffect(() => {
    if (!loaded) {
      return;
    }
  }, [loaded]);

  //return the calculator screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <CalculatorScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    backgroundColor: "#202020",
  },
});

export default App;
