import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
  Alert,
  Button,
} from "react-native";

import { store } from "../firebase/firebaseConfig";
const { width, height } = Dimensions.get("window");
import * as ScreenOrientation from "expo-screen-orientation";

import VideoPlayer from "expo-video-player";

export default function SubjectDetails({ navigation, route }) {
  const [details, setdetails] = useState({});
  const [Url, setUrl] = useState("");
  const [Videos, setVideos] = useState([]);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [inFullscreen, setInFullsreen] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
    });
  }, [navigation]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(store, "Subjects", route.params.title, "Video"),
        orderBy("Time", "desc")
      ),
      (snapshot) => {
        const Video = [];
        snapshot.forEach((data) => {
          Video.push({ ...data.data(), id: data.id });
          // console.log(data.data());
        });
        setVideos(Video);
      }
    );
  }, []);
  // console.log(Videos);
  async function changeScreenOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.UNKNOWN);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {Videos.length == 0 ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Image
              source={{
                uri: "https://res.cloudinary.com/dz7xfhqxk/image/upload/v1671331030/Image/image-removebg-preview_ntpchq.png",
              }}
              style={{ width: "50%", height: 150 }}
            />
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                No Video Found!!
              </Text>
              <Text style={{ marginTop: 5, fontSize: 16 }}>
                Videos are coming soon...
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={Videos}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              // console.log(item);
              return (
                <>
                  {/* <Video
                    ref={video}
                    style={{
                      width: 350,
                      height: 220,
                    }}
                    source={{
                      uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                  /> */}

                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginLeft: 10,
                      height: height * 0.15,
                      // backgroundColor: "red",
                    }}
                    onPress={() => {
                      navigation.navigate("Video", {
                        title: item.VideoTitle,
                        url: item.VideoUrl,
                      });
                    }}
                  >
                    <Image
                      source={{ uri: item.ThumbnailUrl }}
                      style={{
                        width: width * 0.35,
                        height: height * 0.125,
                        marginRight: 15,
                        borderRadius: 10,
                      }}
                    />
                    <Text
                      style={{
                        maxWidth: width * 0.55,
                        marginRight: "auto",
                        fontSize: 20,
                      }}
                    >
                      {item.VideoTitle}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2eefe",
  },
});
