import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { BASE_FONT_SIZE, paddingTop } from "../constants";
import { MotiView, Text } from "moti";
import { useState } from "react";
import getScrollIndex from "../utils/getScrollIndex";
import { Feather } from "@expo/vector-icons";

/* <View
      onTouchStart={e=> this.touchY = e.nativeEvent.pageY}
      onTouchEnd={e => {
        if (this.touchY - e.nativeEvent.pageY > 20)
          console.log('Swiped up')
      }}
      style={{height: 300, backgroundColor: '#ccc'}}
    /> */

// https://stackoverflow.com/questions/45854450/detect-swipe-left-in-react-native

export default function Onboarding({ navigation }: any) {
  const [viewing, setViewing] = useState(0);

  const data = [
    {
      title: "Type and get hired in films and TV shows.",
      src: require("../assets/Onboarding-1.png"),
    },
    {
      title: "Know your type, start working in films right away!",
      src: require("../assets/Onboarding-2.png"),
    },
    {
      title: "CastType into stardom like these industry stars.",
      src: require("../assets/Onboarding-3.png"),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <>
        {/* Back icon */}
        <TouchableOpacity onPress={navigation.goBack} style={styles.backIcon}>
          <Feather name="arrow-left" size={20} color={"#fff"} />
        </TouchableOpacity>

        {/* Containers */}
        <View>
          {/* Views */}
          <Animated.FlatList
            data={data}
            style={{
              backgroundColor: "#050503",
            }}
            onScroll={(event) => {
              const value = getScrollIndex(event, { horizontal: true });
              if (value < 0 || value > 6) return;
              setViewing(value / 3);
            }}
            horizontal
            pagingEnabled
            renderItem={({ item, index }) => {
              const correlates = viewing === index;
              return (
                <ImageBackground
                  source={data[index]?.src}
                  style={{
                    flex: 1,
                    height: Dimensions.get("screen").height,
                    width: Dimensions.get("screen").width,
                  }}
                >
                  <MotiView
                    style={{
                      maxWidth: Dimensions.get("screen")?.width - 48,
                      position: "absolute",
                      top: (64 / 100) * Dimensions.get("screen")?.height,
                      left: 24,
                      right: 24,
                    }}
                    animate={{
                      opacity: correlates ? 1 : 0,
                      translateX: correlates
                        ? 0
                        : -(Dimensions.get("screen").width / 3),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: BASE_FONT_SIZE * 2.2,
                        color: "#fff",
                        fontWeight: "200",
                        width: "80%",
                      }}
                    >
                      {item?.title}
                    </Text>
                  </MotiView>
                </ImageBackground>
              );
            }}
            keyExtractor={({ title }) => title}
          />

          {/* Footer */}
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop,
    backgroundColor: "#050503",
    paddingHorizontal: 24,
  },
  backIcon: {
    backgroundColor: "background: rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 12,
    position: "absolute",
    top: paddingTop + 20,
    left: 24,
    bottom: 0,
    right: 24,
    maxHeight: 48,
    maxWidth: 48,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
});
