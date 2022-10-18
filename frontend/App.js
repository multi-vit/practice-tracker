import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import ReviewPractices from "./components/ReviewPractices";

export default function App() {
  //console.log(`Status Bar is: ${StatusBar}`);
  return (
    <SafeAreaView style={styles.container}>
      <ReviewPractices />
      <ExpoStatusBar hidden={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
