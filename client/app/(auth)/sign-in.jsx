import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return; // Prevent submission if fields are empty
    }

    setSubmitting(true);

    try {
      // Attempt to sign in
      await signIn(form.email, form.password);

      const result = await getCurrentUser(); // Fetch the current user
      if (!result) {
        throw new Error("Failed to retrieve user details.");
      }

      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home"); // Navigate to the home screen
    } catch (error) {
      Alert.alert("Error", error.message); // Display error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#ffff', height: '100%' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 30,
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
             source={require("../../assets/farmer.webp")} // Assuming logo is set in constants
            resizeMode="contain"
            style={{ width: 150, height: 150, marginBottom: 20 }}
          />

          <Text style={{
            fontSize: 26,
            fontWeight: '600',
            color: '#333',
            marginBottom: 10,
          }}>
            Krishi Yog
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            marginBottom: 20,
          }}>
            Optimize farming practices with AI assistance
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{
              marginTop: 20,
              borderRadius: 50,
              backgroundColor: '#0000',
              padding: 15,
              borderColor: '#E0E0E0',
              borderWidth: 1,
              width: '100%',
            }}
            keyboardType="email-address"
            placeholder="Email"
            inputStyle={{
              color: '#333',
            }}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{
              marginTop: 20,
              borderRadius: 50,
              backgroundColor: '#FFF',
              padding: 15,
              borderColor: '#E0E0E0',
              borderWidth: 1,
              width: '100%',
            }}
            placeholder="Password"
            inputStyle={{
              color: '#333',
            }}
            secureTextEntry
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={{
              marginTop: 30,
              backgroundColor: '#F87171', // Soft red/pink color for button
              paddingVertical: 15,
              borderRadius: 50,
              width: '100%',
           }}
            textStyles={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
            }}
            isLoading={isSubmitting}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 14, color: '#999' }}>
              Don't have an account?
            </Text>
            <Link href="/sign-up" style={{ fontSize: 14, fontWeight: '600', color: '#F87171', marginLeft: 5 }}>
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
