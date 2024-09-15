import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const Bookmark = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePredict = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        name: "image.jpg",
        type: "image/jpeg",
      });

      const response = await fetch("YOUR_FASTAPI_ENDPOINT", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setPrediction(result);
      } else {
        setError(result.message || "An error occurred");
      }
    } catch (err) {
      setError("An error occurred while sending the request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-4 py-6">
      <Text className="text-xl font-semibold text-gray-300 mb-2">Upload Image</Text>

      <TouchableOpacity
        onPress={pickImage}
        className="border-2 border-dashed border-yellow-400 flex items-center justify-center h-48 mb-4 rounded-lg"
      >
        {image ? (
          <Image source={{ uri: image }} className="w-full h-full rounded-lg object-cover" />
        ) : (
          <View className="flex items-center justify-center">
            <Text className="text-yellow-400">Click to upload</Text>
          </View>
        )}
      </TouchableOpacity>

      <View className="mt-6">
        <TouchableOpacity
          onPress={handlePredict}
          className="bg-green-600 py-4 px-5 rounded-lg"
        >
          <Text className="text-white text-lg text-center">
            {loading ? <ActivityIndicator color="white" /> : "Predict"}
          </Text>
        </TouchableOpacity>
      </View>

      {prediction && (
        <View className="mt-6">
          <Text className="text-white text-lg">Prediction Result:</Text>
          <Text className="text-gray-300 mt-2">{JSON.stringify(prediction)}</Text>
        </View>
      )}

      {error && (
        <View className="mt-6">
          <Text className="text-red-500 text-lg">Error:</Text>
          <Text className="text-red-400 mt-2">{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Bookmark;
