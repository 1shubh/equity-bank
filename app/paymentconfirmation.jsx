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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { icons } from "../constants/icons";
import { router, useGlobalSearchParams } from "expo-router";
import { sampledata } from "../constants/purposeofremittance";
import { useGlobalContext } from "../hoc/GlobalProvider";
import { useEffect } from "react";
// import { parse } from "expo-linking";
const PaymentConfirmation = () => {
  const [parsedTransactionDetails, setparsedTransactionDetails] = useState(
    null
  );
  const [parsedEquityDetails, setparsedEquityDetails] = useState(null);
  const [parsedMobileDetails, setparsedMobileDetails] = useState(null);
  const [parsedBankDetails,setParsedBankDetails] = useState(null)
  const [isSelected, setSelection] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { user } = useGlobalContext();
  const {
    transactionDetails,
    transactionEquity,
    transactionMobile,
    transactionBank
  } = useGlobalSearchParams();
  function maskMobileNumber(number) {
    const numberStr = number.toString(); // Convert to string if it's not already
    return numberStr.slice(0, 2) + "******" + numberStr.slice(-2);
  }

  useEffect(() => {
    if (transactionDetails) {
      setparsedTransactionDetails(JSON.parse(transactionDetails));
    }
    if (transactionEquity) {
      setparsedEquityDetails(JSON.parse(transactionEquity));
    }
    if (transactionMobile) {
      setparsedMobileDetails(JSON.parse(transactionMobile));
    }
    if(transactionBank){
      setParsedBankDetails(JSON.parse(transactionBank))
    }
  }, [transactionDetails, transactionEquity, transactionMobile,transactionBank]);
  // transaction details from western union

  // transaction details from equity bank

  // console.log(parsedMobileDetails);
  // console.log(parsedEquityDetails);
  // console.log(parsedTransactionDetails);
  let userbalance = parseInt(user?.user.balance);
  let amounttransfer = parseInt(parsedTransactionDetails?.amount);
  const newBalance = userbalance - amounttransfer;

  let equityamountransfer = parseInt(parsedEquityDetails?.amount);
  let newEquityBalance = userbalance - equityamountransfer;
  let mobileAmountTransfer = parseInt(parsedMobileDetails?.amount);
  let newMobileBalance = userbalance - mobileAmountTransfer;
  let banktransferAmount = parseInt(parsedBankDetails?.amount)
  let newBankBalance = userbalance - banktransferAmount
  const handleConfirm = () => {
    router.push({
      pathname: "verification",
      params: {
        transactionInfo: JSON.stringify(parsedTransactionDetails),
      },
    });
  };
  const handleEquityConfirm = () => {
    router.replace({
      pathname: "verification",
      params: {
        transactionInfo: JSON.stringify(parsedEquityDetails),
      },
    });
  };

  const handleMobileConfirm = () => {
    router.replace({
      pathname: "verification",
      params: {
        transactionInfo: JSON.stringify(parsedMobileDetails),
      },
    });
  };
  const handleBankConfirm = () => {
    router.replace({
      pathname: "verification",
      params: {
        transactionInfo: JSON.stringify(parsedBankDetails),
      },
    });
  }
  return (
    <View className="px-5 py-5 bg-white h-full">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity className="">
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
          Payment confirmation
        </Text>
        <TouchableOpacity className="rounded-full p-2"></TouchableOpacity>
      </View>
      <Text className="text-2xl font-ssemibold mt-5" maxFontSizeMultiplier={1}>
        To continue please confirm your transaction
      </Text>

      {transactionDetails && (
        <ScrollView className="h-full mt-5">
          <Text className="text-xl text-lighttext font-sregular">
            Transaction
          </Text>
          <Text className="text-xl font-ssemibold">
            {parsedTransactionDetails?.transactionVia}
            {" - "}
            {
              parsedTransactionDetails?.parsedDetails.selectedDelivery.title
            }{" "}
          </Text>
          <Text className="text-xl text-lighttext font-sregular mt-5">
            Amount
          </Text>
          <Text className="text-xl font-sregular">
            {parsedTransactionDetails?.amount} KES
          </Text>
          {/* send to details */}
          <View>
            <Text className="text-xl text-lighttext font-msegular mt-5">
              Send to
            </Text>
            <Text className="text-xl font-ssemibold">
              {
                parsedTransactionDetails?.parsedDetails.recipentDetails
                  .firstname
              }{" "}
              {parsedTransactionDetails?.parsedDetails.recipentDetails.lastName}
            </Text>
            <Text className="text-xl text-lighttext font-msegular">
              Bank Name:{" "}
              {
                parsedTransactionDetails?.parsedDetails.recipentDetails
                  .selectedBankName
              }
            </Text>
            <Text className="text-xl text-lighttext font-msegular">
              Account Number:{" "}
              {
                parsedTransactionDetails?.parsedDetails.recipentDetails
                  .AccountNumber
              }
            </Text>
            <Text className="text-xl text-lighttext font-msegular">
              Purpose of Remittance:{" "}
              {
                parsedTransactionDetails?.parsedDetails.recipentDetails
                  .selectedRemmitance
              }
            </Text>
          </View>
          {/* charges */}
          <View>
            <Text className="text-xl text-lighttext font-msegular mt-5">
              Charged
            </Text>
            <Text className="text-2xl font-sregular">0.00 KES</Text>
          </View>
          {/* western union charges */}
          <View>
            <Text className="text-xl text-lighttext font-msegular mt-5">
              Western Union fees
            </Text>
            <Text className="text-2xl font-sregular">1.15 KES</Text>
            <Text className="text-md text-lighttext font-msegular">
              Tax = 0.15 KES
            </Text>
          </View>
          {/* send from */}
          <View>
            <Text className="text-xl text-lighttext font-msegular mt-5">
              Send from
            </Text>
            <Text className="text-xl font-sregular uppercase">
              {user?.user.name}
            </Text>
            <Text className="text-xl font-sregular uppercase">
              {user?.user.accountNumber}
            </Text>
            <Text className="text-xl text-lighttext font-msegular">
              Available balance {user?.user.balance} KES
            </Text>
          </View>
          <View>
            <Text className="text-xl text-lighttext font-msegular mt-5">
              Delivery method
            </Text>
            <Text className="text-xl font-sregular mt-1">
              {parsedTransactionDetails?.parsedDetails.selectedDelivery.title}
            </Text>
          </View>
          <View>
            <Text className="text-xl text-lighttext font-msegular mt-5">
              New balance
            </Text>
            <Text className="text-xl font-sregular mt-1">{newBalance}</Text>
          </View>
          <View>
            <Text className="text-xl text-lighttext font-msegular mt-5">
              Purpose of transaction
            </Text>
            <Text className="text-xl font-sregular mt-1">
              {
                parsedTransactionDetails?.parsedDetails.recipentDetails
                  .seletedTransactionpurpose
              }
            </Text>
          </View>
          <View className="mb-20">
            <Text className="text-xl text-lighttext font-msegular mt-5">
              Relationship
            </Text>
            <Text className="text-xl font-sregular mt-1">
              {
                parsedTransactionDetails?.parsedDetails.recipentDetails
                  .selectedRelationship
              }
            </Text>
          </View>
        </ScrollView>
      )}
      {/* send to equity */}
      {transactionEquity && (
        <ScrollView className="h-full mt-5">
          <Text className="text-md text-lighttext font-sregular">
            Transaction
          </Text>
          <Text className="text-xl font-ssemibold">
            {parsedEquityDetails?.transactionVia}
          </Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            Amount
          </Text>
          <Text className="text-xl font-ssemibold">
            {parsedEquityDetails?.amount}.00 KES
          </Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            Charged
          </Text>
          <Text className="text-xl font-ssemibold">2.26 KES</Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            New balance
          </Text>
          <Text className="text-xl font-ssemibold">{newEquityBalance}</Text>

          <Text className="mt-5 text-md text-lighttext font-sregular">To</Text>
          <Text className="text-xl text-black font-sregular">
            {parsedEquityDetails?.parsedDetails.recipentDetails.firstname}
          </Text>
          <Text className="text-xl text-black font-sregular">
            {parsedEquityDetails?.parsedDetails.recipentDetails.AccountNumber}
          </Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            From
          </Text>
          <Text className="text-xl font-sregular">
            {user?.user.accountNumber} . Savings Account
          </Text>
          <Text className="text-md text-lighttext font-msegular">
            Available balance {user?.user.balance} KES
          </Text>
        </ScrollView>
      )}
      {/* send to mobile */}
      {transactionMobile && (
        <ScrollView className="h-full mt-5">
          <Text className="text-md text-lighttext font-sregular">
            Transaction
          </Text>
          <Text className="text-xl font-ssemibold">
            {parsedMobileDetails?.transactionVia}
          </Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            Amount
          </Text>
          <Text className="text-xl font-ssemibold">
            {parsedMobileDetails?.amount}.00 KES
          </Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            Charged
          </Text>
          <Text className="text-xl font-ssemibold">2.26 KES</Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            New balance
          </Text>
          <Text className="text-xl font-ssemibold">{newMobileBalance}</Text>

          <Text className="mt-5 text-md text-lighttext font-sregular">To</Text>
          <Text className="text-xl text-black font-sregular">
            {parsedMobileDetails?.parsedDetails.recipentDetails.firstname}
          </Text>
          <Text className="text-xl text-black font-sregular">
            +254{" "}
            {parsedMobileDetails?.parsedDetails.recipentDetails.AccountNumber}
          </Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            From
          </Text>
          <Text className="text-xl font-sregular">
            {user?.user.accountNumber} . Savings Account
          </Text>
          <Text className="text-md text-lighttext font-msegular">
            Available balance {user?.user.balance} KES
          </Text>
        </ScrollView>
      )}
      {/* send to bank */}
      {transactionBank && (
        <ScrollView className="h-full mt-5">
          <Text className="text-md text-lighttext font-sregular">
            Transaction
          </Text>
          <Text className="text-xl font-ssemibold">
            {parsedBankDetails?.transactionVia}
          </Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            Amount
          </Text>
          <Text className="text-xl font-ssemibold">
            {parsedBankDetails?.amount}.00 KES
          </Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            Charged
          </Text>
          <Text className="text-xl font-ssemibold">2.26 KES</Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            New balance
          </Text>
          <Text className="text-xl font-ssemibold">{newBankBalance}</Text>

          <Text className="mt-5 text-md text-lighttext font-sregular">To</Text>
          <Text className="text-xl text-black font-sregular">
            {parsedBankDetails?.parsedDetails.recipentDetails.firstname}
          </Text>
          <Text className="text-xl text-black font-sregular">
          
            {parsedBankDetails?.parsedDetails.recipentDetails.AccountNumber}
          </Text>
          <Text className="mt-5 text-md text-lighttext font-sregular">
            From
          </Text>
          <Text className="text-xl font-sregular">
            {user?.user.accountNumber} . Savings Account
          </Text>
          <Text className="text-md text-lighttext font-msegular">
            Available balance {user?.user.balance} KES
          </Text>
        </ScrollView>
      )}

      {transactionDetails && (
        <View className="mt-5">
          {/* checkbox */}

          <View className="flex-row px-5 gap-5">
            <Checkbox
              value={isFormValid}
              onValueChange={() => setIsFormValid(!isFormValid)}
              color={"#a32e2d"}
            />
            <Text className="text-xl font-ssemibold" maxFontSizeMultiplier={1}>
              I agree to the Western Union online{" "}
              <Text className="text-primary">terms and conditions</Text> and{" "}
              <Text className="text-primary">online privacy statements.</Text>
            </Text>
          </View>

          <TouchableOpacity
            className={
              !isFormValid
                ? "rounded-xl bg-[#d9d9d9] min-h-[50px] flex flex-row  justify-center gap-3 items-center mt-5"
                : "rounded-xl bg-primary min-h-[50px] flex flex-row  justify-center gap-3 items-center mt-5"
            }
            disabled={!isFormValid}
            onPress={handleConfirm}
          >
            <Text
              className={
                !isFormValid
                  ? "text-2xl text-[#8e8e90] font-ssemibold"
                  : "text-2xl text-white font-ssemibold"
              }
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {transactionEquity && (
        <View className="mt-5">
          <TouchableOpacity
            className={
              "rounded-xl bg-primary min-h-[50px] flex flex-row  justify-center gap-3 items-center mt-5"
            }
            onPress={handleEquityConfirm}
          >
            <Text className={"text-2xl text-white font-ssemibold"}>
              Send Money
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {transactionMobile && (
        <View className="mt-5">
          <TouchableOpacity
            className={
              "rounded-xl bg-primary min-h-[50px] flex flex-row  justify-center gap-3 items-center mt-5"
            }
            onPress={handleMobileConfirm}
          >
            <Text className={"text-2xl text-white font-ssemibold"}>
              Send Money
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {transactionBank && (
        <View className="mt-5">
          <TouchableOpacity
            className={
              "rounded-xl bg-primary min-h-[50px] flex flex-row  justify-center gap-3 items-center mt-5"
            }
            onPress={handleBankConfirm}
          >
            <Text className={"text-2xl text-white font-ssemibold"}>
              Send Money
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PaymentConfirmation;
