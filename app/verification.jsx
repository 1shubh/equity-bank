import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import React, { useState, useEffect } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { images } from "../constants/images";
import { icons } from "../constants/icons";
import { useGlobalContext } from "../hoc/GlobalProvider";
import Loader from "../components/Loader";

const Verification = () => {
  const { user } = useGlobalContext();
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3 minutes in seconds
  const [isRunning, setIsRunning] = useState(true);
  const { transactionInfo } = useGlobalSearchParams();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [hasValidated, setHasValidated] = useState(false);

  const transactionDetails = JSON.parse(transactionInfo);
  // console.log(parsedDetails?.parsedDetails.recipentDetails.AccountNumber);
  function maskMobileNumber(number) {
    const numberStr = number.toString(); // Convert to string if it's not already
    return numberStr.slice(0, 2) + "******" + numberStr.slice(-2);
  }

  useEffect(() => {
    // Simulate OTP autofill after 10 seconds
    const timer = setTimeout(() => {
      const autoFilledOtp = "123456"; // Example OTP
      setOtp(autoFilledOtp);
      if (!hasValidated) {
        validateOtp(autoFilledOtp);
        confirmTransfer();
      }
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [hasValidated]);

  const confirmTransfer = async (otp) => {
    setLoading(true); // Show loading indicator
    try {
      // Proceed with the transfer logic using OTP
      const response = await fetch(
        "https://bank-backend-1-4cqz.onrender.com/api/users/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(transactionDetails.amount),
            recipientAccountNumber:
              transactionDetails?.parsedDetails.recipentDetails.AccountNumber,
            mobileNumber: user?.user.mobileNumber, // Sender's mobile number
            sendToDetails: transactionDetails,
          }),
        }
      );
      // Handle the response
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data)
      if (data?.message) {
        // router.push("/success")
        console.log("route");
        handleRoute();
      } else {
        Alert.alert("Error", "Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while processing the transfer.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const validateOtp = (filledOtp) => {
    if (hasValidated) return; // Prevent further calls after validation
    if (filledOtp === "123456") {
      setHasValidated(true); // Mark as validated
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  const handleRoute = () => {
    router.replace({
      pathname: "success",
      params: {
        amount: transactionDetails.amount,
        receipentName: `${transactionDetails?.parsedDetails.recipentDetails.firstname} ${transactionDetails?.parsedDetails.recipentDetails.lastName}`,
        accountNumber: `${transactionDetails?.parsedDetails.recipentDetails.AccountNumber}`,
      },
    });
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false); // Stop the timer when it reaches 0
    }
    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, [isRunning, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <View className="items-center justify-center h-full">
        <Loader size={200} />
      </View>
    );
  }

  return (
    <View className=" bg-white h-full justify-between">
      <View className="flex-row items-center justify-between px-5 py-5">
        <TouchableOpacity className="" onPress={() => router.back()}>
          <Image
            source={icons.back}
            className="w-10 h-10"
            tintColor={"#a32e2d"}
          />
        </TouchableOpacity>
        <Text
          className="text-black-100 font-ssemibold text-2xl text-center"
          maxFontSizeMultiplier={1}
        >
          Verify
        </Text>
        <TouchableOpacity className="rounded-full p-2"></TouchableOpacity>
      </View>
      <View>
        <Image source={images.varification} className="ml-auto mr-auto" />
        <Text
          className="text-2xl font-ssemibold w-[80%] m-auto text-center"
          maxFontSizeMultiplier={1}
        >
          We have sent a verification code to{" "}
          {maskMobileNumber(user?.user.mobileNumber)}
        </Text>
        <Text
          className="font-sregular mt-3 text-center text-lighttext"
          maxFontSizeMultiplier={1}
        >
          Please enter the code below
        </Text>
        <View className="px-10 mt-5">
          <OtpInput
            numberOfDigits={6}
            focusColor="#a32e2d"
            autoFocus={false}
            hideStick={true}
            placeholder=""
            blurOnFilled={true}
            disabled={false}
            type="numeric"
            secureTextEntry={true}
            focusStickBlinkingDuration={500}
            value={otp}
            onFocus={() => console.log("Focused")}
            onBlur={() => console.log("Blurred")}
            onTextChange={(text) => setOtp(text)}
            onFilled={(text) => validateOtp(text)}
            textInputProps={{
              accessibilityLabel: "One-Time Password",
            }}
          />
          <Text className="text-center mt-5 font-ssemibold">
            Your code expires in {formatTime(timeLeft)}
          </Text>
        </View>
      </View>
      {/* button */}
      <View className="p-5">
        <TouchableOpacity className="rounded-xl border-primary border-2 bg-white min-h-[60px] flex flex-row  justify-center gap-3 items-center mt-5">
          <Text
            className="text-2xl font-ssemibold text-primary"
            maxFontSizeMultiplier={1}
          >
            Need help?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verification;
