import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { images } from "../constants/images";
import { icons } from "../constants/icons";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { useGlobalContext } from "../hoc/GlobalProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import Loader from "../components/Loader";
import transactionHistoryLoading from "../assets/animations/transaction_history_loader_light.json";
// import { TextInput } from "react-native-web";
import { formatBalance, getInitials } from "../constants/getInitialName";
import MobileTransferCard from "../components/MobileTransferCard";
import BankTransferCard from "../components/BankTransfer";
import EquityTransferCard from "../components/EquityTransferCard";
const otherOptions = [
  {
    title: "Transact",
    icon: icons.transact,
    link: "transact",
  },
  {
    title: "Account Information",
    icon: icons.borrow,
    link: "",
  },
  {
    title: "View Statement",
    icon: icons.save,
    link: "",
  },
  {
    title: "Balance Information",
    icon: icons.save,
    link: "",
  },
];
const MyAccount = () => {
  const { loading, user, login } = useGlobalContext();
  const [Statement, setStatement] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null); // Store fetched user data
  // console.log(user.user.statement);
  // console.log(Statement)
  // const statement = user.user.statement;
  function formatDate(dateString, includeDay = false) {
    const dateObj = new Date(dateString);

    // Get the short month name (e.g., "Oct")
    const month = dateObj.toLocaleString("en-US", { month: "short" });

    if (includeDay) {
      // Get the day and return it with the month (e.g., "19 Oct")
      const day = dateObj.getDate();
      return `${day} ${month}`;
    }

    // Return only the month (e.g., "Oct")
    return month;
  }
  const fetchUserByMobile = async () => {
    setisLoading(true);
    try {
      const mobileNumber = user?.user?.mobileNumber; // Assuming mobileNumber is available in global context
      if (!mobileNumber) return;
      const response = await fetch(
        `https://bank-backend-1-4cqz.onrender.com/api/users/getUserByMobile/${mobileNumber}`
      );
      const data = await response.json();
      if (response.ok) {
        setUserData(data); // Save fetched user data
        setStatement(data.statement);
        setisLoading(false);
      } else {
        console.error("Failed to fetch user data:", data.message);
        setisLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setisLoading(false);
    }
  };
  const latestStatement = Statement.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];
  useEffect(() => {
    fetchUserByMobile();
  }, []);
  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // await login()
      await fetchUserByMobile(); // Refresh user data
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false); // End refreshing state
    }
  };

  const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toISOString().split("T")[0]; // Extract date in 'YYYY-MM-DD' format
      if (!acc[date]) {
        acc[date] = []; // Initialize an array for the date if it doesn't exist
      }
      acc[date].push(transaction); // Push the transaction into the corresponding date array
      return acc;
    }, {});
  };

  const groupedTransactions = groupTransactionsByDate(Statement);

  // Transform grouped data into an array format if needed
  const groupedTransactionsArray = Object.entries(groupedTransactions).map(
    ([date, transactions]) => ({
      date,
      transactions,
    })
  );

  return (
    <View className="bg-white h-full">
      <View className="flex-row items-center justify-between px-5 py-5">
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
          My account
        </Text>
        <TouchableOpacity className="rounded-full p-2">
          <Entypo name="dots-three-horizontal" size={24} color="#a32e2d" />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="h-[200px] mt-5 overflow-hidden rounded-2xl w-[80%] ml-auto mr-auto">
          <ImageBackground
            source={images.redBg}
            className="w-full h-full py-5 px-5 flex-2 justify-between"
            resizeMode="cover"
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white font-sregular text-center text-2xl">
                {user?.user.name}
              </Text>
              {/* <Text className="text-white font-ssemibold text-3xl">
                {user?.user.balance} KES
              </Text> */}
            </View>
            <View className="flex-row justify-between items-center">
              <View className="w-[50%]"></View>
              <View className="mr-0">
                <Text
                  className="text-xl text-white font-ssemibold"
                  maxFontSizeMultiplier={1}
                >
                  Savings Account
                </Text>
                <Text
                  className="text-white text-xl font-ssemibold"
                  maxFontSizeMultiplier={1}
                >
                  {user?.user.accountNumber}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* balance */}
        <Text className="text-2xl mt-5 text-center text-lighttext font-sregular">
          Available Balance
        </Text>
        <View className="flex-row items-center justify-center gap-3">
          <Text className="text-3xl font-ssemibold">
            {formatBalance(user?.user.balance)} KES
          </Text>

          <AntDesign name="down" size={24} color="#a32e2d" />
        </View>
        <View className="flex-row justify-between gap-2 mt-5 w-[85%] ml-auto mr-auto border-b border-b-lightbg pb-5">
          {otherOptions.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                className="items-center w-[80px]"
                onPress={() => router.push(ele.link)}
              >
                <View className="bg-primary w-[50px] h-[50px] rounded-full object-contain p-2 items-center justify-center">
                  <Image
                    source={ele.icon}
                    tintColor={"white"}
                    className="w-8 h-8 object-contain"
                  />
                </View>
                <Text className="text-[12px] font-mregular text-center mt-2">
                  {ele.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {/* transactions */}
        {isloading ? (
          <View className="items-center justify-center mt-5">
            <Loader animationSource={transactionHistoryLoading} size={700} />
          </View>
        ) : (
          <View className="">
            <Text className="text-2xl font-ssemibold ml-5">
              Transaction History
            </Text>
            <View className="px-5 flex-row items-center justify-between mt-5 gap-2">
              <View className="border border-black w-[85%] h-[50px] bg-lightbg rounded-[50px] flex-row items-center justify-between px-5">
                <TextInput
                  placeholder="Search"
                  className="text-xl h-full font-ssemibold w-[80%]"
                  // value={searchText}
                  // onChangeText={handleSearch}
                />
                <AntDesign name="search1" size={20} color="black" />
              </View>
              <TouchableOpacity className="rounded-full bg-disabledBG w-[50px] h-[50px]">
                <Image
                  source={icons.filter}
                  className="w-6 h-6 object-contain m-auto"
                  tintColor={"#a32e2d"}
                />
              </TouchableOpacity>
            </View>
            {/*transaction tabs*/}
            <View className="mt-5 flex-row items-center">
              <TouchableOpacity className="w-1/2 border-b-2 pb-5 border-primary">
                <Text className="text-center text-xl font-ssemibold text-primary">
                  Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-1/2 pb-5 border-b-2 border-b-disabledBG">
                <Text className="text-center text-xl font-ssemibold">
                  In progress(0)
                </Text>
              </TouchableOpacity>
            </View>

            <View className="px-5 mt-5 gap-8">
              {groupedTransactionsArray.map((ele, i) => {
                return (
                  <View key={i}>
                    {/* date */}
                    <Text
                      className="text-2xl font-ssemibold text-primary ml-2"
                      maxFontSizeMultiplier={1}
                    >
                      {formatDate(ele.date, true)}
                    </Text>
                    {/* transaction */}
                    {ele.transactions.map((data, index) => {
                      return (
                        <View key={index}>
                          {data.details.type === "mobile-transfer" ? (
                            <MobileTransferCard ele={data} />
                          ) : data.details.type === "bank-transfer" ? (
                            <BankTransferCard ele={data} />
                          ) : data.details.type === "equity-transfer" ? (
                            <EquityTransferCard ele={data} />
                          ) : (
                            <>
                              <View className=" bg-lightbg mt-2 border-disabledBG border p-5 h-fit rounded-2xl flex-row items-center gap-3">
                                <View>
                                  <Image
                                    source={
                                      data.transactionType === "debit"
                                        ? icons.arrowUp
                                        : icons.downright
                                    }
                                    className="w-10 h-10"
                                    tintColor={"#a32e2d"}
                                  />
                                </View>
                                <View className="w-[80%]">
                                  <Text
                                    className="text-xl font-sregular"
                                    maxFontSizeMultiplier={1}
                                  >
                                    Sms Charge
                                  </Text>
                                  <Text
                                    className="mt-2 text-2xl font-sbold"
                                    maxFontSizeMultiplier={1}
                                  >
                                    {formatBalance(data.details.smsCharges)} KES
                                  </Text>
                                </View>
                              </View>
                              <View className=" bg-lightbg mt-2 border-disabledBG border p-5 h-fit rounded-2xl flex-row items-center gap-3">
                                <View>
                                  <Image
                                    source={
                                      data?.transactionType === "debit"
                                        ? icons.arrowUp
                                        : icons.downright
                                    }
                                    className="w-10 h-10"
                                    tintColor={"#a32e2d"}
                                  />
                                </View>
                                <View>
                                  <Text
                                    className="text-xl font-sregular text-lighttext"
                                    maxFontSizeMultiplier={1}
                                  >
                                    App/
                                    {data.details
                                      ? `${data.details.transactionVia}`
                                      : "Transaction details here"}
                                  </Text>
                                  <Text
                                    className="text-[15px] font-sregular text-lighttext"
                                    maxFontSizeMultiplier={1}
                                  >
                                    {`${data.details.parsedDetails.recipentDetails.selectedBankName}`}
                                  </Text>
                                  <Text
                                    className="text-xl font-sregular text-lighttext"
                                    maxFontSizeMultiplier={1}
                                  >
                                    {`${data.details.parsedDetails.recipentDetails.AccountNumber}`}
                                  </Text>
                                  <Text
                                    className="text-xl font-sregular text-lighttext"
                                    maxFontSizeMultiplier={1}
                                  >
                                    {data.details
                                      ? `${data.details.parsedDetails.recipentDetails.firstname} ${data.details.parsedDetails.recipentDetails.middleName} ${data.details.parsedDetails.recipentDetails.lastName}`
                                      : "User name here"}
                                  </Text>
                                  <Text
                                    className="mt-2 text-2xl font-sbold"
                                    maxFontSizeMultiplier={1}
                                  >
                                    {formatBalance(data.amount)} KES
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyAccount;
