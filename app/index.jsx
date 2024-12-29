import { useEffect, useRef, useState } from "react";
import { Animated, View, Text, Image, ImageBackground } from "react-native";
import { router, Redirect } from "expo-router";
import { images } from "../constants/images";
import { icons } from "../constants/icons";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../hoc/GlobalProvider";

const Welcome = () => {
  const { isLogged, loading, userExist } = useGlobalContext();
  const buttonAnimation = useRef(new Animated.Value(100)).current; // Initial position off-screen
  const [greeting, setGreeting] = useState("Good Afternoon");
  useEffect(() => {
    // Determine the current time and set the greeting
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
    // Start button animation
    Animated.timing(buttonAnimation, {
      toValue: 0, // Move buttons to their final position
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  }, []);

  const handleLogin = () => {
    router.push("/(tabs)");
  };
  useEffect(() => {
    if (isLogged && !loading) {
      router.push("(tabs)");
    } else if (userExist) {
      router.replace("/(auth)/alreadyloggedin");
    }
  }, [isLogged, loading, userExist]); // Monitor isLogged and loading

  return (
    <ImageBackground
      source={images.welcomeBg}
      resizeMode="cover"
      className="w-full h-full flex-1 justify-between pb-10"
    >
      {/* Header */}
      <View className="flex items-end p-5">
        <Image source={icons.chat} resizeMode="contain" />
      </View>

      {/* Welcome Text */}
      <View>
        <Image
          source={images.whitelogo}
          className="w-40 h-40 ml-auto mr-auto"
          resizeMode="contain"
        />
        <Text
          maxFontSizeMultiplier={1}
          className="text-white text-4xl font-ssemibold text-center"
        >
          Welcome to
        </Text>
        <Text
          maxFontSizeMultiplier={1}
          className="text-white text-4xl font-ssemibold text-center"
        >
          Equity mobile
        </Text>
        <Animated.View
          style={{
            transform: [{ translateY: buttonAnimation }],
          }}
        >
          <Text className="text-white text-center font-sregular mt-1">
            {greeting}! Sign in or register to continue
          </Text>
        </Animated.View>
      </View>

      {/* Animated Buttons */}
      <Animated.View
        style={{
          transform: [{ translateY: buttonAnimation }],
        }}
        className="w-[95%] ml-auto mr-auto gap-4 mt-5"
      >
        <CustomButton
          title={"Sign in"}
          handlePress={() => router.push("(auth)/sign-in")}
          btnColor={"bg-white"}
          textColor={"text-primary"}
        />
        <CustomButton
          title={"Register"}
          handlePress={() => router.push("(auth)/register")}
          btnColor={"bg-white"}
          textColor={"text-primary"}
        />
      </Animated.View>
    </ImageBackground>
  );
};

export default Welcome;
