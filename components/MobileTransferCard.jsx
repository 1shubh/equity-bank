import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../constants/icons";
import { formatBalance } from "../constants/getInitialName";
const MobileTransferCard = ({ ele }) => {
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
            Sms Charge
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
            App/
            {ele.details
              ? `${ele.details?.parsedDetails.recipentDetails.selectedBankName}`
              : ""}
            /{`${ele.details?.parsedDetails.recipentDetails.AccountNumber}`}/
            {ele.details.transactionNumber}/{" "}
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

export default MobileTransferCard;
