import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  Share,
  Linking,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { store } from "../firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation, route }) {
  const [link, setLink] = useState({});
  const getDownloads=async()=>{
    await AsyncStorage.getItem("firstTime").then(data=>{
      if(!data){
      getDoc(doc(store, "Download", "link")).then((data) => {
        const data2=data.data()
        
        setDoc(doc(store,"Download","link"),{
            download:data2.download+1,
        }).then(() => {
          AsyncStorage.setItem("firstTime","Done")
        })
      })}
    })
  }
  useEffect(() => {
    getDoc(doc(store, "Share", "link")).then((data) => {
      setLink(data.data());
      console.log(data.data());
    });
    getDownloads()
  
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/download.jpeg")}
      resizeMode="cover"
      imageStyle={{ opacity: 0.5 }}
    >
      <View
        style={{
          alignItems: "center",
          height: "30%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() => Share.share({ message: link.ShareLink })}
        >
          <View
            style={{
              alignItems: "center",
              width: 80,
              justifyContent: "center",
              height: 80,
              backgroundColor: "#000",
              borderRadius: 40,
            }}
          >
            <Image
              source={require("../assets/share.png")}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Share
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => Linking.openURL(link.TelegramLink)}
          >
            <View
              style={{
                alignItems: "center",
                width: 80,
                justifyContent: "center",
                height: 80,
                backgroundColor: "#000",
                borderRadius: 40,
              }}
            >
              <Image
                source={require("../assets/telegram-3-xxl.png")}
                style={{ height: "100%", width: "100%" }}
                resizeMode="cover"
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Join group
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: "30%", width: "100%" }}>
        <Image
          source={require("../assets/logo-removebg-preview-Copy.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Image
          source={require("../assets/play.png")}
          style={{ width: "40%", height: "40%" }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23404e",
  },
});
