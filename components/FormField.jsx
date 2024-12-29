import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { icons } from "../constants/icons";

const FormField = ({
  title,
  showtitle,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  rightIcon,
  rightIconStyle,
  placeholderTextcolor,
  tintcolor,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={` ${otherStyles}`}>
      {showtitle && (
        <Text className="text-base text-white font-smedium">{title}</Text>
      )}
      <View className="w-full h-[50px] px-0 border-b-2 border-b-[#3E3A39] focus:border-green flex flex-row items-center">
        <TextInput
          className={`flex-1 font-sregular text-[16px]`}
          style={{ color: placeholderTextcolor }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#3E3A39"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
              tintColor={tintcolor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
