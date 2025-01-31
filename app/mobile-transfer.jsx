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
import { images } from "../constants/images";
import { generateTransactionNumber } from "../constants/getInitialName";

const operators = [
  {
    title: "M-PESA",
    image: images.mpesa,
    subtitle: "mpesa",
  },
  {
    title: "Airtel Money",
    image: images.airtel,
    subtitle: "airtel money",
  },
];
const MobileTransfer = () => {
  const { login, loading, isLogged, error, user } = useGlobalContext();
  const [transactionNumber, setTransactionNumber] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [reciepentName, setRecipentName] = useState("");
  const [amount, setAmount] = useState("");

  const [sendtoModal, setSendToModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Kenya");
  const [selectedCurrency, setSelectedCurrency] = useState("KES");
  function maskMobileNumber(number) {
    const numberStr = number.toString(); // Convert to string if it's not already
    return numberStr.slice(0, 2) + "******" + numberStr.slice(-2);
  }
  const sendToFormValid =
    selectedOperator.trim() !== "" &&
    mobileNumber.trim() !== "" &&
    reciepentName.trim() !== "";

  const isFormValid =
    selectedOperator.trim() !== "" &&
    mobileNumber.trim() !== "" &&
    reciepentName.trim() !== "" &&
    amount.trim() !== "";

  const openSendtomoda = () => {
    setSendToModal(true);
  };
  const closeSendTomodal = () => {
    setSendToModal(false);
  };

  const handleSelectOperator = (ele) => {
    setSelectedOperator(ele.subtitle);
  };

  const handleSendMoney = () => {
    const newTransaction = generateTransactionNumber();
    // setTransactionNumber(newTransaction);
    const smsCharges =
      amount <= 500 ? (amount * 2.9) / 100 : (amount * 1.6) / 100;
      
    const sendTodetails = {
      transactionVia: "Send to Mobile number",
      amount: amount,
      type: "mobile-transfer",
      smsCharges: smsCharges,
      transactionNumber: newTransaction,
      parsedDetails: {
        selectedCountry: "",
        selectedCurrency: "",
        selectedDelivery: null,
        recipentDetails: {
          firstname: reciepentName,
          middleName: "",
          lastName: "",
          selectedBankName: selectedOperator,
          AccountNumber: mobileNumber,
          selectedRemmitance: "",
          seletedTransactionpurpose: "",
          selectedRelationship: "",
        },
      },
    };
    router.push({
      pathname: "/paymentconfirmation",
      params: {
        transactionMobile: JSON.stringify(sendTodetails),
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
          Send to mobile money
        </Text>
        <TouchableOpacity className="rounded-full p-2"></TouchableOpacity>
      </View>
      <Text className="mt-5 text-2xl font-ssemibold">
        Please enter the payment details
      </Text>
      <View className="justify-between h-full pb-20">
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
                {selectedOperator === "" && mobileNumber === "" ? (
                  <Text
                    maxFontSizeMultiplier={1}
                    className="text-xl font-mregular"
                  >
                    Select the recipient
                  </Text>
                ) : (
                  <View>
                    <Text className="text-xl font-ssemibold">
                      {reciepentName} . +254 - {maskMobileNumber(mobileNumber)}
                    </Text>
                    <Text className="text-md font-sregular text-lighttext">
                      {selectedOperator}
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
              Please select an operator
            </Text>
            <View className={selectedOperator !== "" ? "hidden" : "flex"}>
              {operators.map((ele, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    className="mt-5 flex-row justify-between items-center"
                    onPress={() => handleSelectOperator(ele)}
                  >
                    <View className="flex-row items-center gap-2 w-[80%]">
                      <Image
                        source={ele.image}
                        className="w-[50px] h-[50px]"
                        resizeMode="contain"
                      />
                      <Text
                        maxFontSizeMultiplier={1}
                        className="font-sregular uppercase text-xl text-left"
                      >
                        {ele.title}
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
            </View>
            <View className={selectedOperator !== "" ? "flex" : "hidden"}>
              <View className="h-[50px] pr-2 mt-5 border-b border-lighttext flex-row items-center justify-between">
                <TextInput
                  placeholder="Enter an recipient name"
                  className="h-full text-xl w-[95%] font-sregular"
                  value={reciepentName}
                  onChangeText={(text) => setRecipentName(text)}
                />
                <AntDesign name="user" size={24} color="#a32e2d" />
              </View>
              <Text className="text-lighttext text-xl font-sregular mt-5">
                Mobile Number
              </Text>
              <View className="flex-row items-center gap-2 w-full">
                <TouchableOpacity className="border-b border-lighttext justify-center w-20 h-[50px]">
                  <Text className="text-xl text-lighttext font-mregular text-left">
                    +254
                  </Text>
                </TouchableOpacity>
                <View className="border-b border-lighttext h-[50px] flex-row items-center w-[80%] justify-between gap-2">
                  <TextInput
                    placeholder="Mobile Number"
                    keyboardType="numeric"
                    className="font-ssemibold text-xl text-lighttext h-full w-[80%]"
                    value={mobileNumber}
                    onChangeText={(text) => setMobileNumber(text)}
                  />
                  <AntDesign name="contacts" size={24} color="#a32e2d" />
                </View>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              className={
                !sendToFormValid
                  ? "rounded-xl min-h-[60px] mt-5 bg-lightbg flex flex-row justify-center items-center"
                  : "rounded-xl min-h-[60px] mt-5 bg-primary flex flex-row justify-center items-center"
              }
              style={{ display: selectedOperator !== "" ? "flex" : "none" }}
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

      {/* mobile number details modal */}
    </View>
  );
};

export default MobileTransfer;
