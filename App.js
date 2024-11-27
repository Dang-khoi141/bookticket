import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoundTripSearching from './components/RoundTripSearching';
import OneWaySearching from './components/OneWaySearching';
import MultiCitySearching from './components/MultiCitySearching';
import SearchResult from './components/SearchResult';
import SearchResultsDemo from './components/SearchResultsDemo';
import FlightDetails from './components/FlightDetail';
import PassengerInformation from './components/PassengerInformation';
import PaymentScreen from './components/PaymentInformation';
import BaggageScreen from './components/BaggageInformation';
import HomeScreen from './components/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RoundTrip" component={RoundTripSearching} />
        <Stack.Screen name="RoundTripSearching" component={RoundTripSearching}  
        options={{ headerShown: false }} />
        <Stack.Screen name="OneWay" component={OneWaySearching} />
        <Stack.Screen name="OneWaySearching" component={OneWaySearching} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="MultiCity" component={MultiCitySearching} />
        <Stack.Screen name="MultiCitySearching" component={MultiCitySearching} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="SearchResult" component={SearchResult} />
        {/* <Stack.Screen name="DemoListInModal" component={DemoListInModal} /> */}
        <Stack.Screen name="SearchResults" component={SearchResultsDemo} />
        {/* <Stack.Screen name="FlightFilterScreen" component={FlightFilterScreen} /> */}
        <Stack.Screen name="FlightDetails" component={FlightDetails} />
        <Stack.Screen name="PassengerInformation" component={PassengerInformation} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="BaggageScreen" component={BaggageScreen} />
        <Stack.Screen name="SearchResultsDemo" component={SearchResultsDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
