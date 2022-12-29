import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseRole from "./screens/ChooseRole";
import Onboarding from "./screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="chooseRole" component={ChooseRole} />
          <Stack.Screen name="onboarding" component={Onboarding} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050503",
  },
});
