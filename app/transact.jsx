import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants/icons";
import { ScrollView } from "react-native";
import transactEquity from "../assets/icons/transact-equity.png";
import transactAccount from "../assets/icons/transact-account.png";
import transactMobile from "../assets/icons/transact-mobile.png";
import transactBank from "../assets/icons/transact-bank.png";
import { images } from "../constants/images";
import Loader from "../components/Loader";
import { router } from "expo-router";

const payOptions = [
  {
    title: "All",
  },
  {
    title: "Send Money",
  },
  {
    title: "Pay with Equity",
  },
  {
    title: "Buy",
  },
  {
    title: "Withdraw Cash",
  },
  {
    title: "Remmittence",
  },
];

const sendMoney = [
  {
    title: "Own Equity account",
    icon: transactEquity,
    link: "",
  },
  {
    title: "Another Equity accounts",
    icon: transactAccount,
    link: "",
  },
  {
    title: "Pay to card",
    icon: icons.card,
    link: "",
  },
  {
    title: "Mobile money",
    icon: transactMobile,
    link: "",
  },
  {
    title: "Another Bank",
    icon: transactBank,
    link: "",
  },
];

const paywithequity = [
  {
    title: "Pay a bill",
    icon: icons.bills,
    link: "",
  },
  {
    title: "Buy goods",
    icon: icons.goods,
    link: "",
  },
];

