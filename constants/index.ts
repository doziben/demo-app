import { Dimensions } from "react-native";
import Constants from "expo-constants";

export const BASE_FONT_SIZE = Math.floor(Dimensions.get("screen").width / 24);
export const GREY_TEXT = "#949493";
export const paddingTop = Constants.statusBarHeight + 20;
