import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SortFilterModal from './SortFilterModal';

const FlightResult = ({ flight, navigation }) => (
    <TouchableOpacity
        style={styles.resultContainer}
        onPress={() => navigation.navigate('FlightDetail', { flightData: flight })}
    >
        <View style={styles.flightInfo}>
            <Text style={styles.timeText}>{flight.departureTime} - {flight.arrivalTime}</Text>
            <Text style={styles.airlineText}>{flight.airline}</Text>
        </View>
        <View style={styles.routeInfo}>
            <Text style={styles.airportCode}>{flight.departureCode}</Text> {/* Mã sân bay khởi hành */}
            <Icon name="arrow-forward" size={16} color="#000" />
            <Text style={styles.airportCode}>{flight.destinationCode}</Text> {/* Mã sân bay đến */}
            <Text style={styles.airportCode}>, {flight.weather}</Text> {/* Hiển thị thời tiết */}
        </View>
        <View style={styles.details}>
            <Text style={styles.durationText}>{flight.duration}</Text>
            <Text style={styles.stopsText}>{flight.stop}</Text>
        </View>
        <Text style={styles.priceText}>${flight.price}</Text>
    </TouchableOpacity>
);

const SearchResultsDemo = ({ navigation, route }) => {
    const [flightData, setFlightData] = useState([]);
    const [isSortFilterVisible, setSortFilterVisible] = useState(false);
    const [filteredFlightData, setFilteredFlightData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Dữ liệu mẫu để hiển thị
        const sampleFlightData = [
            {
                id: '1',
                departureTime: '06:00 AM',
                arrivalTime: '09:30 AM',
                airline: 'Airline A',
                departureCode: 'JFK',
                destinationCode: 'LAX',
                duration: '5h 30m',
                stop: 'Nonstop',
                price: '300',
                weather: 'Sunny',
            },
            {
                id: '2',
                departureTime: '08:00 AM',
                arrivalTime: '12:00 PM',
                airline: 'Airline B',
                departureCode: 'JFK',
                destinationCode: 'LAX',
                duration: '6h 0m',
                stop: '1 stop',
                price: '250',
                weather: 'Cloudy',
            },
            {
                id: '3',
                departureTime: '10:00 AM',
                arrivalTime: '02:30 PM',
                airline: 'Airline C',
                departureCode: 'JFK',
                destinationCode: 'LAX',
                duration: '5h 30m',
                stop: 'Nonstop',
                price: '350',
                weather: 'Rainy',
            },
            {
                id: '4',
                departureTime: '01:00 PM',
                arrivalTime: '06:00 PM',
                airline: 'Airline D',
                departureCode: 'JFK',
                destinationCode: 'LAX',
                duration: '5h 0m',
                stop: 'Nonstop',
                price: '400',
                weather: 'Sunny',
            },
            {
                id: '5',
                departureTime: '04:00 PM',
                arrivalTime: '08:30 PM',
                airline: 'Airline E',
                departureCode: 'JFK',
                destinationCode: 'LAX',
                duration: '5h 30m',
                stop: '1 stop',
                price: '280',
                weather: 'Partly Cloudy',
            },
            {
                id: '6',
                departureTime: '06:00 PM',
                arrivalTime: '10:00 PM',
                airline: 'Airline F',
                departureCode: 'JFK',
                destinationCode: 'LAX',
                duration: '6h 0m',
                stop: 'Nonstop',
                price: '320',
                weather: 'Clear',
            },
        ];

        // Gán dữ liệu mẫu vào state
        setFlightData(sampleFlightData);
        setFilteredFlightData(sampleFlightData);
        setLoading(false); // Tắt trạng thái loading
    }, []);

    const handleApplyFilters = (filters) => {
        const { sortOption, stopOption, selectedAirlines } = filters;

        let filteredData = flightData.filter((flight) => {
            const matchesStops =
                stopOption === 'Any stops' ||
                (stopOption === '1 stop or nonstop' && (flight.stop === '1 stop' || flight.stop === 'Nonstop')) ||
                (stopOption === 'Nonstop only' && flight.stop === 'Nonstop');

            const matchesAirline = selectedAirlines.size === 0 || selectedAirlines.has(flight.airline);
            return matchesStops && matchesAirline;
        });

        if (sortOption === 'Cheapest') {
            filteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortOption === 'Fastest') {
            filteredData.sort((a, b) => {
                const [hoursA, minutesA] = a.duration.split('h ').map(part => parseInt(part));
                const [hoursB, minutesB] = b.duration.split('h ').map(part => parseInt(part));
                return (hoursA * 60 + minutesA) - (hoursB * 60 + minutesB);
            });
        }

        setFilteredFlightData(filteredData);
        setSortFilterVisible(false);
    };

    const renderItem = ({ item }) => (
        <FlightResult
            flight={item}
            navigation={navigation}
        />
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.sortFilterButton}
                onPress={() => setSortFilterVisible(true)}
            >
                <Text style={styles.sortFilterButtonText}>Sort & Filter</Text>
                <Icon name="funnel-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <FlatList
                data={filteredFlightData}
                keyExtractor={(flight) => flight.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.emptyText}>No flights found</Text>}
            />

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={24} color="#fff" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <SortFilterModal
                visible={isSortFilterVisible}
                onClose={() => setSortFilterVisible(false)}
                onApply={handleApplyFilters}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    sortFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00bdd6',
        padding: 10,
        borderRadius: 8,
        margin: 16,
    },
    sortFilterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    resultContainer: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    flightInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
    },
    airlineText: {
        fontSize: 14,
        color: '#767a81',
    },
    routeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    airportCode: {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 4,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    durationText: {
        fontSize: 14,
        color: '#767a81',
    },
    stopsText: {
        fontSize: 14,
        color: '#767a81',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00bdd6',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#00bdd6',
        borderRadius: 8,
    },
    backText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 4,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#767a81',
        marginTop: 20,
    },
});

export default SearchResultsDemo;
