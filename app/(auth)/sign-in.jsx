import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "../../constants/icons";
import { useRouter } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../hoc/GlobalProvider";

const Signin = () => {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Router for navigation
  const router = useRouter();

  // Context values
  const { login, loading, isLogged, error } = useGlobalContext();

  // Determine if the button should be enabled
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSignin = () => {
    login(email, password);
  };

  // Redirect to tabs if logged in
  useEffect(() => {
    if (isLogged && !loading) {
      router.push("(tabs)");
    }
  }, [isLogged, loading]); // Monitor isLogged and loading

  return (
    <View className="h-full w-full bg-[#231f1f] py-5">
      {/* Header */}
      <View className="w-full flex-row items-center justify-between pr-2">
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image
            source={icons.backArrowWhite}
            resizeMode="contain"
            className="w-10 h-10"
          />
        </TouchableOpacity>

        <Text
          className="text-white text-[18px] font-ssemibold"
          maxFontSizeMultiplier={1}
        >
          Welcome Back
        </Text>
        <Image source={icons.chat} />
      </View>

      {/* Text */}
      <View className="mt-5 flex-1 justify-between">
        {/* Sign In Form */}
        <View className="text-white px-3">
          <Text
            maxFontSizeMultiplier={1}
            className="text-white font-ssemibold text-2xl mt-2"
          >
            Hello there,
          </Text>
          <Text
            className="text-white font-mlight mt-1"
            maxFontSizeMultiplier={1}
          >
            Sign in to continue. Remember, your password is yours, do not share
            it with anyone.
          </Text>

          <FormField
            title={"Email address or mobile number"}
            otherStyles={"mt-5 gap-2"}
            placeholder={"Email address or mobile number"}
            value={email}
            placeholderTextcolor={"#ffff"}
            handleChangeText={setEmail} // Update email state
          />
          <FormField
            title={"Password"}
            otherStyles={"mt-5 gap-2"}
            placeholder={"Password"}
            placeholderTextcolor={"#ffff"}
            value={password}
            handleChangeText={setPassword} // Update password state
          />
          <Text
            className="text-[12px] ml-2 font-mmedium mt-5 text-secondary"
            maxFontSizeMultiplier={1}
          >
            Forgot your password?
          </Text>
          <Text
            className="text-[12px] ml-2 font-mmedium mt-5 text-primary text-center"
            maxFontSizeMultiplier={1}
          >
            {error && error}
          </Text>
        </View>

        {/* Submit Button */}
        <View className="border-2 border-border p-4 rounded-xl">
          <CustomButton
            title={"Sign in"}
            handlePress={handleSignin}
            disabled={!isFormValid} // Disable the button if the form is invalid
            btnColor={"bg-secondary"}
            textColor={"black"}
            isLoading={loading}
          />
        </View>
      </View>
    </View>
  );
};

export default Signin;
