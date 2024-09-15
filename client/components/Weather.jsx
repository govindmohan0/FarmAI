        // import React, { useState, useEffect } from 'react';
        // import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
        // import axios from 'axios';
        // import Geolocation from 'react-native-geolocation-service';

        // const Weather = () => {
        // const [weatherData, setWeatherData] = useState(null);
        // const [loading, setLoading] = useState(true);
        // const [error, setError] = useState(null);
        // const [locationError, setLocationError] = useState(null);
        // const [permissionChoice, setPermissionChoice] = useState(null); // For user's choice

        // const apiKey = '5519a9706dmshee24d2362ced1a3p1b6bafjsn5eda0f1fd6af'; // Your RapidAPI key

        // useEffect(() => {
        //     if (permissionChoice) {
        //     // Function to fetch weather data using user's coordinates
        //     const fetchWeatherData = async (latitude, longitude) => {
        //         try {
        //         const options = {
        //             method: 'GET',
        //             url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        //             params: {
        //             lat: latitude,
        //             lon: longitude,
        //             units: 'metric', // Use 'imperial' for Fahrenheit
        //             },
        //             headers: {
        //             'X-RapidAPI-Key': apiKey,
        //             'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        //             },
        //         };

        //         const response = await axios.request(options);
        //         setWeatherData(response.data);
        //         setLoading(false);
        //         } catch (error) {
        //         setError(error);
        //         setLoading(false);
        //         }
        //     };

        //     // Get user's location
        //     const getUserLocation = () => {
        //         console.log('Requesting user location...');
        //         Geolocation.getCurrentPosition(
        //         (position) => {
        //             const { latitude, longitude } = position.coords;
        //             console.log('Location acquired:', { latitude, longitude });
        //             fetchWeatherData(latitude, longitude);
        //         },
        //         (err) => {
        //             console.error('Geolocation error:', err);
        //             setLocationError('Unable to retrieve location. Please enable location access.');
        //             setLoading(false);
        //         },
        //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        //         );
        //     };

        //     // Request permission and get location
        //     const requestPermission = async () => {
        //         try {
        //         console.log('Requesting location permission...');
        //         await Geolocation.requestAuthorization(permissionChoice); // Use user's choice
        //         getUserLocation();
        //         } catch (error) {
        //         console.error('Permission request error:', error);
        //         setLocationError('Permission to access location was denied.');
        //         setLoading(false);
        //         }
        //     };

        //     requestPermission();
        //     }
        // }, [permissionChoice, apiKey]);

        // const handlePermissionChoice = (choice) => {
        //     setPermissionChoice(choice);
        // };

        // if (!permissionChoice) {
        //     return (
        //     <View style={styles.container}>
        //         <Text style={styles.text}>Select Location Access Permission:</Text>
        //         <Button title="While Using the App" onPress={() => handlePermissionChoice('whenInUse')} />
        //         <Button title="Always" onPress={() => handlePermissionChoice('always')} />
        //     </View>
        //     );
        // }

        // if (loading) return <ActivityIndicator size="large" color="#00ff00" />;
        // if (locationError) return <Text style={styles.errorText}>{locationError}</Text>;
        // if (error) return <Text style={styles.errorText}>Error fetching weather data: {error.message}</Text>;

        // return (
        //     <View style={styles.container}>
        //     {weatherData && (
        //         <View>
        //         <Text style={styles.title}>Weather in {weatherData.name}</Text>
        //         <Text style={styles.text}>Temperature: {weatherData.main.temp} °C</Text>
        //         <Text style={styles.text}>Humidity: {weatherData.main.humidity} %</Text>
        //         <Text style={styles.text}>Conditions: {weatherData.weather[0].description}</Text>
        //         <Text style={styles.text}>Wind Speed: {weatherData.wind.speed} m/s</Text>
        //         </View>
        //     )}
        //     </View>
        // );
        // };

        // const styles = StyleSheet.create({
        // container: {
        //     padding: 10,
        //     backgroundColor: '#fff',
        // },
        // title: {
        //     fontSize: 20,
        //     fontWeight: 'bold',
        //     marginBottom: 10,
        // },
        // text: {
        //     fontSize: 16,
        // },
        // errorText: {
        //     fontSize: 16,
        //     color: 'red',
        // },
        // });

        // export default Weather;
