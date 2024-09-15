import { useState } from "react";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

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

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image" ? ["image/png", "image/jpg", "image/jpeg"] : [],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          image: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if ((form.prompt === "") | (form.title === "") | !form.image) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createImagePost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
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
        <Text className="text-2xl text-black font-psemibold mb-6">Upload Image</Text>
        <FormField

        
  title="Image Title"
  className="text-black"  // This will be displayed in black
  value={form.title}
  placeholder="Give your image a catchy title..."
  handleChangeText={(e) => setForm({ ...form, title: e })}
  otherStyles={{ marginTop: 10 }}
  color="black"  // Ensure the title text color is black
/>


        <View className="mt-7 space-y-2">
<<<<<<< HEAD
          <Text className="text-base text-black font-pmedium">
            Upload Image
          </Text>

          <TouchableOpacity onPress={openPicker} >
=======
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
>>>>>>> 56d193f716eb5bda6e3d5d780e8073b9e15285e9
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl mb-7"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

<<<<<<< HEAD
=======
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your image...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

>>>>>>> 56d193f716eb5bda6e3d5d780e8073b9e15285e9
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
