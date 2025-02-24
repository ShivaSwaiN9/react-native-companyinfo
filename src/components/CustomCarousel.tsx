import React, { useState, useRef, useEffect } from "react"
import { View, Image, StyleSheet, Dimensions, Animated } from "react-native"
import { logos } from "../assets/images1"


const { width: screenWidth } = Dimensions.get("window")
const imageWidth = screenWidth * 0.8

const advertisementData = [
  { id: "1", image: logos.IP },
  { id: "2", image: logos.MYJOB },
  { id: "3", image: logos.mrnew },
  { id: "4", image: logos.odo },
  { id: "5", image: logos.utkalbottling },
  { id: "6", image: logos.utkalcorporation },
  { id: "7", image: logos.utkaleducation },
  { id: "8", image: logos.utkalfacility },
  { id: "9", image: logos.utkalfoundation },
  { id: "10", image: logos.utkalglobal },
  { id: "11", image: logos.utkalhome },
  { id: "12", image: logos.utkalinternational },
  { id: "13", image: logos.utkalone },
  { id: "14", image: logos.utkalpower },
  { id: "15", image: logos.utkalsmart },
  { id: "16", image: logos.ZSecurity },
  { id: "17", image: logos.logo },
  { id: "18", image: logos.Ayushman },
  { id: "19", image: logos.Topfront },
  { id: "20", image: logos.maxim },
  {id: "21", image: logos.Homedeal}
]

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisementData.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: currentIndex * imageWidth,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [currentIndex, scrollX])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [0, imageWidth * advertisementData.length],
                  outputRange: [0, -imageWidth * advertisementData.length],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        {advertisementData.map((item, index) => (
          <View key={item.id} style={styles.imageWrapper}>
            <Image source={item.image} style={styles.image} resizeMode="center" />
          </View>
        ))}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 200,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    flexDirection: "row",
    width: imageWidth * advertisementData.length,
  },
  imageWrapper: {
    width: imageWidth,
    height: 180, // Increased for better centering
    justifyContent: "center",
    alignItems: "center",
    marginRight: -1
  },
  image: {
    width: imageWidth * 0.8, // Slightly reduced width
    height: "100%", // Auto height to avoid cropping
  },
})


export default CustomCarousel

