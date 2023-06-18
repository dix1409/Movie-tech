import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SubjectDetails from "./Screen/SubjectDetails";
import HomeScreen from "./Screen/HomeScreen";

import VideoScreen from "./Screen/VideoScreen";
import Home from "./Screen/Home";
import Doubt from "./Screen/Doubt";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SubjectDetails" component={SubjectDetails} />
        <Stack.Screen name="Video" component={VideoScreen} />
        <Stack.Screen
          name="Doubt"
          component={Doubt}
          options={{ headerTitle: "Ask Doubt" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
