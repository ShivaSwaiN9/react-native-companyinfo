import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { UGImages } from "../assets/image"
import CustomCarousel from "../components/CustomCarousel"

const { width: screenWidth } = Dimensions.get("window")

const LoginScreen = ({ navigation }: any) => {
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const username = "Utkal"
    const currentTime = new Date()
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()

    const suffixOptions = [
      `${hours.toString().padStart(2, "0")}${(minutes - 1).toString().padStart(2, "0")}`,
      `${hours.toString().padStart(2, "0")}${(minutes - 2).toString().padStart(2, "0")}`,
      `${hours.toString().padStart(2, "0")}${(minutes - 3).toString().padStart(2, "0")}`,
    ]

    const isValidPassword = suffixOptions.some((suffix) => password === `${username}#${suffix}`)

    if (isValidPassword) {
      try {
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        Alert.alert("Success", "Login Successful!")
        navigation.navigate("Home")
      } catch (error) {
        console.error("Error saving data", error)
      }
    } else {
      Alert.alert("Error", "Invalid Password!")
    }
    setPassword("")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.topContainer}>
          <Image source={UGImages.logo} style={styles.logo} />
          <Text style={styles.title}>Welcome Back!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.carouselContainer}>
          <CustomCarousel />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  topContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20, 
  },
  logo: {
    width: 237,
    height: 43,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  carouselContainer: {
    flex: 0.4,
    marginBottom: 20,
    marginTop: 20,
  },
})

export default LoginScreen
