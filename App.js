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
import LoginScreen from './components/login';
import registerpage from './components/register';
import Summary from './components/BookingCompleted';
import SeatScreen from './components/SeatInformation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name='Login'component={LoginScreen}
         options={{ headerShown: false }} 
         />
         <Stack.Screen name="registerpage" component={registerpage} />
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="RoundTrip" component={RoundTripSearching} />
        <Stack.Screen name="RoundTripSearching" component={RoundTripSearching}  
        options={{ headerShown: false }} />
        <Stack.Screen name="OneWay" component={OneWaySearching} />
        <Stack.Screen name="OneWaySearching" component={OneWaySearching} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="MultiCity" component={MultiCitySearching} />
        <Stack.Screen name="MultiCitySearching" component={MultiCitySearching} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="SearchResult" component={SearchResult} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="SeatScreen" component={SeatScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsDemo} />
        <Stack.Screen name="FlightDetails" component={FlightDetails} 
        options={{ headerShown: false }}
        />
        <Stack.Screen name="Summary" component={Summary} 
        options={{ headerShown: false }}
        />
        <Stack.Screen name="PassengerInformation" component={PassengerInformation} 
        
        />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="BaggageScreen" component={BaggageScreen} />
        <Stack.Screen name="SearchResultsDemo" component={SearchResultsDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
