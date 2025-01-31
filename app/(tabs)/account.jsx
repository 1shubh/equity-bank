import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { useGlobalContext } from "@/hoc/GlobalProvider";
import { formatBalance, getInitials } from "../../constants/getInitialName";
import { useEffect, useState } from "react";
import { router, useRouter } from "expo-router";

const Account = () => {
  const { login, loading, isLogged, error, user, logout } = useGlobalContext();
  const [greeting, setGreeting] = useState("Good Afternoon");
  const [showbalance, setShowbalance] = useState(true);
  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else if (currentHour >= 18 && currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  // console.log(user.user);
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  function getFirstName(fullName) {
    // Split the name by spaces and return the first part
    return fullName.split(" ")[0];
  }
  return (
    <ImageBackground
      source={images.homebanner}
      resizeMode="cover"
      className="w-full h-full"
    >
      <View className="px-5 py-5">
        {/* user details  */}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="border-2 border-primary w-[50px] h-[50px] rounded-full flex-row items-center justify-center">
            <Text
              className="text-center text-xl font-mregular text-primary"
              maxFontSizeMultiplier={1}
            >
              {getInitials(user?.user.name)}
            </Text>
          </TouchableOpacity>
          <Text
            className="text-black-100 font-ssemibold text-2xl text-center"
            maxFontSizeMultiplier={1}
          >
            Account
          </Text>
          <TouchableOpacity className="rounded-full p-2 bg-white">
            <Image
              source={icons.notification}
              className="w-10 h-10"
              tintColor={"#a32e2d"}
            />
          </TouchableOpacity>
        </View>
        {/* scrollView */}
        <ScrollView showsVerticalScrollIndicator={false} className="h-full">
          {/* balance show view */}

          <View className="rounded-2xl bg-white border-2 border-[#f0f0f0] mt-5">
            <View
              className={
                showbalance
                  ? "py-5 flex-row items-center justify-between px-5"
                  : "py-5 flex-row items-center justify-between px-5 border-dashed border-b-2 border-b-[#f0f0f0]"
              }
            >
              <Text
                className="text-2xl font-ssemibold"
                maxFontSizeMultiplier={1}
              >
                My Balance
              </Text>
              <View className="flex-row items-center gap-2">
                <Text
                  className="text-xl font-ssemibold text-primary"
                  maxFontSizeMultiplier={1}
                >
                  {showbalance ? "Show Balance" : `Hide balance`}
                </Text>
                <TouchableOpacity onPress={() => setShowbalance(!showbalance)}>
                  <Image
                    source={showbalance ? icons.eye : icons.eyeHide}
                    tintColor={"#a32e2d"}
                    className="w-7 h-7 object-contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {!showbalance && (
              <View className="px-5 py-5">
                <View className="flex-row w-[20%]">
                  <Text
                    className="text-3xl font-ssemibold text-primary"
                    maxFontSizeMultiplier={1}
                  >
                    KES
                  </Text>
                  <Image source={icons.downbalnce} className="object-contain" />
                </View>

                <View className="flex-row items-center">
                  <View className="w-1/2">
                    <Text
                      className="text-xl text-lighttext font-sregular"
                      maxFontSizeMultiplier={1}
                    >
                      You have
                    </Text>
                    <View className="flex-row items-center gap-1">
                      <Image
                        source={icons.arrowupbalance}
                        className="w-7 h-7 object-contain"
                        tintColor={"#a32e2d"}
                      />
                      <Text
                        className="text-xl font-ssregular"
                        maxFontSizeMultiplier={1}
                      >
                        {formatBalance(user?.user.balance)}
                      </Text>
                    </View>
                  </View>
                  <View className="w-1/2">
                    <Text
                      className="text-xl text-lighttext font-sregular"
                      maxFontSizeMultiplier={1}
                    >
                      You Owe
                    </Text>
                    <View className="flex-row items-center gap-1">
                      <Image
                        source={icons.arrowdownbalance}
                        className="w-7 h-7 object-contain"
                        tintColor={"#a32e2d"}
                      />
                      <Text
                        className="text-xl font-ssregular"
                        maxFontSizeMultiplier={1}
                      >
                        0.00
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
          {/* other options */}
          {/* my account */}
          <View className="mt-5 flex-row items-center justify-between px-2">
            <Text className="text-2xl font-ssemibold" maxFontSizeMultiplier={1}>
              My accounts
            </Text>
            <TouchableOpacity onPress={() => router.push("/myaccount")}>
              <Text
                className="text-xl font-ssemibold text-primary"
                maxFontSizeMultiplier={1}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-[200px] mt-5 overflow-hidden rounded-3xl">
            <ImageBackground
              source={images.redBg}
              className="w-full h-full py-5 px-5 flex-2 justify-between"
              resizeMode="cover"
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text
                    className="text-white font-sregular text-xl"
                    maxFontSizeMultiplier={1}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {user?.user.name}
                  </Text>
                  <Text
                    className="text-white font-sregular text-2xl"
                    maxFontSizeMultiplier={1}
                  >
                    {formatBalance(user?.user.balance)} KES
                  </Text>
                </View>
                <TouchableOpacity className="bg-white rounded-full p-2">
                  <Image
                    source={icons.iconMore}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  className="text-white font-sregular text-md"
                  maxFontSizeMultiplier={1}
                >
                  {user?.user.accountNumber} . Savings Account
                </Text>
              </View>
            </ImageBackground>
          </View>
          {/* exchange rate calculator */}
          <View className="border-2 border-[#f0f0f0] mt-5 bg-white rounded-2xl p-5 flex-row items-center justify-between">
            <View className="rounded-full w-[50px] bg-disabledBG h-[50px]">
              <Image
                source={icons.plus}
                className="w-6 h-6 object-contain m-auto"
                tintColor={"#a32e2d"}
              />
            </View>
            <View className="w-[60%]">
              <Text
                maxFontSizeMultiplier={1}
                className="font-ssemibold text-xl"
              >
                Add existing
              </Text>
              <Text
                maxFontSizeMultiplier={1}
                className="font-ssemibold text-xl text-lighttext"
              >
                A bank account, card, mobile wallet or Paypal account
              </Text>
            </View>
            <Image
              source={icons.next}
              className="object-contain"
              tintColor={"#a32e2d"}
            />
          </View>
          <Text
            className="mt-5 text-3xl font-ssemibold"
            maxFontSizeMultiplier={1}
          >
            My cards
          </Text>
          <Text
            className="mt-2 text-xl font-ssemibold text-lighttext"
            maxFontSizeMultiplier={1}
          >
            You don't have any other card yet. Link a card right now by tapping
            Add above.
          </Text>
          <View className="h-[80px] mt-5" />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Account;
