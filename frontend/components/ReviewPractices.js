import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function ReviewPractices({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [practices, setPractices] = useState([]);

  async function fetchPractices() {
    try {
      const response = await fetch("http://192.168.1.196:3000/api/practice");
      const json = await response.json();
      console.log(json.body);
      setPractices(json.body);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPractices();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: Dimensions.get("screen").height - 150,
          width: Dimensions.get("screen").width,
        }}
      >
        <Button
          style={styles.navButton}
          title='Add a practice'
          onPress={() => navigation.navigate("Add Practice")}
          accessibilityLabel='Go to Add Practices page'
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : practices.length > 0 ? (
          <FlashList
            data={practices}
            renderItem={({ item, index }) => (
              <View style={styles.box}>
                <Text style={styles.boxHeading}>Practice {index + 1}</Text>
                <Text>Date: {new Date(item.date).toDateString()}</Text>
                <Text>Minutes practiced: {item.length}</Text>
                <Text>What was practised: {item.practiced}</Text>
                {item.piece ? (
                  <>
                    <Text style={styles.boxSubHeading}>Piece details:</Text>
                    <Text>Composer: {item.piece.composer}</Text>
                    <Text>Title: {item.piece.title}</Text>
                  </>
                ) : null}
              </View>
            )}
            estimatedItemSize={155}
          />
        ) : (
          <Text>We have no practices to show you!</Text>
        )}
      </View>
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
  box: {
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 5,
    padding: 5,
    margin: 10,
  },
  pageHeading: {
    fontWeight: "bold",
    fontSize: 36,
  },
  boxHeading: {
    fontWeight: "bold",
    fontSize: 22,
  },
  boxSubHeading: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
