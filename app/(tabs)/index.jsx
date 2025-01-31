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
import { getInitials, formatBalance } from "../../constants/getInitialName";
import { useEffect, useState } from "react";
import { router } from "expo-router";

const links = [
  {
    title: "Send to",
    subtitle: "Equity",
    icon: icons.equity,
    link: "equity",
  },

  {
    title: "Send to",
    subtitle: "Mobile",
    icon: icons.mobile,
    link: "mobile-transfer",
  },
  {
    title: "Send to",
    subtitle: "Another bank",
    icon: icons.bank,
    link: "bank-transfer",
  },
  {
    title: "Pay",
    subtitle: "Bills",
    icon: icons.bills,
    link: "",
  },

  {
    title: "Buy",
    subtitle: "Goods",
    icon: icons.goods,
    link: "",
  },
  {
    title: "Buy",
    subtitle: "Airtime",
    icon: icons.airtime,
    link: "",
  },
];

const otherOptions = [
  {
    title: "Transact",
    icon: icons.transact,
    link: "transact",
  },
  {
    title: "Borrow",
    icon: icons.borrow,
    link: "success",
  },
  {
    title: "Save",
    icon: icons.save,
    link: "",
  },
];

export default function HomeScreen() {
  const { login, loading, isLogged, error, user, logout } = useGlobalContext();
  const [greeting, setGreeting] = useState("Good Afternoon");
  const [showbalance, setShowbalance] = useState(true);
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
            Home
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
          <View className="mt-5 items-center">
            <Text className="font-sregular text-2xl" maxFontSizeMultiplier={1}>
              {greeting},{" "}
              <Text className="font-sbold text-2xl" maxFontSizeMultiplier={1}>
                {/* {user?.user.name} */}
                {getFirstName(user?.user.name)}
              </Text>
            </Text>
          </View>
          {/* sending options */}

          <ScrollView
            className="gap-3 py-5 pl-1 pr-1 w-full mt-2"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {links.map((ele, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  className="mr-10 flex-2 items-center justify-center gap-1 shadow-xl shadow-black-200"
                  onPress={() => router.push(ele.link)}
                >
                  <View className="bg-white rounded-full w-[50px] h-[50px] items-center justify-center">
                    <Image
                      source={ele.icon}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                  </View>

                  <Text
                    className="text-center font-sregular"
                    maxFontSizeMultiplier={1}
                  >
                    {ele.title}
                  </Text>
                  <Text
                    className="text-center text-[15px] font-ssemibold text-primary"
                    maxFontSizeMultiplier={1}
                  >
                    {ele.subtitle}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* balance show view */}

          <View className="rounded-2xl bg-white border-2 border-[#f0f0f0] mt-2">
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
          <View className="h-40 bg-white border-2 border-[#f0f0f0] rounded-2xl mt-5 flex-row items-center justify-between px-10">
            {otherOptions.map((ele, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  className="items-center"
                  onPress={() => router.push(ele.link)}
                >
                  <View className="bg-primary w-20 h-20 rounded-full object-contain items-center justify-center">
                    <Image
                      source={ele.icon}
                      tintColor={"white"}
                      className="w-10 h-10 object-contain"
                    />
                  </View>

                  <Text
                    className="text-[16px] font-ssemibold mt-2"
                    maxFontSizeMultiplier={1}
                  >
                    {ele.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* my account */}
          <View className="mt-5 flex-row items-center justify-between">
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
                <Text className="text-white font-sregular text-md">
                  {user?.user.accountNumber} . Savings Account
                </Text>
              </View>
            </ImageBackground>
          </View>
          {/* exchange rate calculator */}
          <View className="border-2 border-[#f0f0f0] mt-5 bg-white rounded-2xl p-5">
            <View className="flex-row items-center justify-between border-b-2 border-[#e5e5e5] border-dashed pb-5">
              <Text className="text-xl font-mregular">Forex calculator</Text>
              <TouchableOpacity>
                <Image source={icons.right} />
              </TouchableOpacity>
            </View>
            {/* converting countries */}
            <View className="flex-row items-center justify-between border-b-2 border-[#e5e5e5] border-dashed py-5">
              <View className="flex-row items-center gap-3">
                <View className="w-20 h-20 rounded-full">
                  <Image
                    source={icons.usaFlag}
                    className="w-full h-full rounded-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text
                    className="text-xl font-mregular"
                    maxFontSizeMultiplier={1}
                  >
                    USD
                  </Text>
                  <Text
                    className="text-xl font-mregular text-[#8d8d8d]"
                    maxFontSizeMultiplier={1}
                  >
                    1
                  </Text>
                </View>
              </View>

              <Image source={icons.arrow} className="w-8 h-8" />

              <View className="flex-row items-center gap-3">
                <View>
                  <Text
                    className="text-xl font-mregular"
                    maxFontSizeMultiplier={1}
                  >
                    KES
                  </Text>
                  <Text
                    className="text-xl font-mregular text-[#8d8d8d]"
                    maxFontSizeMultiplier={1}
                  >
                    126.5
                  </Text>
                </View>
                <View className="w-20 h-20 rounded-full">
                  <Image
                    source={icons.kenyaFlag}
                    className="w-full h-full rounded-full"
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
            {/* conversion info */}
            <View className="flex-row items-center justify-between">
              <View className="py-5 px-5">
                <Text className="text-xl font-mregular">To Buy 1 USD</Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-mregular text-primary">
                    126.25
                  </Text>
                  <Image source={icons.down} />
                </View>
              </View>
              <View className="border-r-2 border-dashed border-[#e5e5e5] h-full" />
              <View className="py-5 px-5">
                <Text className="text-xl font-mregular">To Sell 1 USD</Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-mregular text-primary">
                    132.25
                  </Text>
                  <Image source={icons.up} />
                </View>
              </View>
            </View>
          </View>
          <View className="h-[80px] mt-5" />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
