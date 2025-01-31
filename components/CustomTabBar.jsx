import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { router, usePathname } from "expo-router";

const CustomTabBar = () => {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <View className="flex-row justify-between h-[80px] items-center bg-white">
      <TouchableOpacity
        className="w-[35%]"
        onPress={() => router.push("/account")}
      >
        <View className="">
          <Image
            source={icons.account}
            className="w-12 h-12 m-auto object-contain"
            tintColor={pathname === "/account" ? "#a32e2d" : "#7b7b7b"}
          />
          <Text
            className="font-ssemibold text-center"
            style={{ color: pathname === "/account" ? "#a32e2d" : "#7b7b7b" }}
            maxFontSizeMultiplier={1}
          >
            Account & Cards
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="rounded-full absolute z-10 w-[100px] h-[100px] items-center justify-center bg-white bottom-5 right-[37%] p-2"
        onPress={() => router.push("/")}
      >
        <View className="border-2 border-primary w-[100%] h-[100%] items-center justify-center rounded-full">
          <Image
            source={images.tabicon}
            className="w-[80%] h-full object-cover"
            // tintColor={pathname !== "/" ? "#7b7b7b" : ""}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-[35%]"
        onPress={() => router.push("/edit-profile")}
      >
        <View className="items-center text-center">
          <Image
            source={icons.setting}
            className="w-10 h-10 m-auto"
            tintColor={pathname === "/edit-profile" ? "#a32e2d" : "#7b7b7b"}
          />
          <Text
            className="font-semibold text-center text-[#7b7b7b]"
            maxFontSizeMultiplier={1}
          >
            Settings
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;
