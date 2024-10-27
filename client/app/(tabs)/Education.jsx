import React, { useState,useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView, ProgressBarAndroid, Linking } from 'react-native';
import { translation } from "../../components/utils"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";

const fertilizers = [
  { id: '1', name: 'Nitrogen Fertilizer', description: 'Boosts plant growth.' },
  { id: '2', name: 'Phosphorus Fertilizer', description: 'Improves root growth.' },
  { id: '3', name: 'Potassium Fertilizer', description: 'Enhances flower and fruit production.' },
];

const videos = [
  { id: '1', title: 'How to Use Nitrogen Fertilizers', thumbnail: 'https://imgs.search.brave.com/nI2ys35bQr6tYC7Sa9iZY1dBKrIO2lmXY3pBKGcNRUw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM0/MzA1NTU0L3Bob3Rv/L2Zhcm1lci1yaWRp/bmctdHJhY3Rvci5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/aTNpUEhJQmtXc1R5/Y3k1WlBHU1Y1TGJO/LXpJeVMtSnBwV1Nm/MG1jWmJmdz0', videoUrl: 'https://youtu.be/H-d1ERyDTsU' },
  { id: '2', title: 'Benefits of Phosphorus Fertilizers', thumbnail: 'https://imgs.search.brave.com/FIwoE1VHM9bOyxPHRjAmVdlrqoCdf8K2Dx0c_rJ40D0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGFyYWRlZXBwaG9z/cGhhdGVzLmNvbS91/cGxvYWRzL2NvbnRl/bnQvZ2FyZGVuZXIt/ZmVydGlsaXppbmct/c29pbC1mbG93ZXIt/YnVzaGVzLXdpdGgt/Z3JhbnVsYXRlZC1u/aXRyYXRlLWJldHRl/ci1ncm93aW5nLmpw/Zw', videoUrl: 'https://www.youtube.com/watch?v=j1HIClkuLnw&pp=ygUnYmVuZWZpdCBvZiBwaG9zcGhvcm91cyBmZXJ0aWxpemVyIGhpbmRp' },
  { id: '3', title: 'Organic Potassium Fertilizers', thumbnail: 'https://imgs.search.brave.com/p7FjVj7QJwdLP5dn0ZtXmNC4Jb8R2fTZ5j6mml0e4-U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9saWZl/YW5kYWdyaS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDIvTml0cm9nZW4t/UmljaC1Pcmdhbmlj/LUZlcnRpbGl6ZXIt/NzY4eDUxMi5qcGc', videoUrl: 'https://youtu.be/KIKaOBMwiQQ' },
];

const posts = [
  { id: '1', title: 'Best Practices for Crop Rotation', postUrl: 'https://hindi.krishijagran.com/farm-activities/principles-of-crop-rotation-and-its-benefits/' },
  { id: '2', title: 'Soil Health Tips for Farmers', postUrl: 'https://hindi.krishijagran.com/farm-activities/natural-farming-beneficial-for-farmers-5-organic-treatments-for-pest-and-disease-management/' },
  { id: '3', title: 'Maximizing Water Efficiency in Farming', postUrl: 'https://hindi.krishijagran.com/machinery/powertrac-euro-47-price-india-lowest-fuel-consuming-tractor/' },
];


const Education = () => {
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem("LANG")));
  };
  const [selectedTab, setSelectedTab] = useState('Overview');

  const handleVideoPress = (videoUrl) => {
    Linking.openURL(videoUrl).catch(err => console.error("Failed to open URL: ", err));
  };

  const handlePostPress = (postUrl) => {
    Linking.openURL(postUrl).catch(err => console.error("Failed to open URL: ", err));
  };

  const renderTab = () => {
    if (selectedTab === 'Overview') {
      return (
        <View>
          <Text style={styles.sectionHeader}>Daily Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>Track your daily farming progress</Text>
            <ProgressBarAndroid styleAttr="Horizontal" color="#FF4D4F" indeterminate={false} progress={0.76} />
            <Text style={styles.progressLabel}>76%</Text>
          </View>

          {/* Educational Videos */}
          <Text style={styles.sectionHeader}>Educational Videos</Text>
          <FlatList
            data={videos}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoPress(item.videoUrl)}>
                <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
                <Text style={styles.videoTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.videoList}
          />

          {/* Educational Posts */}
          <Text style={styles.sectionHeader}>Educational Blog Posts</Text>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.postItem} onPress={() => handlePostPress(item.postUrl)}>
                <Text style={styles.postTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            style={styles.postList}
          />
        </View>
      );
    } else if (selectedTab === 'Productivity') {
      return (
        <View>
          <Text style={styles.sectionHeader}>Fertilizers</Text>
          <FlatList
            data={fertilizers}
            renderItem={({ item }) => (
              <View style={styles.fertilizerItem}>
                <Text style={styles.fertilizerName}>{item.name}</Text>
                <Text style={styles.fertilizerDescription}>{item.description}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>{selectedLang == 0
            ? translation[7].English
            : selectedLang == 1
            ? translation[7].Tamil
            : selectedLang == 2
            ? translation[7].Hindi
            : selectedLang == 3
            ? translation[7].Punjabi
            : selectedLang == 4
            ? translation[7].Urdu
            : null}</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Overview' && styles.activeTab]}
            onPress={() => setSelectedTab('Overview')}
          >
            <Text style={[styles.tabText, selectedTab === 'Overview' && styles.activeTabText]}>{selectedLang == 0
            ? translation[7].English
            : selectedLang == 1
            ? translation[7].Tamil
            : selectedLang == 2
            ? translation[7].Hindi
            : selectedLang == 3
            ? translation[7].Punjabi
            : selectedLang == 4
            ? translation[7].Urdu
            : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Productivity' && styles.activeTab]}
            onPress={() => setSelectedTab('Productivity')}
          >
            <Text style={[styles.tabText, selectedTab === 'Productivity' && styles.activeTabText]}>Productivity</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {renderTab()}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  header: {
    marginBottom: 20,
    marginTop: 50,
  },
  greeting: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#FF4D4F',
  },
  tabText: {
    fontSize: 16,
    color: '#111827',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  insightCard: {
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  insightText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 18,
    color: '#FF4D4F',
    marginTop: 5,
  },
  videoList: {
    marginBottom: 20,
  },
  videoItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  videoThumbnail: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  videoTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
  },
  postList: {
    marginBottom: 20,
  },
  postItem: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  fertilizerItem: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  fertilizerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  fertilizerDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default Education;
