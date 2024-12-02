import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SeatScreen = ({ navigation, route }) => {
    // const { passengerInformation, selectedBaggage, checkedBag, travelProtection } = route.params;
    const [selectedSeat, setSelectedSeat] = useState('LCY - JFK');

    const handleSeatSelection = (seat) => {
        setSelectedSeat(seat);
    };

    const handleNextStep = () => {
        navigation.navigate('PaymentScreen'
            , {
            // passengerInformation,
            // selectedBaggage,
            // checkedBag,
            // travelProtection,
            // selectedSeat,
        }
        );
    };

    return (

        

        <View style={styles.container}>

{/* Progress Indicator */}
<View style={styles.progressContainer}>
                {/* Step 1: Passenger */}
                <View style={styles.stepContainer}>
                    <View style={[styles.circle, styles.activeStep]}>
                        <Icon name="person-outline" size={20} color="#fff" />
                    </View>
                    <View style={styles.line} />
                </View>

                {/* Step 2: Baggage */}
                <View style={styles.stepContainer}>
                    <View style={[styles.circle, styles.activeStep]}>
                        <Icon name="briefcase-outline" size={20} color="#fff" />
                    </View>
                    <View style={styles.line} />
                </View>

                {/* Step 3: Extras */}
                <View style={styles.stepContainer}>
                    <View style={[styles.circle, styles.currentStep]}>
                        <Icon name="bed-outline" size={20} color="#00bdd6" />
                    </View>
                    <View style={styles.lineInactive} />
                </View>

                {/* Step 4: Payment */}
                <View style={styles.stepContainer}>
                    <View style={[styles.circle, styles.inactiveStep]}>
                        <Icon name="card-outline" size={20} color="#ccc" />
                    </View>
                </View>
            </View>

            <Text style={styles.title}>Seat</Text>
            <View style={styles.flightContainer}>
                <Text style={styles.flightTitle}>Flight to New York</Text>
                <TouchableOpacity
                    style={[
                        styles.seatOption,
                        selectedSeat === 'LCY - JFK' && styles.selectedOption,
                    ]}
                    onPress={() => handleSeatSelection('LCY - JFK')}
                >
                    <Text style={styles.seatText}>LCY - JFK</Text>
                    <Text style={styles.seatText}>Seats from $5</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.flightContainer}>
                <Text style={styles.flightTitle}>Flight to London</Text>
                <TouchableOpacity
                    style={[
                        styles.seatOption,
                        selectedSeat === 'LCY - JFK' && styles.selectedOption,
                    ]}
                    onPress={() => handleSeatSelection('LCY - JFK')}
                >
                    <Text style={styles.seatText}>LCY - JFK</Text>
                    <Text style={styles.seatText}>Seats from $4.59</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalText}>${806} 1 adult</Text>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },

    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    activeStep: {
        backgroundColor: '#00bdd6', // Màu xanh cho bước hoàn thành
    },
    
    currentStep: {
        borderWidth: 2,
        borderColor: '#00bdd6',
        backgroundColor: '#fff',
    },
    
    inactiveStep: {
        backgroundColor: '#f0f0f0', // Màu xám nhạt cho bước chưa hoàn thành
    },
    
    line: {
        width: 40,
        height: 2,
        backgroundColor: '#00bdd6', // Đường xanh cho kết nối hoàn thành
        marginHorizontal: 4,
    },
    
    lineInactive: {
        width: 40,
        height: 2,
        backgroundColor: '#f0f0f0', // Đường xám cho kết nối chưa hoàn thành
        marginHorizontal: 4,
    },

    flightContainer: {
        marginBottom: 24,
    },
    flightTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    seatOption: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedOption: {
        borderColor: '#00bdd6',
    },
    seatText: {
        fontSize: 14,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#00b2b2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SeatScreen;