const buy = [
  {
    title: "Buy Airtime",
    icon: icons.airtime,
    link: "",
  },
];
const agent = [
  {
    title: "Agent",
    icon: icons.agent,
    link: "",
  },
];
const remittence = [
  {
    title: "Paypal",
    icon: icons.paypal,
    link: "",
  },
  {
    title: "Western Union",
    icon: icons.western,
    link: "",
  },
];
const Transact = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const handleCloseScanner = () => {
    setModalVisible(false);
  };
  const handleJoinPress = () => {
    setModalVisible(true);
  };
  return (
    <View className="px-5 py-5 bg-white h-full">
      {/* header */}
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
          Transact
        </Text>
        <TouchableOpacity className="rounded-full p-2">
          <Image
            source={icons.notification}
            className="w-10 h-10"
            tintColor={"#a32e2d"}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* links */}
        <View>
          <Text
            className="text-2xl font-msemibold mt-5"
            maxFontSizeMultiplier={1}
          >
            What would you like to do ?
          </Text>
          {/* horizontal scroll */}
          <ScrollView
            className="gap-5 py-5 w-full mt-2"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {payOptions.map((ele, i) => {
              return (
                <View
                  key={i}
                  className={
                    i === 0
                      ? "border-2 border-primary px-5 h-[50px] items-center justify-center rounded-md"
                      : "border border-gray-100 px-5 h-[50px] items-center justify-center rounded-md"
                  }
                  style={{
                    marginLeft: i === 0 ? 0 : 10,
                  }}
                >
                  <Text
                    className={
                      i === 0
                        ? "text-xl text-primary font-mregular"
                        : "text-center text-xl font-mregular"
                    }
                  >
                    {ele.title}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View className="bg-[#fdf0ec] h-[200px] rounded-xl flex-row items-center gap-10 px-5">
          <Image source={images.calender} />
          <View>
            <Text className="text-xl text-primary font-mbold">
              Schedule Payments
            </Text>
            <Text className="text-xl font-mbold w-[70%]">
              Manage recurring payments.
            </Text>
            <TouchableOpacity className="bg-primary rounded-xl h-[50px] items-center justify-center w-[60%] ml-10 mt-5">
              <Text className="text-white font-msemibold">Manage here</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* send money */}
        <View>
          <Text className="text-2xl font-msemibold mt-5 mb-5">Send Money</Text>
          <FlatList
            data={sendMoney}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Set number of columns to 3
            // contentContainerStyle={{ alignItems: "center" }} // Center the grid
            columnWrapperStyle={{
              justifyContent: "",
              gap: 10,
              marginBottom: 10,
            }}
            renderItem={({ item }) => (
              <View className="bg-[#f7f7f7] w-[32%] h-[120px]  items-center justify-center rounded-xl py-2 px-2">
                <Image
                  source={item.icon}
                  tintColor={"#a32e2d"}
                  className="w-[40px] h-[40px]"
                  resizeMode="contain"
                />
                <Text className="text-center font-mregular text-md">
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
        {/* pay with equity */}
        <View>
          <Text className="text-2xl font-msemibold mt-5 mb-5">
            Pay with Equity
          </Text>
          <FlatList
            data={paywithequity}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Set number of columns to 3
            // contentContainerStyle={{ alignItems: "center" }} // Center the grid
            columnWrapperStyle={{
              justifyContent: "",
              gap: 10,
              marginBottom: 10,
            }}
            renderItem={({ item }) => (
              <View className="bg-[#f7f7f7] w-[32%] h-[100px]  items-center justify-center rounded-xl py-2 px-5">
                <Image
                  source={item.icon}
                  tintColor={"#a32e2d"}
                  className="w-[30px] h-[35px]"
                  resizeMode="contain"
                />
                <Text className="text-center font-mregular text-md">
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
        {/* buy airtime */}
        <View>
          <Text className="text-2xl font-msemibold mt-5 mb-5">Buy Airtime</Text>
          <FlatList
            data={buy}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Set number of columns to 3
            // contentContainerStyle={{ alignItems: "center" }} // Center the grid
            columnWrapperStyle={{
              justifyContent: "",
              gap: 10,
              marginBottom: 10,
            }}
            renderItem={({ item }) => (
              <View className="bg-[#f7f7f7] w-[32%] h-[100px]  items-center justify-center rounded-xl py-2 px-5">
                <Image
                  source={item.icon}
                  tintColor={"#a32e2d"}
                  className="w-[30px] h-[35px]"
                  resizeMode="contain"
                />
                <Text className="text-center font-mregular text-md">
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
        {/* agent */}
        <View>
          <Text className="text-2xl font-msemibold mt-5 mb-5">
            Withdraw money
          </Text>
          <FlatList
            data={agent}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Set number of columns to 3
            // contentContainerStyle={{ alignItems: "center" }} // Center the grid
            columnWrapperStyle={{
              justifyContent: "",
              gap: 10,
              marginBottom: 10,
            }}
            renderItem={({ item }) => (
              <View className="bg-[#f7f7f7] w-[32%] h-[100px]  items-center justify-center rounded-xl py-2 px-5">
                <Image
                  source={item.icon}
                  tintColor={"#a32e2d"}
                  className="w-[40px] h-[45px]"
                  resizeMode="contain"
                />
                <Text className="text-center font-mregular text-md">
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
        {/* Remmitence */}
        <View>
          <Text className="text-2xl font-msemibold mt-5 mb-5">Remittance</Text>
          <FlatList
            data={remittence}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Set number of columns to 3
            // contentContainerStyle={{ alignItems: "center" }} // Center the grid
            columnWrapperStyle={{
              justifyContent: "",
              gap: 10,
              marginBottom: 10,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-[#f7f7f7] w-[32%] h-[100px]  items-center justify-center rounded-xl py-2 px-5"
                onPress={handleJoinPress}
              >
                <View
                  className={
                    item.title === "Western Union"
                      ? "bg-black rounded-full"
                      : ""
                  }
                >
                  <Image
                    source={item.icon}
                    className="w-[45px] h-[45px] rounded-full"
                    resizeMode="contain"
                  />
                </View>

                <Text className="text-center font-mregular text-md">
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseScanner}
      >
        <View style={styles.modalOverlay}>
          <View className="w-full h-[80%] bg-white p-5 rounded-t-xl">
            <View className="flex-row items-center justify-between w-full">
              <TouchableOpacity onPress={handleCloseScanner}>
                <Image source={icons.close} className="w-10 h-10" />
              </TouchableOpacity>
              <Text className="text-xl font-mregular text-center">
                Western Union
              </Text>
              <Text className="text-white">j</Text>
            </View>
            <View className="h-[60%]">
              <Text className="mt-5 text-2xl font-ssemibold">
                Please Select Transaction Type
              </Text>
              {/* Send */}
              <TouchableOpacity
                className="flex-row items-center justify-between mt-5"
                onPress={() => router.push("westernunion")}
              >
                <View className="bg-[#eaeaea] w-20 h-20 rounded-full items-center justify-center">
                  <Image
                    source={icons.account}
                    className="w-10 h-10"
                    resizeMode="contain"
                    tintColor={"#a32e2d"}
                  />
                </View>
                <View className="w-[70%] ml-5">
                  <Text className="text-2xl text-primary font-ssemibold">
                    Send Money
                  </Text>
                  <Text className="text-xl text-[#7f7e7e] font-ssemibold">
                    Send money internationally to bank, mobile wallet or
                  </Text>
                </View>
                <View className="w-20">
                  <Image
                    source={icons.next}
                    className="w-10 h-10"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              {/* recive */}
              <TouchableOpacity className="flex-row items-center justify-between mt-5">
                <View className="bg-[#eaeaea] w-20 h-20 rounded-full items-center justify-center">
                  <Image
                    source={icons.borrow}
                    className="w-10 h-10"
                    resizeMode="contain"
                    tintColor={"#a32e2d"}
                  />
                </View>
                <View className="w-[70%] ml-5">
                  <Text className="text-2xl text-primary font-ssemibold">
                    Receive Money
                  </Text>
                  <Text className="text-xl text-[#7f7e7e] font-ssemibold">
                    Receive money by entering a Western Union tracking
                  </Text>
                </View>
                <View className="w-20">
                  <Image
                    source={icons.next}
                    className="w-10 h-10"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Transact;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
