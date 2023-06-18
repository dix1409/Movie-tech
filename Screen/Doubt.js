import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Linking,
  StatusBar,
} from "react-native";
import { collection, DocumentSnapshot, getDocs } from "firebase/firestore";
import { store } from "../firebase/firebaseConfig";
const { width, height } = Dimensions.get("window");
export default function Doubt(props) {
  const [Subjects, setSubjects] = useState([]);
  useEffect(() => {
    getDocs(collection(store, "Doubts")).then((docs) => {
      const data = [];
      docs.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      setSubjects(data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={Subjects}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: "white",
                padding: 5,
                borderRadius: 10,
                marginTop: 10,
                width: width * 0.9,
              }}
              onPress={() => {
                Linking.openURL(item.DoubtLink);
              }}
            >
              <Text>{item.id}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <StatusBar backgroundColor="white" barStyle={"dark-content"} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
