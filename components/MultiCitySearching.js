import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FlightSearching from './FlightSearching';
import LocationPickerModal from './LocationPickerModal'; 
import DatePicker from './DateSelectionModel'; 
import TravelOptions from './FilterOtherOptions'; 

const MultiCitySearching = ({ navigation }) => {
    const defaultFlights = [
        { from: '', to: '', date: new Date(), fromCity: '', toCity: '' }, // Add fromCity and toCity
        { from: '', to: '', date: new Date(), fromCity: '', toCity: '' },
    ];
    const [flights, setFlights] = useState(defaultFlights);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
    const [locationType, setLocationType] = useState(null);
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const [isTravelOptionsVisible, setTravelOptionsVisible] = useState(false);
    const [travelerData, setTravelerData] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        cabinClass: 'Economy',
    });

    const openTravelOptions = () => {
        setTravelOptionsVisible(true);
    };

    const closeTravelOptions = () => {
        setTravelOptionsVisible(false);
    };

    const handleTravelOptionsSelect = (data) => {
        setTravelerData(data);
        closeTravelOptions();
    };
    const totalTravelers = travelerData.adults + travelerData.children + travelerData.infants;

    const addFlight = () => {
        setFlights([...flights, { from: '', to: '', date: 'Fri, Jul 14' }]);
    };

    const removeFlight = (index) => {
        const newFlights = [...flights];
        newFlights.splice(index, 1);
        setFlights(newFlights);
    };

    const updateFlight = (index, field, value) => {
        const newFlights = [...flights];
        newFlights[index][field] = value;
        setFlights(newFlights);
    };

    const openLocationPicker = (index, type) => {
        setSelectedFlightIndex(index);
        setLocationType(type);
        setModalVisible(true);
    };

