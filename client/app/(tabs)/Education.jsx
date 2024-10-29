import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import axios from 'axios';

const Education = () => {
  const [newsPosts, setNewsPosts] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://google-news13.p.rapidapi.com//latest?lr=en-US', {
        headers: {
          'x-rapidapi-key': '5519a9706dmshee24d2362ced1a3p1b6bafjsn5eda0f1fd6af',
          'x-rapidapi-host': 'google-news13.p.rapidapi.com'
        }
      });
      setNewsPosts(response.data.articles);  // Adjust if needed based on response structure
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handlePostPress = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>Latest News</Text>
      <FlatList
        data={newsPosts}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.postItem} onPress={() => handlePostPress(item.url)}>
            <Text style={styles.postTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sectionHeader: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  postItem: { padding: 15, backgroundColor: '#FFFFFF', borderRadius: 10, marginBottom: 10 },
  postTitle: { fontSize: 16, fontWeight: 'bold' }
});

export default Education;
