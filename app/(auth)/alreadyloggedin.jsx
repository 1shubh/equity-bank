import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import { useRouter, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../hoc/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getInitials, getFirstName } from "../../constants/getInitialName";
import Loader from "../../components/Loader";

const Alreadyloggedin = () => {
  const { logout, isLogged, loading, login, error } = useGlobalContext();
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("Good Afternoon");
  const [password, setPassword] = useState("");
  const isFormValid = password.trim() !== "";
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("authToken"); // Replace '@storage_Key' with your key
      if (value !== null) {
        // Value exists
        // console.log("Retrieved value:", value);
        setUser(JSON.parse(value));
        // return JSON.parse(value); // If the value is a JSON string
      } else {
        console.log("No value found for the given key");
      }
    } catch (error) {
      // Error retrieving data
      console.error("Error reading value from AsyncStorage:", error);
    }
  };
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 16) {
      setGreeting("Good Afternoon");
    } else if (currentHour >= 16 && currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const handleLogin = async () => {
    await login(user?.user.mobileNumber, password);
  };
  // Redirect to tabs if logged in
  useEffect(() => {
    getData();
    if (isLogged && !loading) {
      router.push("(tabs)");
    }
  }, [isLogged, loading]); // Monitor isLogged and loading

  // console.log(user?.user.mobileNumber);
  return (
    <ImageBackground
      source={images.homebanner}
      resizeMode="cover"
      className="w-full h-full"
    >
      <KeyboardAvoidingView
        className="flex-1 justify-between pb-10"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex items-end p-5">
          <Image source={icons.chat} resizeMode="contain" tintColor={"black"} />
        </View>
        <View className="">
          <TouchableOpacity className="border-2 border-primary w-[60px] h-[60px] rounded-full flex-row items-center justify-center ml-auto mr-auto">
            <Text
              className="text-center text-3xl font-mregular text-primary"
              maxFontSizeMultiplier={1}
            >
              {getInitials(user?.user.name)}
            </Text>
          </TouchableOpacity>
          <Text
            className="text-black text-center font-ssemibold text-2xl mt-5"
            maxFontSizeMultiplier={1}
          >
            {greeting}! {getFirstName(user?.user.name)}
          </Text>
          <View className="px-8">
            <Text
              className="text-black font-ssemibold text-xl mt-5"
              maxFontSizeMultiplier={1}
            >
              Password
            </Text>
            <FormField
              title={"Password"}
              otherStyles={"gap-2"}
              placeholderTextcolor={"#a32e2d"}
              tintcolor={"#a32e2d"}
              placeholder={"Enter Password"}
              value={password}
              handleChangeText={setPassword} // Update password state
            />
            <Text
              className="text-[14px] ml-2 text-center font-mmedium mt-5 text-primary"
              maxFontSizeMultiplier={1}
            >
              Forgot your password?
            </Text>
            <Text
              className="text-[14px] ml-2 text-center font-mmedium mt-5 text-primary"
              maxFontSizeMultiplier={1}
            >
              {error && error}
            </Text>
          </View>
        </View>
        <View className="px-5 gap-5">
          <TouchableOpacity
            className="rounded-xl bg-white min-h-[50px] flex flex-row  justify-center gap-3 items-center border-2 border-primary"
            disabled
          >
            <Image
              source={icons.fingerprint}
              className="w-8 h-8 object-contain"
              tintColor={"#a32e2d"}
            />
            <Text className="text-2xl text-primary font-ssemibold">
              Sign in with Touch ID
            </Text>
          </TouchableOpacity>
          {/* login button */}
          {loading ? (
            <View className="h-[60px] flex items-center justify-center">
              <Loader />
            </View>
          ) : (
            <TouchableOpacity
              className={
                !isFormValid
                  ? "rounded-xl bg-[#d9d9d9] min-h-[50px] flex flex-row  justify-center gap-3 items-center"
                  : "rounded-xl bg-primary min-h-[50px] flex flex-row  justify-center gap-3 items-center"
              }
              disabled={!isFormValid}
              onPress={handleLogin}
            >
              <Text
                className={
                  !isFormValid
                    ? "text-2xl text-[#8e8e90] font-ssemibold"
                    : "text-2xl text-white font-ssemibold"
                }
              >
                Let me in
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default Alreadyloggedin;
