import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { router } from "expo-router";
const CustomTabBar = () => {
  return (
    <View className="flex-row justify-between h-[80px] items-center bg-white">
      <TouchableOpacity
        className="w-[30%]"
        onPress={() => router.push("/myaccount")}
      >
        <View className="">
          <Image source={icons.account} className="w-8 h-8 m-auto object-contain" tintColor={"#7b7b7b"}/>
          <Text className="font-mmedium text-center text-[#7b7b7b]">Account & Cards</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className=" rounded-full absolute z-10 w-[120px] h-[120px] items-center justify-center bg-white bottom-2 right-[37%] p-2"
        onPress={() => router.push("/")}
      >
        <View className="border-2 border-primary w-[100%] h-[100%] items-center justify-center rounded-full">
          <Image
            source={images.tabicon}
            className="w-[80%] h-full object-cover"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-[30%]"
        onPress={() => router.push("/edit-profile")}
      >
        <View className="items-center text-center">
          <Image
            source={icons.setting}
            className="w-8 h-8 m-auto"
            tintColor={"#7b7b7b"}
          />
          <Text className="font-mmedium text-center text-[#7b7b7b]">Settings</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;
