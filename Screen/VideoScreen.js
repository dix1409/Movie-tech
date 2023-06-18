import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import { Video } from "expo-av";
const { width, height } = Dimensions.get("window");
import * as ScreenOrientation from "expo-screen-orientation";
import Webview from "react-native-webview";
export default function VideoScreen({ navigation, route }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [inFullscreen, setInFullsreen] = useState(false);
  const [url, setUrl] = React.useState(route.params.url);
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
    });
  }, [navigation]);

 

  return (
    <View style={styles.container}>
      {/* {isPreloading ? (
          <ActivityIndicator
            animating
            color={"gray"}
            size="large"
            style={{ flex: 1, position: "absolute", top: "50%", left: "45%" }}
          />
        ) : (
          <Video
            ref={video}
            style={{
              width: width,
              height: 220,
            }}
            source={{
              uri: url,
            }}
            onLoadStart={() => setIsPreloading(true)}
            useNativeControls
            onReadyForDisplay={() => setIsPreloading(false)}
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            onFullscreenUpdate={() => {
              ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE
              );
            }}
          />
        )} */}
      <Webview
        style={{ flex: 1 }}
        source={{ uri: url }}
        allowsFullscreenVideo={true}
        allowFileAccess={false}
        mixedContentMode="always"
        mediaPlaybackRequiresUserAction={true}
        injectedJavaScript={`document.getElementsByTagName("video")[0].controlsList="nodownload";`}
        startInLoadingState={true}
        javaScriptEnabled
        domStorageEnabled
        // onLoadStart={() => setIsPreloading(true)}
        onLoadEnd={() => setIsPreloading(false)}
      />
      {isPreloading && (
        <ActivityIndicator
          animating
          color={"gray"}
          size="large"
          style={{ flex: 1, position: "absolute", top: "50%", left: "45%" }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
