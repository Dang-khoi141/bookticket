//file dữ liệu mẫu chưa cpos firebase
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FlightDetails = ({ navigation }) => {
    // Kiểm tra xem route có tồn tại hay không, nếu không, dùng dữ liệu mẫu
    const flightData =   {
        trip: {
            origin: 'London',
            destination: 'New York City',
            dates: 'Fri, Jul 14 - Sun, Jul 16',
            travellers: '1 traveller, Economy, Round-trip',
        },
        flights: [
            {
                segment: 'Outbound',
                airline: 'Sky Haven',
                time: '6:30 AM - 2:00 PM',
                stops: '28° seat pitch, Light meal, No power outlet, No entertainment',
                details: ['Tue, Jul 14', '7h 30m'],
            },
            {
                segment: 'Return',
                airline: 'Eco Wings',
                time: '10:00 PM - 10:15 AM',
                stops: 'Direct',
                details: ['Fri, Jul 17', '9h 15m'],
            },
        ],
        baggage: {
            included: '1 personal item',
            extra: [
                { type: 'Carry-on', price: '$11.99' },
                { type: 'Checked bag', price: '$19.99' },
            ],
        },
        totalPrice: '806',
    };

    const handleSelect = () => {
        if (flightData) {
            navigation.navigate('PassengerInformation', { flightData });
        } else {
            // Có thể hiển thị thông báo lỗi hoặc thông báo cho người dùng
            alert('No flight data available.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Flight details</Text>
                <View style={styles.headerIcons}>
                    <Icon name="heart-outline" size={24} color="#000" style={styles.iconSpacing} />
                    <Icon name="share-outline" size={24} color="#000" />
                </View>
            </View>

            {/* Trip Info */}
            <View style={styles.tripInfo}>
                <Text style={styles.tripTitle}>Your trip to {flightData.trip.destination || 'N/A'}</Text>
                <Text style={styles.tripSubtitle}>from {flightData.trip.origin || 'N/A'}</Text>
                <Text style={styles.dateText}>{flightData.trip.dates || 'N/A'}</Text>
                <Text style={styles.detailsText}>{flightData.trip.travellers || 'N/A'}</Text>
            </View>

            {/* Flight Details */}
            {flightData.flights.length > 0 ? (
                flightData.flights.map((flight, index) => (
                    <View key={index} style={styles.flightCard}>
                        <View style={styles.flightSegment}>
                            <Text style={styles.segmentTitle}>{flight.segment || 'N/A'}</Text>
                            <Text style={styles.airlineInfo}>{flight.airline || 'N/A'}</Text>
                            <Text style={styles.timeText}>{flight.time || 'N/A'}</Text>
                            <Text style={styles.stopText}>{flight.stops || 'N/A'}</Text>
                            {Array.isArray(flight.details) && flight.details.map((detail, idx) => (
                                <Text key={idx} style={styles.infoText}>{detail || 'N/A'}</Text>
                            ))}
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.moreInfoText}>More info</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text style={styles.noFlightsText}>No flight details available.</Text>
            )}

            {/* Included Baggage */}
            <View style={styles.baggageSection}>
                <Text style={styles.sectionTitle}>Included baggage</Text>
                <Text style={styles.infoText}>{flightData.baggage.included || 'N/A'}</Text>
                <Text style={styles.includedText}>Included</Text>
            </View>

            {/* Extra Baggage */}
            <View style={styles.baggageSection}>
                <Text style={styles.sectionTitle}>Extra baggage</Text>
                {Array.isArray(flightData.baggage.extra) && flightData.baggage.extra.map((item, idx) => (
                    <Text key={idx} style={styles.extraBaggageText}>
                        {item.type || 'N/A'} - {item.price || 'N/A'}
                    </Text>
                ))}
            </View>

            {/* Total Price and Select Button */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalPrice}>${flightData.totalPrice || '0.00'}</Text>
                    <Text style={styles.totalPriceText}>Total price</Text>
                </View>
                <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
                    <Text style={styles.selectText}>Select</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconSpacing: {
        marginRight: 16,
    },
    tripInfo: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tripTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tripSubtitle: {
        fontSize: 16,
        color: '#666',
        marginVertical: 4,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    detailsText: {
        fontSize: 14,
        color: '#666',
    },
    flightCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    flightSegment: {
        marginBottom: 8,
    },
    segmentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    airlineInfo: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 4,
    },
    stopText: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    infoText: {
        fontSize: 12,
        color: '#999',
        marginVertical: 2,
    },
    moreInfoText: {
        color: '#00bdd6',
        fontSize: 14,
        fontWeight: 'bold',
    },
    baggageSection: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    includedText: {
        fontSize: 14,
        color: '#00bdd6',
    },
    extraBaggageText: {
        fontSize: 14,
        color: '#333',
        marginVertical: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalPriceText: {
        fontSize: 14,
        color: '#666',
    },
    selectButton: {
        backgroundColor: '#00bdd6',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    selectText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noFlightsText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
        marginVertical: 20,
    },
});

export default FlightDetails;