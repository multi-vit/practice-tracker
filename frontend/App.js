import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import ReviewPractices from "./components/ReviewPractices.js";
import AddPractice from "./components/AddPractice.js";

const Stack = createNativeStackNavigator();

export default function App() {
  //console.log(`Status Bar is: ${StatusBar}`);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Add Practice'>
        <Stack.Screen name='Review Practices' component={ReviewPractices} />
        <Stack.Screen name='Add Practice' component={AddPractice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
