import {
    View,
    Text,
    ActivityIndicator,
    Image,
    StyleSheet,
    Alert,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useGlobalContext } from "../hoc/GlobalProvider";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import Feather from "@expo/vector-icons/Feather";
  import { TouchableOpacity } from "react-native";
  import { router } from "expo-router";
  import FormField from "../components/FormField";
  import CustomButton from "../components/CustomButton";
  import { icons } from "../constants/icons";
  
  const EditProfile = () => {
    const { loading, user, logout } = useGlobalContext();
    const [userData, setUserData] = useState(null); // Store fetched user data
    const [name, setName] = useState(""); // State for name
    const [accountNumber, setAccountNumber] = useState(""); // State for account number
    const [balance, setBalance] = useState(""); // State for balance
    const [password, setPassword] = useState("");
    const [loadingEdit, setLoadingEdit] = useState(false);

    const handlePressOk = () => {
      logout();
      router.push("sign-in");
    };
    // Function to fetch user data by mobile number
    const fetchUserByMobile = async () => {
      if (!user || !user?.user?.mobileNumber) {
        return; // Exit early if user is null or no mobileNumber is available
      }
  
      try {
        const response = await fetch(
          `https://bank-backend-a00q.onrender.com/api/users/getUserByMobile/${user.user.mobileNumber}`
        );
        const data = await response.json();
  
        if (response.ok) {
          setUserData(data); // Save fetched user data
          setName(data.name); // Initialize name
          setAccountNumber(data.accountNumber); // Initialize account number
          setBalance(data.balance); // Initialize balance
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    // Function to handle form submission
    // Function to handle form submission
    const handleSubmit = async () => {
      setLoadingEdit(true); // Set loadingEdit to true when the submission starts
  
      try {
        const response = await fetch(
          `https://bank-backend-a00q.onrender.com/api/users/updateUser/${userData?._id}`, // Update the user endpoint
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mobileNumber: user?.user?.mobileNumber, // Pass the mobileNumber to identify the user
              name,
              accountNumber,
              balance,
              password,
            }),
          }
        );
  
        const data = await response.json();
        if (response.ok) {
          console.log("Profile updated successfully");
          Alert.alert("Profile Updated Successfully", "Please login again", [
            { text:"Signin"},
          ]);
          // Add any additional success logic, e.g., showing a success message
        } else {
          console.error("Failed to update profile:", data.message);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setLoadingEdit(false); // Set loadingEdit to false after the request completes
      }
    };
  
    // Fetch user data when component mounts
    useEffect(() => {
      if (user) {
        fetchUserByMobile();
      }
    }, [user]); // Only run when 'user' is defined
  
    return (
      <SafeAreaView>
        <View className="flex-row justify-between items-center py-5 px-5 bg-primary">
          <View className="flex-row gap-5 items-center">
            <Ionicons
              name="arrow-back"
              size={20}
              color="white"
              onPress={() => router.back()}
            />
  
            <Text className="font-semibold text-[17px] text-white uppercase">
              Edit Profile
            </Text>
          </View>
        </View>
        {loading || !userData ? (
          <View className="h-screen items-center justify-center">
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <View className="px-5">
            <View className="mt-5 flex-row items-center justify-between">
              <View className="w-[100px] h-[100px] rounded-full items-center justify-center overflow-hidden">
              <Image
                  source={icons.greenUser}
                  className="w-full h-full" // Use full width and height
                  resizeMode="cover" // Use cover for better fitting
                />
              </View>
            </View>
            <View>
              {/* FormFields with editable values */}
              <FormField
                title={"name"}
                placeholder={"name"}
                value={name}
                onChangeText={setName} // Handle name change
              />
              <FormField
                title={"account number"}
                placeholder={"account number"}
                value={accountNumber}
                onChangeText={setAccountNumber} // Handle account number change
              />
              <FormField
                title={"balance"}
                placeholder={"balance"}
                value={balance}
                onChangeText={setBalance} // Handle balance change
              />
              {/* Submit button */}
              <CustomButton
                title={"Submit"}
                containerStyles={"mt-5 bg-primary h-[50px]"}
                textStyles={"uppercase text-white font-semibold"}
                handlePress={handleSubmit} // Submit form data
              />
            </View>
          </View>
        )}
        {loadingEdit && (
          <View style={styles.overlay}>
            <View
              style={styles.spinnerContainer}
              className="flex-row gap-5 items-center"
            >
              <ActivityIndicator size="large" color="#00ff00" />
              <Text style={styles.loadingText} maxFontSizeMultiplier={1}>
                Please wait....
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  };
  
  export default EditProfile;
  
  const styles = StyleSheet.create({
    pinDisplay: {
      fontSize: 32,
      textAlign: "center",
      letterSpacing: 12,
      fontWeight: "bold",
      color: "#333",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 5,
    },
    numpadButton: {
      width: 90,
      height: 90,
      borderRadius: 50,
      backgroundColor: "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
    },
    numpadButtonText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333",
    },
    okButton: {
      backgroundColor: "#5cb85c",
      borderRadius: 50,
      width: 90,
      height: 90,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
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
    loadingText: {
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 10,
      color: "#333",
    },
  });
  