import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export type GetScrollIndexParams = {
  horizontal?: boolean;
};

export default function getScrollIndex(
  event: NativeSyntheticEvent<NativeScrollEvent>,
  params?: GetScrollIndexParams
) {
  // vertical
  let yOffset = event.nativeEvent.contentOffset.y;
  let contentHeight = event.nativeEvent.contentSize.height;
  let value = Math.floor((yOffset / contentHeight) * 10);

  // horizontal
  let xOffset = event.nativeEvent.contentOffset.x;
  let contentWidth = event.nativeEvent.contentSize.width;
  let horizontalValue = Math.floor((xOffset / contentWidth) * 10);

  return params?.horizontal ? horizontalValue : value;
}
