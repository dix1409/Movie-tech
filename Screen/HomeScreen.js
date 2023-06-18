import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { collection, onSnapshot } from "firebase/firestore";
import { store } from "../firebase/firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [Subject, setSubject] = useState([]);
  const [SubjectName, setSubjectName] = useState("");

  useEffect(() => {
    onSnapshot(collection(store, "Subjects"), (snapshot) => {
      const Sub = [];
      snapshot.forEach((data) => {
        Sub.push(data.data());
      });

      setSubject(Sub);
    });
  }, []);
  const ImgOpacity =
    "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1671258109/Image/hand-drawn-science-education-background_23-2148496142_uidknn.webp";

  return (
    <SafeAreaView style={styles.container}>
      {Subject.length == 0 ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Image
            source={require("../assets/image-removebg-preview.png")}
            style={{ width: "50%", height: 150 }}
          />
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              No Channel Found!!
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            data={Subject}
            style={{ flex: 1, width: "100%" }}
            keyExtractor={(val, index) => index}
            renderItem={({ item }) => {
              return (
                <ImageBackground
                  style={{
                    width: "95%",
                    height: 150,
                    marginLeft: "5%",
                    marginTop: 10,
                    borderRadius: 20,
                    overflow: "visible",
                  }}
                  imageStyle={{
                    borderRadius: 15,
                    opacity: item.ImgUrl === ImgOpacity ? 0.5 : 1,
                  }}
                  source={{
                    uri: item.ImgUrl,
                  }}
                >
                  <TouchableOpacity
                    style={{ width: "100%", height: "100%" }}
                    onPress={() =>
                      navigation.navigate("SubjectDetails", {
                        title: item.SubjectName,
                      })
                    }
                    activeOpacity={1}
                  >
                    <Text
                      style={{
                        paddingHorizontal: 25,
                        paddingTop: 10,
                        fontSize: 22,
                        color: "#fff",
                        textAlign: "center",
                        borderBottomColor: "black",
                        // borderBottomWidth:1
                      }}
                    >
                      {item.SubjectName}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              );
            }}
          />
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fda800",
  },
  panel: {
    paddingHorizontal: 20,
    paddingBottom: 20,

    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
    marginBottom: "auto",
    alignItems: "center",
  },
});
