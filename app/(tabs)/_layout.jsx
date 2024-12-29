import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View, Image } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { icons } from "../../constants/icons";
import { Stack } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar";
import { ThemedView } from "@/components/ThemedView";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="account" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
      <CustomTabBar />
    </>
  );
}
