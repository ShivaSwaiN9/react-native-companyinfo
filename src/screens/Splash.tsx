import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logos } from "../assets/images1";
import { UGImages } from "../assets/image";

// Define navigation type
type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined; // Add Home screen
};

type NavigationProps = StackNavigationProp<RootStackParamList, "Splash">;

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SplashScreen = () => {
  const rotation = useSharedValue(0);
  const logoOpacity = useSharedValue(1);
  const circleOpacity = useSharedValue(0);

  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    // Step 1: Start rotating animation
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 7000,
        easing: Easing.linear,
      }),
      -1
    );

    // Step 2: Fade in rotating logos after 1 sec
    setTimeout(() => {
      circleOpacity.value = withTiming(1, { duration: 1000 });
    }, 1000);

    // Step 3: Check AsyncStorage and navigate accordingly
    setTimeout(async () => {
      logoOpacity.value = withTiming(0, { duration: 1000 });
      circleOpacity.value = withTiming(0, { duration: 1000 });

      setTimeout(async () => {
        try {
          const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
          if (isLoggedIn && JSON.parse(isLoggedIn)) { // Convert "true" -> true
            navigation.replace("Home");
          } else {
            navigation.replace("Login");
          }
        } catch (error) {
          console.error("Error checking login status:", error);
          navigation.replace("Login"); // Default to login if there's an error
        }
      }, 1000);
    }, 3000);
  }, []);

  // Animated styles
  const animatedRotation = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animatedCircleOpacity = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
  }));

  const animatedLogoOpacity = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Rotating Logos */}
      <Animated.View
        style={[styles.circle, animatedRotation, animatedCircleOpacity]}
      >
        {Object.values(logos).map((source, index) => {
          const angle = (index / Object.values(logos).length) * (2 * Math.PI);
          const radius = 160;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <AnimatedImage
              key={index}
              source={source}
              style={[
                styles.logo,
                {
                  position: "absolute",
                  left: 80 + x,
                  top: 80 + y,
                  transform: [{ rotate: `${-rotation.value}deg` }],
                },
              ]}
            />
          );
        })}
      </Animated.View>

      {/* Center Logo */}
      <Animated.Image
        source={UGImages.logo}
        style={[styles.centerLogo, animatedLogoOpacity]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  circle: {
    width: 200,
    height: 200,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  centerLogo: {
    position: "absolute",
    width: 190,
    height: 190,
    resizeMode: "contain",
  },
});

export default SplashScreen;
