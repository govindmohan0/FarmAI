import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants"; // Make sure this path is correct
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="relative mt-20">
        <Text className="text-5xl text-black font-bold text-center">
          FarmAI
        </Text>
        <Text className="text-lg text-black mt-2 text-center">
          Optimize your farming practices with AI
        </Text>
      </View>

      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="mb-20 w-full flex justify-center items-center h-full px-4">
          {/* Correct Image Usage */}
          <Image
            source={images.logo}
            className="w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="mt-20 w-full">
            <CustomButton
              title="Get started"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full bg-black p-4 rounded-full "
              textStyles="text-white text-lg font-bold"
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0000" style="dark" />
    </SafeAreaView>
  );
};

export default Welcome;
