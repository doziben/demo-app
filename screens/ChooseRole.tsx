import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MotiView } from "moti";
import Performer from "../assets/icons/Performer";
import Filmmaker from "../assets/icons/Filmmaker";
import Organisation from "../assets/icons/Organisations";
import { BASE_FONT_SIZE, GREY_TEXT, paddingTop } from "../constants";
import getScrollIndex from "../utils/getScrollIndex";
import useToggle from "../hooks/useToggle";

const data = [
  {
    title: "Performer",
    description: "Actor, actress, voice actor, stunt person...",
    color: "#FFCB3C",
    icon: {
      default: <Performer color={GREY_TEXT} />,
      active: <Performer />,
    },
  },
  {
    title: "Filmmaker",
    description: "Director, Producer, Casting...",
    color: "#4BC270",
    icon: {
      default: <Filmmaker color={GREY_TEXT} />,
      active: <Filmmaker />,
    },
  },
  {
    title: "Organization",
    description: "Acting School, Photographer...",
    color: "#246DA8",
    icon: {
      default: <Organisation color={GREY_TEXT} />,
      active: <Organisation />,
    },
  },
];

export default function ChooseRole(props: any) {
  const { navigation } = props;
  const value = useState(new Animated.Value(0))[0];
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const [selected, setSelected] = useState(-1);
  const [loading, toggleLoading] = useToggle();

  function moveBall() {
    Animated.timing(value, {
      toValue: 1,
      useNativeDriver: false,
      duration: 1000,
    }).start();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text
        style={{
          fontSize: BASE_FONT_SIZE * 2.2,
          color: "#fff",
          fontWeight: "200",
        }}
        adjustsFontSizeToFit
      >
        What do you want {"\n"} to sign up as?
      </Text>

      <View
        style={{
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && (
          <ActivityIndicator color={data[index]?.color} size={"large"} />
        )}
      </View>

      {/* FlatList */}
      <Animated.FlatList
        ref={ref}
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: "50%",
          maxHeight: Dimensions.get("screen").height / 3,
        }}
        onScroll={(event) => {
          let value = getScrollIndex(event);
          value >= 4 ? (value = 2) : (value = value);
          value < 0 ? (value = 0) : (value = value);
          setIndex(Math.floor(value));
        }}
        data={data}
        renderItem={({ item, index: i }) => {
          const isActive = i === index;
          const isSelected = selected === i;

          function handleProceed() {
            toggleLoading();
            setTimeout(() => {
              toggleLoading();
              navigation?.navigate("onboarding");
            }, 2000);
          }

          function handleSelect() {
            isSelected ? handleProceed() : setSelected(i);
          }

          return (
            <TouchableOpacity onPress={handleSelect}>
              <MotiView
                style={{
                  backgroundColor: "#292928",
                  position: "relative",
                  padding: 20,
                  marginBottom: BASE_FONT_SIZE,
                  height: Dimensions.get("screen").height / 6,
                  flexDirection: "row",
                  overflow: "hidden",
                  borderColor: "white",
                  borderWidth: 1,
                }}
                animate={{
                  scaleX: isActive ? 1 : 0.95,
                  opacity: isActive ? 1 : 0.5,
                  borderWidth: isSelected ? 2 : 0,
                  borderColor: isSelected ? item?.color : "",
                  borderRadius: BASE_FONT_SIZE,
                }}
              >
                {/* Text Wrapper */}
                <View>
                  <Text
                    style={{
                      fontSize: BASE_FONT_SIZE * 1.2,
                      color: isActive ? "#fff" : GREY_TEXT,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: "#949493",
                      fontSize: BASE_FONT_SIZE,
                      width: "50%",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>

                {/* Icon */}
                <View
                  style={{
                    position: "absolute",
                    right: -BASE_FONT_SIZE,
                  }}
                >
                  {isActive ? item?.icon?.active : item?.icon?.default}
                </View>
              </MotiView>
            </TouchableOpacity>
          );
        }}
        keyExtractor={({ title }) => title}
      />

      <Text
        style={{
          color: GREY_TEXT,
          textAlign: "center",
          position: "absolute",
          left: "43%",
          bottom: "12%",
        }}
      >
        Tap a category {"\n"}
        twice to proceed
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050503",
    paddingTop,
    paddingHorizontal: 24,
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "red",
  },
});
