import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import SortFilterModal from './SortFilterModal';

// Dữ liệu mẫu
const sampleFlightData = [
    {
        id: '1',
        departure: 'New York',
        destination: 'Los Angeles',
        from: firestore.Timestamp.fromDate(new Date('2024-12-01T08:00:00Z')),
        to: firestore.Timestamp.fromDate(new Date('2024-12-01T11:00:00Z')),
        airline: 'Airline A',
        duration: '6h 0m',
        stops: 'Direct',
        price: '$200',
    },
    {
        id: '2',
        departure: 'Chicago',
        destination: 'Miami',
        from: firestore.Timestamp.fromDate(new Date('2024-12-02T09:00:00Z')),
        to: firestore.Timestamp.fromDate(new Date('2024-12-02T12:00:00Z')),
        airline: 'Airline B',
        duration: '3h 0m',
        stops: '1 stop',
        price: '$150',
    },
    {
        id: '3',
        departure: 'San Francisco',
        destination: 'Seattle',
        from: firestore.Timestamp.fromDate(new Date('2024-12-03T07:30:00Z')),
        to: firestore.Timestamp.fromDate(new Date('2024-12-03T09:00:00Z')),
        airline: 'Airline C',
        duration: '1h 30m',
        stops: 'Direct',
        price: '$100',
    },
    {
        id: '4',
        departure: 'Boston',
        destination: 'Washington D.C.',
        from: firestore.Timestamp.fromDate(new Date('2024-12-04T14:00:00Z')),
        to: firestore.Timestamp.fromDate(new Date('2024-12-04T15:30:00Z')),
        airline: 'Airline D',
        duration: '1h 30m',
        stops: 'Direct',
        price: '$120',
    },
    {
        id: '5',
        departure: 'Atlanta',
        destination: 'New Orleans',
        from: firestore.Timestamp.fromDate(new Date('2024-12-05T11:00:00Z')),
        to: firestore.Timestamp.fromDate(new Date('2024-12-05T12:45:00Z')),
        airline: 'Airline E',
        duration: '1h 45m',
        stops: '1 stop',
        price: '$90',
    },
];


const FlightResult = ({ flight, navigation }) => (
    <TouchableOpacity
        style={styles.resultContainer}
        onPress={() => navigation.navigate('FlightDetails', { flightData: flight })}
    >
        <View style={styles.flightInfo}>
            <Text style={styles.timeText}>{new Date(flight.from._seconds * 1000).toLocaleString()} - {new Date(flight.to._seconds * 1000).toLocaleString()}</Text>
            <Text style={styles.airlineText}>{flight.airline}</Text>
        </View>
        <View style={styles.routeInfo}>
            <Text style={styles.airportCode}>{flight.departure}</Text>
            <Icon name="arrow-forward" size={16} color="#000" />
            <Text style={styles.airportCode}>{flight.destination}</Text>
        </View>
        <View style={styles.details}>
            <Text style={styles.durationText}>{flight.duration}</Text>
            <Text style={styles.stopsText}>{flight.stops}</Text>
        </View>
        <Text style={styles.priceText}>{flight.price}</Text>
    </TouchableOpacity>
);

const SearchResult = ({ navigation, route }) => {
    const { from, to, departureDate, returnDate, travelerData, type } = route.params;
    const [flightData, setFlightData] = useState([]);
    const [isSortFilterVisible, setSortFilterVisible] = useState(false);
    const [filteredFlightData, setFilteredFlightData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { flights } = route.params;

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                // Thay thế dữ liệu từ Firestore bằng dữ liệu mẫu
                const useSampleData = true; // Thay đổi giá trị này để sử dụng dữ liệu mẫu

                if (useSampleData) {
                    // Sử dụng dữ liệu mẫu
                    setFlightData(sampleFlightData);
                    setFilteredFlightData(sampleFlightData);
                } else {
                    // Nếu không sử dụng dữ liệu mẫu, lấy dữ liệu từ Firestore
                    const db = firestore();
                    const flightRef = db.collection('flight');
                    let query = flightRef;

                    // Xây dựng truy vấn Firestore
                    if (type === 'round-trip') {
                        query = query.where('type', '==', 'round-trip');
                    } else if (type === 'one-way') {
                        query = query.where('type', '==', 'one-way');
                    }
                    if (from) {
                        query = query.where('departure', '==', from);
                    }
                    if (to) {
                        query = query.where('destination', '==', to);
                    }
                    if (departureDate) {
                        const departureTimestamp = firestore.Timestamp.fromDate(new Date(departureDate));
                        query = query.where('from', '>=', departureTimestamp);
                    }
                    if (returnDate) {
                        const returnTimestamp = firestore.Timestamp.fromDate(new Date(returnDate));
                        query = query.where('to', '<=', returnTimestamp);
                    }

                    const snapshot = await query.get();
                    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setFlightData(data);
                    setFilteredFlightData(data);
                }
            } catch (error) {
                console.log('Error fetching flight data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlightData();
    }, [type, from, to, departureDate, returnDate, flights, travelerData]);

    const renderItem = ({ item }) => (
        <FlightResult flight={item} navigation={navigation} />
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
                onApply={(filters) => {
                    // Logic để áp dụng bộ lọc
                }}
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
        padding: 20,
        borderRadius: 8,
        // top:10,
        margin: 16,
    },
    sortFilterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        height:30,
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
        // position: 'absolute',
        // top: 5,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#00bdd6',
        borderRadius: 20,
        width:100,
    },
    backText: {
        color: '#fff',
        marginLeft: 4,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#767a81',
    },
});

export default SearchResult;
