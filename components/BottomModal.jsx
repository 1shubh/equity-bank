import { StyleSheet, Text, View, Modal,TouchableOpacity ,Image} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants/icons";
const BottomModal = ({ children, title,isVisible, onClose }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* content container */}
        <View className="w-full h-[90%] bg-white p-5 rounded-t-xl">
          <View className="flex-row items-center justify-between w-full">
            <TouchableOpacity onPress={onClose}>
              <Image source={icons.close} className="w-10 h-10" />
            </TouchableOpacity>
            <Text className="text-xl font-mregular text-center">{title}</Text>
            <Text className="text-white">j</Text>
          </View>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
