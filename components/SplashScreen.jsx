import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
    const animation = useRef<LottieView>(null);
  return (
    <View>
       <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../constants/Get_started_plain_end.json')}
      />
    </View>
  )
}

export default SplashScreen