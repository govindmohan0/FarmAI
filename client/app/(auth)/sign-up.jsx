import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
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
            Create your account to get started
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={{
              marginTop: 20,
              borderRadius: 50,
              backgroundColor: '#FFF',
              padding: 15,
              borderColor: '#E0E0E0',
              borderWidth: 1,
              width: '100%',
            }}
            placeholder="Username"
            inputStyle={{
              color: '#333',
            }}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{
              marginTop: 20,
              borderRadius: 50,
              backgroundColor: '#FFF',
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
            secureTextEntry
            inputStyle={{
              color: '#333',
            }}
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles={{
              marginTop: 30,
              backgroundColor: '#298b71', // Soft red/pink color for button
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
              Have an account already?
            </Text>
            <Link href="/sign-in" style={{ fontSize: 14, fontWeight: '600', color: '#F87171', marginLeft: 5 }}>
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
