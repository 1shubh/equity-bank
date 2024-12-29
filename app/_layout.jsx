import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import GlobalProvider from "../hoc/GlobalProvider";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, error] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.otf"),
    "SourceSansPro-Bold": require("../assets/fonts/SourceSansPro-Bold.ttf"),
    "SourceSansPro-LightItalic": require("../assets/fonts/SourceSansPro-LightItalic.ttf"),
    "SourceSansPro-Regular": require("../assets/fonts/SourceSansPro-Regular.ttf"),
    "SourceSansPro-Semibold": require("../assets/fonts/SourceSansPro-Semibold.ttf"),
    "xxSourceSansPro-LightItalic": require("../assets/fonts/xxSourceSansPro-LightItalic.ttf"),
    "SF-UI-Display-Bold": require("../assets/fonts/SF-UI-Display-Bold.otf"),
    "SF-UI-Display-Medium": require("../assets/fonts/SF-UI-Display-Medium.otf"),
    "SF-UI-Display-Regular": require("../assets/fonts/SF-UI-Display-Regular.otf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);
  if (!fontsLoaded) {
    return null;
  }
  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="transact" options={{ headerShown: false }} />
        <Stack.Screen name="westernunion" options={{ headerShown: false }} />
        <Stack.Screen name="sendto" options={{ headerShown: false }} />
        <Stack.Screen
          name="paymentconfirmation"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="verification" options={{ headerShown: false }} />
        <Stack.Screen name="myaccount" options={{ headerShown: false }} />
        <Stack.Screen name="success" options={{ headerShown: false }} />
        <Stack.Screen name="equity" options={{ headerShown: false }} />
        <Stack.Screen name="mobile-transfer" options={{ headerShown: false }} />
        <Stack.Screen name="bank-transfer" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
}
