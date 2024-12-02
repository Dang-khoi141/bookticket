import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Summary = ({ navigation, route }) => {
    const {
        passengerInformation,
        selectedBaggage,
        checkedBag,
        travelProtection,
        selectedSeat,
        paymentMethod,
    } = route.params;

    return (
        <ImageBackground
            source={require("../assets/background.png")} 
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.successContainer}>
                    <Text style={styles.title}>Booking successful</Text>
                    <Icon style={styles.icon_Checked} name="checkmark-circle-outline" />
                    <Text style={styles.message}>
                        Your flight booking has been completed. You can view the details below.
                    </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.sectionTitle}>Flight Details</Text>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>From:</Text>
                        <Text style={styles.detailValue}>LCY</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>To:</Text>
                        <Text style={styles.detailValue}>JFK</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Seat:</Text>
                        <Text style={styles.detailValue}>LCY - JFK</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Baggage:</Text>
                        <Text style={styles.detailValue}>
                            Personal item only
                        </Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Travel Protection:</Text>
                        <Text style={styles.detailValue}>
                            No insurance
                        </Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Payment Method:</Text>
                        <Text style={styles.detailValue}>Credit card</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FlightDetails')}>
                        <Text style={styles.buttonText}>Booking Detail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    successContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    icon_Checked: {
        color: '#00bdd6',
        fontSize: 48,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    detailsContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    button: {
        backgroundColor: '#00bdd6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Summary;
