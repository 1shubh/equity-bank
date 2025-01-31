import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../constants/icons";
import { generateTransactionNumber } from "../constants/getInitialName";
import { formatBalance } from "../constants/getInitialName";
const BankTransferCard = ({ ele }) => {
  const randomTransaction = generateTransactionNumber();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const generateAccountNumber = () => {
    let transactionNumber = "";
    for (let i = 0; i < 12; i++) {
      const randomDigit = Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
      transactionNumber += randomDigit;
    }
    return transactionNumber;
  };
  const randomSmsAccount = generateAccountNumber();
  return (
    <>
      <View className=" bg-lightbg mt-2 border-disabledBG border p-5 h-fit rounded-2xl flex-row items-center gap-3">
        <View>
          <Image
            source={
              ele.transactionType === "debit" ? icons.arrowUp : icons.downright
            }
            className="w-10 h-10"
            tintColor={"#a32e2d"}
          />
        </View>
        <View className="w-[80%]">
          <Text className="text-xl font-sregular" maxFontSizeMultiplier={1}>
            Tpg comm {randomTransaction} eqt/{randomSmsAccount}/
            {formatDate(ele.date)}
          </Text>
          <Text className="mt-2 text-2xl font-sbold" maxFontSizeMultiplier={1}>
          {formatBalance(ele.details.smsCharges)} KES
          </Text>
        </View>
      </View>
      <View className=" bg-lightbg mt-2 border-disabledBG border p-5 h-fit rounded-2xl flex-row items-center gap-3">
        <View>
          <Image
            source={
              ele.transactionType === "debit" ? icons.arrowUp : icons.downright
            }
            className="w-10 h-10"
            tintColor={"#a32e2d"}
          />
        </View>
        <View className="w-[80%]">
          <Text className="text-xl font-sregular" maxFontSizeMultiplier={1}>
            Tpg/
            {ele.details ? `${ele.details.transactionNumber}` : ""}/
            {ele.details?.parsedDetails.recipentDetails.selectedBankName}/
            {ele.details.parsedDetails.recipentDetails.firstname}{" "}
            {ele.details.parsedDetails.recipentDetails.middleName}{" "}
            {ele.details.parsedDetails.recipentDetails.lastName}
          </Text>
          <Text className="mt-2 text-2xl font-sbold" maxFontSizeMultiplier={1}>
            {formatBalance(ele.amount)} KES
          </Text>
        </View>
      </View>
    </>
  );
};

export default BankTransferCard;
