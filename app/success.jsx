import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "../constants/icons";
import { router } from "expo-router";
import { useGlobalContext } from "../hoc/GlobalProvider";
import { useGlobalSearchParams } from "expo-router";
import { images } from "../constants/images";
import Feather from "@expo/vector-icons/Feather";

const otherOptions = [
  {
    title: "Download receipt",
    icon: "download",
    link: "",
  },
  {
    title: "Add to favourites",
    icon: "heart",
    link: "",
  },
  {
    title: "Schedule payment",
    icon: "calendar",
    link: "",
  },
];
const Success = () => {
  const { user } = useGlobalContext();
  const [date,setDate] = useState("")
  const [time,setTime] = useState("")
  const { amount, receipentName ,accountNumber} = useGlobalSearchParams();
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds timer
  const [isRunning, setIsRunning] = useState(true);
  // console.log(amount);
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false); // Stop the timer when it reaches 0
      // Redirect to the home screen
      // router.push("(tabs)"); // Adjust the path as needed
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

  useEffect(()=>{
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    setTime(time);
    setDate(date)
  })

  return (
    <View className="px-5 py-5 h-full bg-white">
      <View className="flex-row items-center justify-center">
        <Text
          className="text-black-100 font-ssemibold text-2xl text-center"
          maxFontSizeMultiplier={1}
        >
          Confirmed
        </Text>
      </View>
      <ScrollView>
        <Image source={images.confirm} className="ml-auto mr-auto" />
        <Text className="text-center font-sbold text-2xl">Great!</Text>
        <Text className="text-center font-sregular text-lighttext">
          Great Your transaction was successfull
        </Text>
        <View className="flex-row items-center justify-between mt-5 px-5 mb-10">
          {otherOptions.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="items-center w-[33%]"
                // onPress={() => router.push(ele.link)}
              >
                <View className="bg-disabledBG w-[40px] h-[40px] rounded-full object-contain p-2 items-center justify-center">
                  <Feather name={ele.icon} size={20} color="#a32e2d" />
                </View>

                <Text className="text-[15px] font-sregular mt-2 text-center">
                  {ele.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text
          className="text-md text-lighttext font-sregular"
          maxFontSizeMultiplier={1}
        >
          Transaction
        </Text>
        <Text className="text-xl font-ssemibold" maxFontSizeMultiplier={1}>
          {amount} KES
        </Text>
        <Text
          className="text-md text-lighttext mt-5 font-sregular"
          maxFontSizeMultiplier={1}
        >
          Charged
        </Text>
        <Text className="text-xl font-ssemibold" maxFontSizeMultiplier={1}>
          2.26 KES
        </Text>
        <Text
          className="text-md text-lighttext mt-5 font-sregular"
          maxFontSizeMultiplier={1}
        >
          Send to
        </Text>
        <Text className="text-xl font-ssemibold" maxFontSizeMultiplier={1}>
          {receipentName}
        </Text>
        <Text className="text-xl font-ssemibold" maxFontSizeMultiplier={1}>
          {accountNumber}
        </Text>
        <Text
          className="text-md text-lighttext mt-5 font-sregular"
          maxFontSizeMultiplier={1}
        >
          Sent From
        </Text>
        <Text className="text-xl font-ssemibold" maxFontSizeMultiplier={1}>
          {user?.user.name}
        </Text>
        <Text className="text-xl font-ssemibold" maxFontSizeMultiplier={1}>
          {user?.user.accountNumber} . Savings Account
        </Text>
        <Text
          className="text-md text-lighttext mt-5 font-sregular"
          maxFontSizeMultiplier={1}
        >
          Transaction reference
        </Text>
        <Text className="text-xl font-ssemibold" maxFontSizeMultiplier={1}>
          A4CE349A35C
        </Text>
        <Text
          className="text-md text-lighttext mt-5 font-sregular"
          maxFontSizeMultiplier={1}
        >
          Completed on
        </Text>
        <Text className="text-xl font-ssemibold" maxFontSizeMultiplier={1}>
          {date} {time}
        </Text>
      </ScrollView>
      {/* <View className="m-auto">
        <Image
          source={icons.icon_ok}
          className="w-40 h-40 object-contain ml-auto mr-auto"
        />
        <Text
          className="text-center text-3xl font-sbold border-b py-5 border-b-disabledBG"
          maxFontSizeMultiplier={1}
        >
          Payment Successful! {amount} KES has been sent to{" "}
          <Text className="text-primary">{receipentName}</Text>
        </Text>
        <Text
          className="text-center font-ssemibold text-2xl mt-5"
          maxFontSizeMultiplier={1}
        >
          Dear {user?.user.name}
        </Text>
        <Text className="text-center text-xl" maxFontSizeMultiplier={1}>
          Your online payment has been accepted
        </Text>
        <Text className="text-center mt-5 font-ssemibold">
          You will be redirected to the home screen in{" "}
          <Text className="text-red-500">{formatTime(timeLeft)}</Text>
        </Text>
      </View> */}
      <TouchableOpacity
        className={
          "rounded-xl bg-primary min-h-[50px] flex flex-row  justify-center gap-3 items-center mt-5"
        }
        onPress={()=>router.push("/")}
      >
        <Text className={"text-2xl text-white font-ssemibold"}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;
