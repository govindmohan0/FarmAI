import React, { useState,useEffect } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { translation } from "../../components/utils"
import AsyncStorage from "@react-native-async-storage/async-storage";



import { icons } from "../../constants";
import { createImagePost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";



const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: null,
    prompt: "",
  });


  

  // Request permissions for the Image Picker
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access media is required!"
      );
    }
  };

  // Open the image picker
  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({
        ...form,
        image: result.assets[0],
      });
    } else {
      Alert.alert("No image selected");
    }
  };

  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };

  const submit = async () => {
    if (form.prompt === "" || form.title === "" || !form.image) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createImagePost({
        ...form,
        userId: user.$id,
        imageUrl: form.image.uri, // Assuming your backend requires an image URL
      });

      Alert.alert("Success", "Image post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        image: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-black font-psemibold mb-6">{selectedLang == 0
                      ? translation[1].English
                      : selectedLang == 1
                      ? translation[1].Tamil
                      : selectedLang == 2
                      ? translation[1].Hindi
                      : selectedLang == 3
                      ? translation[1].Punjabi
                      : selectedLang == 4
                      ? translation[1].Urdu
                      : null}</Text>
        <FormField

        
  title={selectedLang == 0
    ? translation[4].English
    : selectedLang == 1
    ? translation[4].Tamil
    : selectedLang == 2
    ? translation[4].Hindi
    : selectedLang == 3
    ? translation[4].Punjabi
    : selectedLang == 4
    ? translation[4].Urdu
    : null}
  className="text-black"  // This will be displayed in black
  value={form.title}
  placeholder={selectedLang == 0
    ? translation[5].English
    : selectedLang == 1
    ? translation[5].Tamil
    : selectedLang == 2
    ? translation[5].Hindi
    : selectedLang == 3
    ? translation[5].Punjabi
    : selectedLang == 4
    ? translation[5].Urdu
    : null}
  handleChangeText={(e) => setForm({ ...form, title: e })}
  otherStyles={{ marginTop: 10 }}
  color="black"  // Ensure the title text color is black
/>


        <View className="mt-7 space-y-2">
          <Text className="text-base text-black font-pmedium">
          {selectedLang == 0
                      ? translation[1].English
                      : selectedLang == 1
                      ? translation[1].Tamil
                      : selectedLang == 2
                      ? translation[1].Hindi
                      : selectedLang == 3
                      ? translation[1].Punjabi
                      : selectedLang == 4
                      ? translation[1].Urdu
                      : null}
          </Text>

          <TouchableOpacity onPress={openPicker} >
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl mb-7"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title={selectedLang == 0
            ? translation[6].English
            : selectedLang == 1
            ? translation[6].Tamil
            : selectedLang == 2
            ? translation[6].Hindi
            : selectedLang == 3
            ? translation[6].Punjabi
            : selectedLang == 4
            ? translation[6].Urdu
            : null}
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
