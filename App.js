import React, { useState, useEffect, useRef } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './component/SearchInput';

const App = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [location, setLocation] = useState('Tokyo')
  const [temperature, setTemperature] = useState(0)
  const [weather, setWeather] = useState('')

  const locationRef = useRef(location);
  //console.log(1, location)

  useEffect(async () => {
      if (loading) {
        try {
          //console.log(2, locationRef.current)
          const locationId = await fetchLocationId(locationRef.current)
          const { location, weather, temperature } = await fetchWeather(locationId)

          setLoading(false)
          setError(false)
          setWeather(weather)
          setTemperature(temperature)
        } catch (e) {
          setLoading(false)
          setError(true)
        }
      }
  }, [loading])

  const handleSubmitEdting = (event) => {
    if (!event.nativeEvent.text) return
    
    setLocation(event.nativeEvent.text)
    locationRef.current = event.nativeEvent.text
    setLoading(true)
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding"
    >
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator
            animating={loading}
            color="white"
            size="large"
          />

          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}

              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                  <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                  <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
                </View>
              )}

              <SearchInput placeholder="Enter City" onSubmit={handleSubmitEdting}/>
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily:
    Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});

export default App;