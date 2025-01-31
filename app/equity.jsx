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
import { countrylist } from "../constants/countryList";
import { useEffect } from "react";
import { generateTransactionNumber } from "../constants/getInitialName";

const Equity = () => {
  const { login, loading, isLogged, error, user } = useGlobalContext();
  const [accountNumber, setAccountNumber] = useState("");
  const [reciepentName, setRecipentName] = useState("");
  const [amount, setAmount] = useState("");
  const [sendtoModal, setSendToModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Kenya");
  const [searchText, setSearchText] = useState(""); // State for search input
  const [filteredCountries, setFilteredCountries] = useState(countrylist);
  const [countrymodal, setCountryModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("KES");

  function maskMobileNumber(number) {
    const numberStr = number.toString(); // Convert to string if it's not already
    return numberStr.slice(0, 2) + "******" + numberStr.slice(-2);
  }
  const sendToFormValid =
    selectedCountry.trim() !== "" &&
    accountNumber.trim() !== "" &&
    reciepentName.trim() !== "";

  const isFormValid =
    selectedCountry.trim() !== "" &&
    accountNumber.trim() !== "" &&
    reciepentName.trim() !== "" &&
    amount.trim() !== "";

  const sendTodetails = {
    transactionVia: "Send to Equity account",

    amount: amount,
    parsedDetails: {
      selectedCountry: selectedCountry,
      selectedCurrency: selectedCurrency,
      selectedDelivery: null,
      recipentDetails: {
        firstname: reciepentName,
        middleName: "",
        lastName: "",
        selectedBankName: "",
        AccountNumber: accountNumber,
        selectedRemmitance: "",
        seletedTransactionpurpose: "",
        selectedRelationship: "",
      },
    },
  };

  const openSendtomoda = () => {
    setSendToModal(true);
  };
  const closeSendTomodal = () => {
    setSendToModal(false);
  };
  //   country select
  const openCountryModal = () => {
    setCountryModal(true);
  };
  const closeCountryModal = () => {
    setCountryModal(false);
  };
  const handleCountrySelect = (ele) => {
    setSelectedCountry(ele.countryName);
    setSelectedCurrency(ele.currency);
    setCountryModal(false);
    setFilteredCountries(countrylist);
  };
  //   handle search
  const handleSearch = (text) => {
    setSearchText(text); // Update the search text
    if (text.trim() === "") {
      setFilteredCountries(countrylist); // Reset to original list when input is empty
    } else {
      const filtered = countrylist.filter((country) =>
        country.countryName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCountries(filtered); // Update the filtered countries
    }
  };

  const handleSendMoney = () => {
    const newTransaction = generateTransactionNumber();
    // setTransactionNumber(newTransaction);
    const smsCharges =
      amount <= 500 ? (amount * 2.9) / 100 : (amount * 1.6) / 100;

    const sendTodetails = {
      transactionVia: "Send to Equity account",
      amount: amount,
      type: "equity-transfer",
      smsCharges: smsCharges,
      transactionNumber: newTransaction,
      parsedDetails: {
        selectedCountry: selectedCountry,
        selectedCurrency: selectedCurrency,
        selectedDelivery: null,
        recipentDetails: {
          firstname: reciepentName,
          middleName: "",
          lastName: "",
          selectedBankName: "",
          AccountNumber: accountNumber,
          selectedRemmitance: "",
          seletedTransactionpurpose: "",
          selectedRelationship: "",
        },
      },
    };
    router.push({
      pathname: "paymentconfirmation",
      params: {
        transactionEquity: JSON.stringify(sendTodetails),
      },
    });
  };
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
          Send to an Equity account
        </Text>
        <TouchableOpacity className="rounded-full p-2"></TouchableOpacity>
      </View>
      <View className="justify-between h-full pb-10">
        <View>
          {/* send from */}
          <View>
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Send From
            </Text>
            <TouchableOpacity className="border-b border-lighttext w-full h-20 pb-5 mt-2 flex-row justify-between items-center">
              <View>
                <Text
                  className="text-xl font-mregular"
                  maxFontSizeMultiplier={1}
                >
                  {user.user.name}
                </Text>
                <Text
                  maxFontSizeMultiplier={1}
                  className="text-md font-mregular text-lighttext"
                >
                  {maskMobileNumber(user?.user.accountNumber)}
                </Text>
                <Text
                  maxFontSizeMultiplier={1}
                  className="text-md font-mregular text-lighttext"
                >
                  Available Balance: {user.user.balance} KES
                </Text>
              </View>
              <View className="ml-10">
                <AntDesign name="down" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          {/* send to  */}
          <View>
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Send to
            </Text>
            <TouchableOpacity
              className="border-b border-lighttext w-full h-20 flex-row justify-between items-center"
              onPress={() => openSendtomoda()}
            >
              <View>
                {reciepentName === "" && accountNumber === "" ? (
                  <Text
                    maxFontSizeMultiplier={1}
                    className="text-xl font-mregular"
                  >
                    Select the recipient
                  </Text>
                ) : (
                  <View>
                    <Text className="text-xl font-ssemibold">
                      {reciepentName}
                    </Text>
                    <Text className="text-md font-sregular text-lighttext">
                      {maskMobileNumber(accountNumber)}
                    </Text>
                  </View>
                )}
              </View>
              <View className="ml-10">
                <AntDesign name="down" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          {/* currency select */}
          <View className="">
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Currency
            </Text>
            <View className="flex-row items-center justify-between gap-2 w-full">
              <TouchableOpacity className="border-b border-lighttext justify-center w-20 h-[50px]">
                <Text className="text-xl text-lighttext font-mregular text-left">
                  {selectedCurrency}
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
        </View>
        {/* send money button */}
        <View>
          <TouchableOpacity
            className={
              !isFormValid
                ? "rounded-xl min-h-[60px] mt-5 bg-lightbg flex flex-row justify-center items-center"
                : "rounded-xl min-h-[60px] mt-5 bg-primary flex flex-row justify-center items-center"
            }
            onPress={handleSendMoney}
            disabled={!isFormValid}
          >
            <Text
              className={
                !isFormValid
                  ? "text-lighttext font-msemibold text-xl"
                  : "text-white font-ssemibold text-xl"
              }
              maxFontSizeMultiplier={1}
            >
              Send money
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* modals here */}
      {/* send to modal */}
      <BottomModal
        onClose={closeSendTomodal}
        isVisible={sendtoModal}
        title={"Send to someone new"}
      >
        <View className="justify-between h-full pb-10">
          <View>
            <Text
              className="text-2xl font-ssemibold mt-5"
              maxFontSizeMultiplier={1}
            >
              Please enter the recipient's details
            </Text>
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Country
            </Text>
            <TouchableOpacity
              className="border-b border-lighttext w-full h-20 flex-row justify-between items-center"
              onPress={() => openCountryModal()}
            >
              <View>
                <Text
                  maxFontSizeMultiplier={1}
                  className="text-xl font-mregular"
                >
                  {selectedCountry}
                </Text>
              </View>
              <View className="ml-10">
                <AntDesign name="down" size={20} color="black" />
              </View>
            </TouchableOpacity>
            <View className="h-[50px] pr-2 mt-5 border-b border-lighttext flex-row items-center justify-between">
              <TextInput
                placeholder="Enter an recipient name"
                className="h-full text-xl w-[95%] font-sregular"
                value={reciepentName}
                onChangeText={(text) => setRecipentName(text)}
              />
              <AntDesign name="user" size={24} color="#a32e2d" />
            </View>
            <View className="h-[50px] pr-2 mt-5 border-b border-lighttext flex-row items-center justify-between">
              <TextInput
                placeholder="Enter an account number"
                className="h-full text-xl w-[95%] font-sregular"
                keyboardType="numeric"
                value={accountNumber}
                onChangeText={(text) => setAccountNumber(text)}
              />
              <AntDesign name="contacts" size={24} color="#a32e2d" />
            </View>
          </View>
          <View>
            <TouchableOpacity
              className={
                !sendToFormValid
                  ? "rounded-xl min-h-[60px] mt-5 bg-lightbg flex flex-row justify-center items-center"
                  : "rounded-xl min-h-[60px] mt-5 bg-primary flex flex-row justify-center items-center"
              }
              onPress={closeSendTomodal}
              disabled={!sendToFormValid}
            >
              <Text
                className={
                  !sendToFormValid
                    ? "text-lighttext font-msemibold text-xl"
                    : "text-white font-ssemibold text-xl"
                }
                maxFontSizeMultiplier={1}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomModal>
      {/* country select modal */}
      <BottomModal
        onClose={closeCountryModal}
        isVisible={countrymodal}
        title={"Country"}
      >
        <Text
          className="text-2xl font-ssemibold mt-5"
          maxFontSizeMultiplier={1}
        >
          Please Select a country
        </Text>
        {/* search bar */}
        <View className="border h-[50px] border-black bg-lightbg rounded-3xl flex-row items-center justify-between px-5 mt-5">
          <TextInput
            placeholder="Search for a country"
            className="text-xl font-ssemibold w-[80%] h-full"
            value={searchText}
            onChangeText={handleSearch}
          />
          <AntDesign name="search1" size={20} color="black" />
        </View>
        <ScrollView>
          {filteredCountries.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="mt-5 flex-row items-center justify-between"
                onPress={() => handleCountrySelect(ele)}
              >
                <View className="flex-row items-center gap-10">
                  <View className="w-[60px] h-[60px] rounded-full">
                    <Image
                      source={{
                        uri: `https://flagcdn.com/64x48/${ele.countryCode.toLowerCase()}.png`,
                      }}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </View>
                  <Text className="font-ssemibold text-xl text-left">
                    {ele.countryName}
                  </Text>
                </View>
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

export default Equity;
