import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { kenyabanks, tanzaniaBanks, ugandaBanks } from "../constants/banks";
import React, { useEffect, useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { icons } from "../constants/icons";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomModal from "../components/BottomModal";
import { countrylist } from "../constants/countryList";
import CustomButton from "../components/CustomButton";
import { purposeofremmitance } from "../constants/purposeofremittance";
import { transactionpurpose } from "../constants/transactionPurpose";
import { relationshipToReciver } from "../constants/relationshiptoreciver";
import { allBanks } from "../constants/banks";
const deliveryMethod = [
  {
    title: "DIRECT TO BANK",
    subtitle: "PAYEE INFORMATION FOR DIRECT DEPOSITE SERVICE",
  },
  {
    title: "MOBILE MONEY TRANSFER",
    subtitle: "PAYEE INFORMATION FOR MOBILE DEPOSITE SERVICE",
  },
];
const SendTo = () => {
  const [searchText, setSearchText] = useState(""); // State for search input
  const [filteredCountries, setFilteredCountries] = useState(countrylist);
  const [countrymodal, setCountryModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBankCountry, setSelectedBankCountry] = useState([]);
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [reciverModal, setReciverModal] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");
  const [selectedBankName, setSelectedBankName] = useState("");
  const [bankModal, setBankModal] = useState(false);
  const [filterBanks, setFilterBanks] = useState(selectedBankCountry);
  const [searchBank, setSearchBank] = useState("");
  const [remittanceModal, setRemittanceModal] = useState(false);
  const [selectedRemmitance, setSelectedRemittance] = useState("");
  const [transactionModal, setTransactionModal] = useState(false);
  const [seletedTransactionpurpose, setSelectedTransactionPurpose] = useState(
    ""
  );
  const [relationshipModal, setRelationshipModal] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState("");

  useEffect(() => {
    // Update selectedBankCountry when selectedCountry changes
    if (selectedCountry === "Kenya") {
      setSelectedBankCountry(kenyabanks);
    } else if (selectedCountry === "Tanzania") {
      setSelectedBankCountry(tanzaniaBanks);
    } else if (selectedCountry === "Uganda") {
      setSelectedBankCountry(ugandaBanks);
    } else {
      setSelectedBankCountry([]);
    }
  }, [selectedCountry]);
  useEffect(() => {
    // Filter the bank list when selectedBankCountry or searchBank changes
    if (searchBank.trim() === "") {
      setFilterBanks(selectedBankCountry);
    } else {
      const filtered = selectedBankCountry?.filter((bank) =>
        bank.name.toLowerCase().includes(searchBank.toLowerCase())
      );
      setFilterBanks(filtered);
    }
  }, [searchBank, selectedBankCountry]);

  //   country modal
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
  // handle search banks
  const handleSearchBanks = (text) => {
    setSearchBank(text);
  };
  //delivery modal
  const openDeliverymodal = () => {
    setDeliveryModal(true);
  };
  const closeDeliverymodal = () => {
    setDeliveryModal(false);
  };
  const handleDeliverySelect = (ele) => {
    setSelectedDelivery(ele);
    setDeliveryModal(false);
  };

  // reciver's details
  const openReciversModal = () => {
    setReciverModal(true);
  };
  const closeReciverModal = () => {
    setReciverModal(false);
  };
  // bank list modal
  const openbankmodal = () => {
    setBankModal(true);
  };
  const closebankmodal = () => {
    setBankModal(false);
  };
  // purpose of remmitace
  const openremittance = () => {
    setRemittanceModal(true);
  };
  const closeRemittance = () => {
    setRemittanceModal(false);
  };
  const handleRemmitanceSelect = (ele) => {
    setSelectedRemittance(ele);
    setRemittanceModal(false);
  };
  // purpose of transaction
  const opentransactionporpuse = () => {
    setTransactionModal(true);
  };
  const closetransactionpurpose = () => {
    setTransactionModal(false);
  };
  const handleSelectTransactionpurpose = (ele) => {
    setSelectedTransactionPurpose(ele);
    setTransactionModal(false);
  };
  // relationship to receiver
  const openRelationShipModal = () => {
    setRelationshipModal(true);
  };
  const closeRelationShipmodal = () => {
    setRelationshipModal(false);
  };
  const handleSlectedRelationship = (ele) => {
    setSelectedRelationship(ele);
    setRelationshipModal(false);
  };
  const recipentDetails = {
    firstname,
    middleName,
    lastName,
    selectedBankName,
    AccountNumber,
    selectedRemmitance,
    seletedTransactionpurpose,
    selectedRelationship,
  };
  // check form valid
  const isFormValid =
    firstname.trim() !== "" &&
    lastName.trim() !== "" &&
    selectedBankName.trim() !== "" &&
    AccountNumber.trim() !== "" &&
    selectedRemmitance.trim() !== "" &&
    seletedTransactionpurpose.trim() !== "" &&
    selectedRelationship.trim() !== "";

  // sending to object
  const sendToDetails = {
    selectedCountry,
    selectedCurrency,
    selectedDelivery,
    recipentDetails,
  };

  const handleRecipentDetailSubmit = () => {
    setReciverModal(false);
  };
  const sendToFormValid =
    selectedCountry.trim() !== "" &&
    selectedCurrency.trim() !== "" &&
    selectedDelivery !== "" &&
    isFormValid;

  // submit send to details
  const handleSubmitSendtoDetails = () => {
    router.push({
      pathname: "westernunion",
      params: { sendToDetails: JSON.stringify(sendToDetails) },
    });
  };

  const handleBankSelect = (ele) => {
    setSelectedBankName(ele.name);
    closebankmodal();
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
          Send to someone new
        </Text>
        <TouchableOpacity className="rounded-full p-2"></TouchableOpacity>
      </View>
      <Text className="text-3xl font-ssemibold mt-5" maxFontSizeMultiplier={1}>
        Please input delivery method details
      </Text>
      {/* form */}
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-lighttext text-xl font-sregular mt-5">
            Country
          </Text>
          <TouchableOpacity
            className="border-b border-lighttext w-full pb-5 pt-2 flex-row justify-between items-center"
            onPress={openCountryModal}
          >
            <View>
              <Text maxFontSizeMultiplier={1} className="text-xl font-mregular">
                {selectedCountry === "" ? "Select Country" : selectedCountry}
              </Text>
            </View>
            <View className="ml-10">
              <AntDesign name="down" size={20} color="#a32e2d" />
            </View>
          </TouchableOpacity>
          {/* currency select */}
          <View>
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Receiver's currency
            </Text>
            <TouchableOpacity className="border-b border-lighttext w-full pb-5 pt-2 flex-row justify-between items-center">
              <View>
                <Text
                  maxFontSizeMultiplier={1}
                  className="text-xl font-mregular"
                >
                  {selectedCurrency === ""
                    ? "Select Currency"
                    : selectedCurrency}
                </Text>
              </View>
              <View className="ml-10">
                <AntDesign name="down" size={20} color="#a32e2d" />
              </View>
            </TouchableOpacity>
          </View>
          {/* delivery method */}
          <View>
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Delivery method
            </Text>
            <TouchableOpacity
              className="border-b border-lighttext w-full pb-5 pt-2 flex-row justify-between items-center"
              onPress={openDeliverymodal}
            >
              <View>
                <Text
                  maxFontSizeMultiplier={1}
                  className="text-xl font-mregular"
                >
                  {selectedDelivery === ""
                    ? "Select delivery method"
                    : selectedDelivery?.title}
                </Text>
                {selectedDelivery && (
                  <Text className="w-[60%] text-lighttext ">
                    {selectedDelivery?.subtitle}
                  </Text>
                )}
              </View>
              <View className="">
                <AntDesign name="down" size={20} color="#a32e2d" />
              </View>
            </TouchableOpacity>
          </View>
          {/* recipent details */}
          <View>
            <Text className="text-lighttext text-xl font-sregular mt-5">
              Recipient Details
            </Text>
            <TouchableOpacity
              className="border-b border-lighttext w-full pb-5 pt-2 flex-row justify-between items-center"
              onPress={() => openReciversModal()}
            >
              <View>
                <Text
                  maxFontSizeMultiplier={1}
                  className="text-xl font-mregular"
                >
                  {/* {selectedCurrency === "" ? "Select Currency" : selectedCurrency} */}
                  {isFormValid
                    ? `${firstname} ${middleName} ${lastName}`
                    : "Recipient Details"}
                </Text>
              </View>
              <View className="ml-10">
                <AntDesign name="down" size={20} color="#a32e2d" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* button */}

        <TouchableOpacity
          className={
            !sendToFormValid
              ? "rounded-xl min-h-[60px] mt-5 bg-lightbg flex flex-row justify-center items-center"
              : "rounded-xl min-h-[60px] mt-5 bg-primary flex flex-row justify-center items-center"
          }
          onPress={handleSubmitSendtoDetails}
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
      {/* country modal */}
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
      {/* currency modal */}
      <BottomModal
        isVisible={deliveryModal}
        onClose={closeDeliverymodal}
        title="Delivery method"
      >
        <Text
          className="text-2xl font-ssemibold mt-5"
          maxFontSizeMultiplier={1}
        >
          Please Select delivery method
        </Text>
        <View>
          {deliveryMethod.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="mt-5 flex-row items-center justify-between"
                onPress={() => handleDeliverySelect(ele)}
              >
                <Text className="font-sregular uppercase text-2xl text-left w-[80%]">
                  {ele.title}
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
        </View>
      </BottomModal>
      {/* reciver details modal */}
      <BottomModal
        isVisible={reciverModal}
        onClose={closeReciverModal}
        title="Recipient Details"
      >
        <Text
          className="text-2xl font-ssemibold mt-5"
          maxFontSizeMultiplier={1}
        >
          Please enter the recipient's details
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className=" justify-between"
        >
          <ScrollView className="h-[80%] w-full">
            {/* First Name */}
            <View className="border-b border-b-border">
              <Text className="text-lighttext text-xl font-sregular mt-5">
                First Name
              </Text>
              <TextInput
                placeholder="First name"
                className="font-mregular text-xl h-20 text-lighttext"
                value={firstname}
                onChangeText={(text) => setFirstname(text)}
              />
            </View>

            {/* Middle Name */}
            <View className="border-b border-b-border">
              <Text className="text-lighttext text-xl font-sregular mt-5">
                Middle Name (optional)
              </Text>
              <TextInput
                placeholder="Middle name"
                className="font-mregular text-xl h-20 text-lighttext"
                value={middleName}
                onChangeText={(text) => setMiddleName(text)}
              />
            </View>

            {/* Last Name */}
            <View className="border-b border-b-border">
              <Text className="text-lighttext text-xl font-sregular mt-5">
                Last Name
              </Text>
              <TextInput
                placeholder="Last name"
                className="font-mregular text-xl h-20 text-lighttext"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </View>

            {/* Bank */}
            <View>
              <Text className="text-lighttext text-xl font-sregular mt-5">
                Bank name
              </Text>
              <TouchableOpacity
                className="border-b border-lighttext h-20 w-full pt-2 flex-row justify-between items-center"
                onPress={() => openbankmodal()}
              >
                <View>
                  <Text
                    maxFontSizeMultiplier={1}
                    className="text-xl font-mregular text-lighttext"
                  >
                    {selectedBankName === ""
                      ? "Select Bank name"
                      : selectedBankName}
                  </Text>
                </View>
                <View className="ml-10">
                  <AntDesign name="down" size={20} color="#a32e2d" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Account Number */}
            <View className="border-b border-b-border">
              <Text className="text-lighttext text-xl font-sregular mt-5">
                Account number
              </Text>
              <TextInput
                placeholder="Account Number"
                keyboardType="numeric"
                className="font-mregular text-xl h-20 text-lighttext"
                value={AccountNumber}
                onChangeText={(text) => setAccountNumber(text)}
              />
            </View>

            {/* Purpose */}
            <View>
              <Text className="text-lighttext text-xl font-sregular mt-5">
                Purpose of Remittance
              </Text>
              <TouchableOpacity
                className="border-b border-lighttext w-full h-20 pt-2 flex-row justify-between items-center"
                onPress={() => openremittance()}
              >
                <View>
                  <Text
                    maxFontSizeMultiplier={1}
                    className="text-xl font-mregular text-lighttext"
                  >
                    {selectedRemmitance === ""
                      ? "Select Purpose of Remittance"
                      : selectedRemmitance}
                  </Text>
                </View>
                <View className="ml-10">
                  <AntDesign name="down" size={20} color="#a32e2d" />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <Text className="text-lighttext text-xl font-sregular mt-5">
                Purpose of Transaction
              </Text>
              <TouchableOpacity
                className="border-b border-lighttext w-full h-20 pt-2 flex-row justify-between items-center"
                onPress={() => opentransactionporpuse()}
              >
                <View>
                  <Text
                    maxFontSizeMultiplier={1}
                    className="text-xl font-mregular text-lighttext"
                  >
                    {seletedTransactionpurpose === ""
                      ? "Select Purpose of transaction"
                      : seletedTransactionpurpose}
                  </Text>
                </View>
                <View className="ml-10">
                  <AntDesign name="down" size={20} color="#a32e2d" />
                </View>
              </TouchableOpacity>
            </View>
            {/* relationship with recipent */}
            <View>
              <Text className="text-lighttext text-xl font-sregular mt-5">
                Relationship to Receiver
              </Text>
              <TouchableOpacity
                className="border-b border-lighttext w-full h-20 pt-2 flex-row justify-between items-center"
                onPress={() => openRelationShipModal()}
              >
                <View>
                  <Text
                    maxFontSizeMultiplier={1}
                    className="text-xl font-mregular text-lighttext"
                  >
                    {selectedRelationship === ""
                      ? "Relationship to Receiver"
                      : selectedRelationship}
                  </Text>
                </View>
                <View className="ml-10">
                  <AntDesign name="down" size={20} color="#a32e2d" />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity
            className={
              !isFormValid
                ? "rounded-xl min-h-[60px] mt-5 bg-lightbg flex flex-row justify-center items-center"
                : "rounded-xl min-h-[60px] mt-5 bg-primary flex flex-row justify-center items-center"
            }
            onPress={handleRecipentDetailSubmit}
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
              Continue
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </BottomModal>
      {/* bank list modal */}
      <BottomModal
        isVisible={bankModal}
        onClose={closebankmodal}
        title="Recipient Bank"
      >
        <Text
          className="text-2xl font-ssemibold mt-5"
          maxFontSizeMultiplier={1}
        >
          Please select reciepent bank
        </Text>
        {/* search bar */}
        <View className="border border-black h-[50px] bg-lightbg rounded-3xl flex-row items-center justify-between px-5 mt-5">
          <TextInput
            placeholder="Search Bank"
            className="text-xl h-full font-ssemibold w-[80%]"
            value={searchBank}
            onChangeText={handleSearchBanks}
          />
          <AntDesign name="search1" size={20} color="black" />
        </View>
        <ScrollView>
          {filterBanks.length === 0 ? (
            <Text
              className="text-2xl mt-5 font-ssemibold text-center "
              maxFontSizeMultiplier={1}
            >
              No Banks Found for {selectedCountry}
            </Text>
          ) : (
            filterBanks
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((ele, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    className="mt-5 flex-row items-center justify-between border-b border-b-lightbg pb-5"
                    onPress={() => handleBankSelect(ele)}
                  >
                    <View>
                      <Text className="font-sregular uppercase text-2xl text-left">
                        {ele.name}
                      </Text>
                      {ele.bankCode && (
                        <Text className="text-xl font-sregular text-lighttext">
                          {ele.bankCode}. {ele.code}
                        </Text>
                      )}
                    </View>
                    <Image
                      source={icons.radio}
                      className="w-10 h-10"
                      resizeMode="contain"
                      tintColor={"#a32e2d"}
                    />
                  </TouchableOpacity>
                );
              })
          )}
        </ScrollView>
      </BottomModal>
      {/* purpose of remittance modal */}
      <BottomModal
        isVisible={remittanceModal}
        onClose={closeRemittance}
        title="Please select an option"
      >
        {/* search bar */}
        <View className="border border-black bg-lightbg rounded-3xl flex-row items-center justify-between px-5 mt-5">
          <TextInput
            placeholder="Search"
            className="text-xl font-ssemibold w-[80%]"
            // value={searchText}
            // onChangeText={handleSearch}
          />
          <AntDesign name="search1" size={20} color="black" />
        </View>
        <ScrollView>
          {purposeofremmitance.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="mt-5 flex-row items-center justify-between border-b border-b-lightbg pb-5"
                onPress={() => handleRemmitanceSelect(ele)}
              >
                <Text className="font-sregular uppercase text-2xl text-left">
                  {ele}
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
      {/* purpose of transaction modal */}
      <BottomModal
        isVisible={transactionModal}
        onClose={closetransactionpurpose}
        title="Please select an option"
      >
        {/* search bar */}
        <View className="border border-black bg-lightbg rounded-3xl flex-row items-center justify-between px-5 mt-5">
          <TextInput
            placeholder="Search"
            className="text-xl font-ssemibold w-[80%]"
            // value={searchText}
            // onChangeText={handleSearch}
          />
          <AntDesign name="search1" size={20} color="black" />
        </View>
        <ScrollView>
          {transactionpurpose.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="mt-5 flex-row items-center justify-between border-b border-b-lightbg pb-5"
                onPress={() => handleSelectTransactionpurpose(ele)}
              >
                <Text className="font-sregular uppercase text-2xl text-left">
                  {ele}
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
      {/* relationship to reciver modal */}
      <BottomModal
        isVisible={relationshipModal}
        onClose={closeRelationShipmodal}
        title="Please select an option"
      >
        {/* search bar */}
        <View className="border border-black bg-lightbg rounded-3xl flex-row items-center justify-between px-5 mt-5">
          <TextInput
            placeholder="Search"
            className="text-xl font-ssemibold w-[80%]"
            // value={searchText}
            // onChangeText={handleSearch}
          />
          <AntDesign name="search1" size={20} color="black" />
        </View>
        <ScrollView>
          {relationshipToReciver.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="mt-5 flex-row items-center justify-between border-b border-b-lightbg pb-5"
                onPress={() => handleSlectedRelationship(ele)}
              >
                <Text className="font-sregular uppercase text-2xl text-left">
                  {ele}
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

export default SendTo;
