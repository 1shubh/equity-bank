import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  LeftIcon,
  lefticonStyle,
  isTyping,
  disabled,
  btnColor,
  textColor,
}) => {
  const isButtonDisabled = isLoading || disabled;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[50px] flex flex-row justify-center items-center ${containerStyles} ${
        isButtonDisabled ? "bg-black-100" : btnColor
      }`}
      disabled={isButtonDisabled}
    >
      <Text
        className={` font-ssemibold text-lg ${textStyles} ${
          isButtonDisabled ? "text-gray-400" : textColor
        }`}
      >
        {isLoading ? (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            className="ml-2"
          />
        ) : (
          title
        )}
      </Text>
      <View className={lefticonStyle}>{LeftIcon}</View>
    </TouchableOpacity>
  );
};

export default CustomButton;
