import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import LottieView from "lottie-react-native";

const Loader = ({ animationSource, size = 100, backgroundColor }) => {
  const animation = useRef(null); // Correctly using useRef instead of string refs
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Play the animation automatically on mount
    animation.current?.play();
  }, []);

  const restartAnimation = () => {
    if (animation.current) {
      setIsPlaying(true); // Disable the button while restarting
      animation.current.reset();
      animation.current.play();
      setTimeout(() => setIsPlaying(false), 1000); // Adjust timeout based on animation duration
    }
  };

  return (
    <View>
      <LottieView
        autoPlay
        loop
        ref={animation} // Using useRef for the ref
        style={{
          width: size,
          height: size,
          backgroundColor: backgroundColor,
        }}
        source={
          animationSource || require("../assets/animations/loader_light.json")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default Loader;
