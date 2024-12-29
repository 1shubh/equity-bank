import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { icons } from "../constants/icons";
import React, { useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalContext } from "../hoc/GlobalProvider";
import BottomModal from "../components/BottomModal";
import { kenyaCities } from "../constants/kenyaCitities";

const WesternUnion = () => {
 

  const { login, loading, isLogged, error, user } = useGlobalContext();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [currency, setCurrency] = useState("KES");
  const [amount, setAmount] = useState("");
  const [filteredCity, setFilteredCity] = useState(kenyaCities);
  const [searchText, setSearchText] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { sendToDetails } = useGlobalSearchParams();
  const parsedDetails =
    typeof sendToDetails === "string"
      ? JSON.parse(sendToDetails)
      : sendToDetails;
  const [cityModal, setCityModal] = useState(false);
  const openCitymodal = () => {
    setCityModal(true);
  };
  const closeCityModal = () => {
    setCityModal(false);
  };
  const handleSelectedCity = (ele) => {
    setSelectedCity(ele.name);
    setCityModal(false);
  };
  const isFormValid =
    amount.trim() !== "" &&
    address.trim() !== "" &&
    selectedCity.trim() !== "" &&
    sendToDetails !== undefined;

  const transactionDetails = {
    transactionVia: "Western union",
    amount,
    parsedDetails,
  };
  const handleSendMoney = () => {
    router.push({
      pathname: "paymentconfirmation",
      params: {
        transactionDetails: JSON.stringify(transactionDetails),
      },
    });
  };

  const handleSearchCity = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredCity(kenyaCities);
    } else {
      const filtered = kenyaCities.filter((city) =>
        city.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCity(filtered);
    }
  };

  // console.log(user.user);
  return (
    <View className="px-5 py-5 bg-white h-full">
      <View className="flex-row items-center justify-between">
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
          Western Union - Send money
        </Text>
        <TouchableOpacity className="rounded-full p-2"></TouchableOpacity>
      </View>
      {/* form send money*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-between"
      >
        {/* form  */}
        <ScrollView>
          <Text
            className="text-2xl font-ssemibold mt-5"
            maxFontSizeMultiplier={1}
          >
            Please enter the payment details
          </Text>
          <Text className="text-lighttext text-xl font-sregular mt-5" maxFontSizeMultiplier={1}>
            Send From
          </Text>
          <TouchableOpacity className="border-b border-lighttext w-full h-20 flex-row justify-between items-center">
            <View>
              <Text maxFontSizeMultiplier={1} className="text-xl font-mregular">
                {user?.user.accountNumber}
              </Text>
              <Text
                maxFontSizeMultiplier={1}
                className="text-md font-mregular text-lighttext"
              >
                Available Balance {user.user.balance} KES
              </Text>
            </View>
            <View className="ml-10">
              <AntDesign name="down" size={20} color="#a32e2d" />
            </View>
          </TouchableOpacity>
          {/* send to */}
          <Text className="text-lighttext text-xl font-sregular mt-5">
            Send to
          </Text>
          <TouchableOpacity
            className="border-b border-lighttext w-full h-20 flex-row justify-between items-center"
            onPress={() => router.push("sendto")}
          >
            <View>
              <Text maxFontSizeMultiplier={1} className="text-xl font-mregular">
                {sendToDetails !== undefined
                  ? `${parsedDetails?.recipentDetails.firstname} ${parsedDetails?.recipentDetails.lastName} . ${parsedDetails?.recipentDetails.AccountNumber}`
                  : "Select recipient"}
              </Text>
            </View>
            <View className="ml-10">
              <AntDesign name="down" size={20} color="#a32e2d" />
            </View>
          </TouchableOpacity>
          {/* transfer amount */}
          <View className="">
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Enter an amount
            </Text>
            <View className="flex-row items-center justify-between gap-2 w-full">
              <TouchableOpacity className="border-b border-lighttext justify-center w-20 h-[50px]">
                <Text className="text-xl text-lighttext font-mregular text-left">
                  KES
                </Text>
              </TouchableOpacity>
              <View className="border-b border-lighttext w-full h-[50px]">
                <TextInput
                  placeholder="Enter an amount"
                  keyboardType="numeric"
                  className="font-ssemibold text-xl text-lighttext h-full"
                  value={amount}
                  onChangeText={(text) => setAmount(text)}
                />
              </View>
            </View>
          </View>
          {/* street address */}
          <View>
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Street Address
            </Text>
            <View className="border-b border-lighttext w-full h-20 flex-row justify-between items-center">
              <TextInput
                placeholder="Enter your street address"
                className="font-ssemibold text-xl text-lighttext h-full"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
          </View>
          {/* select city */}
          <View>
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Sender city
            </Text>
            <TouchableOpacity
              className="border-b border-lighttext w-full h-20 flex-row justify-between items-center"
              onPress={openCitymodal}
            >
              <View>
                <Text
                  maxFontSizeMultiplier={1}
                  className="text-xl font-mregular"
                >
                  {selectedCity !== "" ? selectedCity : "Select city"}
                </Text>
              </View>
              <View className="ml-10">
                <AntDesign name="down" size={20} color="#a32e2d" />
              </View>
            </TouchableOpacity>
          </View>
          {/* payment reason */}
          <View>
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Payment Reason
            </Text>
            <View className="border-b border-lighttext w-full h-20 flex-row justify-between items-center">
              <TextInput
                placeholder="Optional"
                className="font-ssemibold text-xl text-lighttext"
              />
            </View>
          </View>
          <Text className="text-xl font-ssemibold">
            Click to learn how to{" "}
            <Text className="text-primary">protect yourself from fraud</Text>
          </Text>
        </ScrollView>
        <TouchableOpacity
          className={
            !isFormValid
              ? "rounded-xl min-h-[60px] mt-5 bg-disabledBG flex flex-row justify-center items-center"
              : "rounded-xl min-h-[60px] mt-5 bg-primary flex flex-row justify-center items-center"
          }
          onPress={handleSendMoney}
          disabled={!isFormValid}
        >
          <Text
            className={
              !isFormValid
                ? "text-disabledText font-msemibold text-xl"
                : "text-white font-ssemibold text-xl"
            }
            maxFontSizeMultiplier={1}
          >
            Send Money
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {/* city modal */}
      <BottomModal
        className=""
        title={"Select City"}
        isVisible={cityModal}
        onClose={closeCityModal}
      >
        <View className="border border-black h-[50px] bg-lightbg rounded-3xl flex-row items-center justify-between px-5 mt-5">
          <TextInput
            placeholder="Search"
            className="text-xl font-ssemibold h-full w-[80%]"
            value={searchText}
            onChangeText={handleSearchCity}
          />
          <AntDesign name="search1" size={20} color="black" />
        </View>
        <ScrollView>
          {filteredCity.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="mt-5 flex-row items-center justify-between border-b border-b-lightbg pb-5"
                onPress={() => handleSelectedCity(ele)}
              >
                <Text className="font-sregular uppercase text-2xl text-left">
                  {ele.name}
                </Text>
                <Image
                  source={icons.radio}
                  className="w-10 h-10"
                  resizeMode="contain"
                  tintColor={"#a32e2d"}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </BottomModal>
    </View>
  );
};

export default WesternUnion;

const styles = StyleSheet.create({
  dropdown: {
    height: 60,
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  spinnerContainer: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
});