const handleLocationSelect = (location) => {
    if (locationType === 'fromCity') {
        updateFlight(selectedFlightIndex, 'from', location.path); // Update the path for "from"
        updateFlight(selectedFlightIndex, 'fromCity', location.city); // Update the city name for "from"
    } else if (locationType === 'toCity') {
        updateFlight(selectedFlightIndex, 'to', location.path); // Update the path for "to"
        updateFlight(selectedFlightIndex, 'toCity', location.city); // Update the city name for "to"
    }
    setModalVisible(false);
};


    const handleDateSelect = (date) => {
        updateFlight(selectedFlightIndex, 'date', date);
        setDatePickerVisible(false);
    };

    const handleSearchFlights = () => {
        const flightParams = flights.map(flight => {
            const departureDateString = flight.date ?
                new Date(Date.UTC(flight.date.getUTCFullYear(), flight.date.getUTCMonth(), flight.date.getUTCDate() + 1)).toISOString() : null;

            return {
                from: flight.from,
                to: flight.to,
                departureDate: departureDateString, // Use the processed date string
                type: 'one-way', // Specify trip type
            };
        });

        // Navigate to SearchResult with flight parameters
        navigation.navigate('SearchResult', {
            flights: flightParams,
            travelerData: travelerData,
        });
    };


    return (
        <FlightSearching navigation={navigation} defaultTab="Multi-city">
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    {flights.map((flight, index) => (
                        <View key={index} style={styles.flightContainer}>
                            <Text style={styles.flightTitle}>Flight {index + 1}</Text>
                            <View style={styles.flightRowContainer}>
                                <TouchableOpacity style={styles.flightInputContainer} onPress={() => openLocationPicker(index, 'fromCity')}>
                                    <Image source={require('../assets/image/Icon/airplane.png')} style={styles.airplaneImg} />
                                    <TextInput
                                        style={[styles.flightInput, flight.fromCity ? styles.selectedInputText : styles.placeholderText]}
                                        placeholder="From"
                                        placeholderTextColor="#9095a0"
                                        value={flight.fromCity}
                                        editable={false} // Không cho phép nhập trực tiếp
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flightInputContainer} onPress={() => openLocationPicker(index, 'toCity')}>
                                    <Image source={require('../assets/image/Icon/arrivals.png')} style={styles.airplaneImg} />
                                    <TextInput
                                        style={[styles.flightInput, flight.toCity ? styles.selectedInputText : styles.placeholderText]}
                                        placeholder="To"
                                        placeholderTextColor="#9095a0"
                                        value={flight.toCity}
                                        editable={false} // Không cho phép nhập trực tiếp
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dateContainer}>
                                <TouchableOpacity style={styles.dateItem} onPress={() => {
                                    setSelectedFlightIndex(index);
                                    setDatePickerVisible(true);
                                }}>
                                    <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                                    {/* <Text style={styles.dateLabel}>{flight.date.toDateString()}</Text> */}
                                </TouchableOpacity>
                                {index > 0 && (
                                    <TouchableOpacity onPress={() => removeFlight(index)}>
                                        <Icon name="trash" size={18} color="#ff4d4d" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity style={[styles.addFlightButton, { borderColor: '#00bdd6', borderWidth: 1 }]} onPress={addFlight}>
                        <Text style={[styles.addFlightText, { color: '#00bdd6' }]}>Add flight</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.travelerContainer} onPress={openTravelOptions}>
                        <View style={styles.travelerContent}>
                            <Icon name="person" size={16} color="#9095a0" style={styles.travelerIcon} />
                            <Text style={styles.travelerLabel}> {`${totalTravelers} traveller`}
                            </Text>
                            <Text style={styles.dotSeparator}> • </Text>
                            <Icon name="airplane" size={16} color="#9095a0" style={styles.travelerIcon} />
                            <Text style={styles.travelerLabel}>{travelerData.cabinClass}</Text>
                        </View>
                        <Icon name="chevron-down" size={16} color="#9095a0" style={{ marginLeft: 180 }} />
                    </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity style={styles.searchButton} onPress={handleSearchFlights}>
                    <Text style={styles.searchButtonText} >Search flights</Text>
                </TouchableOpacity>

                <TravelOptions
                    visible={isTravelOptionsVisible}
                    onClose={closeTravelOptions}
                    onSelect={handleTravelOptionsSelect}
                    initialData={travelerData}
                    tripType="multi-city" // Specify trip type

                />

                {/* Modal để chọn địa điểm */}
                <LocationPickerModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelect={handleLocationSelect}
                    title="Select Location"
                    from={flights[selectedFlightIndex]?.fromCity} // Truyền giá trị "from"
                    to={flights[selectedFlightIndex]?.toCity} // Truyền giá trị "to"
                    onSwap={() => {
                        const temp = flights[selectedFlightIndex]?.fromCity;
                        updateFlight(selectedFlightIndex, 'fromCity', flights[selectedFlightIndex]?.toCity);
                        updateFlight(selectedFlightIndex, 'toCity', temp);
                    }}
                    selectedInput={locationType} // Truyền loại địa điểm đã chọn
                />

                <DatePicker
                    visible={datePickerVisible}
                    onClose={() => setDatePickerVisible(false)}
                    onSelect={handleDateSelect}
                    departureDate={flights[selectedFlightIndex]?.date}
                />
            </View>
        </FlightSearching>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 80,
    },
    scrollViewContainer: {
        paddingBottom: 100, // Để tránh che khuất bởi nút tìm kiếm
    },
    flightContainer: {
        marginVertical: 8,
    },
    flightTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    flightRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flightInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        height: 54,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        marginVertical: 0,
        width: '48%',
    },
    flightInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    selectedInputText: {
        color: '#000', // Màu chữ khi đã chọn
    },
    placeholderText: {
        color: '#9095a0', // Màu chữ khi chưa chọn
    },
    airplaneImg: {
        width: 20,
        height: 20,
        marginLeft: 6,
        marginRight: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: '100%',
        height: 54,
        backgroundColor: '#f3f4f6',
    },
    dateIcon: {
        marginRight: 8,
        fontWeight: 'bold',
    },
    dateLabel: {
        fontSize: 16,
        color: '#9095a0',
    },
    addFlightButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    addFlightText: {
        fontSize: 16,
        marginLeft: 8,
    },
    travelerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        height: 54,
        paddingHorizontal: 12,
        marginVertical: 28,
    },
    dotSeparator: {
        fontSize: 24,
        color: '#9095a0',
        marginHorizontal: 4,
        marginLeft: 6,
    },
    travelerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    travelerIcon: {
        marginRight: 4,
        marginLeft: 6,
    },
    travelerLabel: {
        fontSize: 14,
        color: '#767a81',
    },
    searchButton: {
        backgroundColor: '#00bdd6',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MultiCitySearching;