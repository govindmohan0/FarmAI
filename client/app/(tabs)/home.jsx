import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending } from "../../components";
import ImageCard from "../../components/ImageCard";


//import Weather from "../../components/Weather"; // Import Weather component

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-white">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <ImageCard
            title={item.title}
            image={item.image}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-lg text-black mt-3">
                  Welcome Back
                </Text>
                <Text className="px-2 text-4xl font-psemibold mt-2 text-black">
                  FarmAi
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={{ uri: "https://imgs.search.brave.com/DLJHBk3Fk9_f-ljzS9NgwTmnNZoXcMADExv3mQsqNeo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC81MS80MS9m/dW5ueS1jYXJ0b29u/LWZhcm1lci1sb2dv/LWFncmljdWx0dXJl/LWZhcm1pbmctdmVj/dG9yLTI3MjQ1MTQx/LmpwZw" }}
                  style={{ width: 100, height: 90, paddingTop: "20px" }}
                  resizeMode="contain"
                />
              </View>
            </View>



            {/* Add Weather component here */}
           {/*  <Weather />   */}






            <Text className="text-2xl font-pregular text-black mb-3">
              Latest Posts
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Post Found" subtitle="No Post created yet" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
