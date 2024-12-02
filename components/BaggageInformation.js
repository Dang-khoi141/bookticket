import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BaggageScreen = ({ navigation, route }) => {
    const { passengerInformation } = route.params;
    const [selectedCabinBag, setSelectedCabinBag] = useState('personal');
    const [selectedCheckedBag, setSelectedCheckedBag] = useState('checked');
    const [selectedTravelProtection, setSelectedTravelProtection] = useState('no-insurance');

    const handleNextStep = () => {
        navigation.navigate('SeatScreen', {
            // passengerInformation,
            // selectedCabinBag,
            // selectedCheckedBag,
            // selectedTravelProtection,
        });
    };

    return (
        <ScrollView style={styles.container}>

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
                    <View style={[styles.circle, styles.currentStep]}>
                        <Icon name="briefcase-outline" size={20} color="#00bdd6" />
                    </View>
                    <View style={styles.lineInactive} />
                </View>

                {/* Step 3: Extras */}
                <View style={styles.stepContainer}>
                    <View style={[styles.circle, styles.inactiveStep]}>
                        <Icon name="bed-outline" size={20} color="#ccc" />
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

            <Text style={styles.title}>Baggage</Text>

            {/* Cabin Bags Section */}
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Cabin bags</Text>
                <TouchableOpacity
                    style={styles.radioButtonContainer}
                    onPress={() => setSelectedCabinBag('personal')}
                >
                    <Icon
                        name={selectedCabinBag === 'personal' ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={selectedCabinBag === 'personal' ? '#00bdd6' : '#666'}
                    />
                    <Text style={styles.optionText}>Personal item only</Text>
                </TouchableOpacity>
            </View>

            {/* Checked Bags Section */}
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Checked bags</Text>
                <TouchableOpacity
                    style={styles.radioButtonContainer}
                    onPress={() => setSelectedCheckedBag('checked')}
                >
                    <Icon
                        name={selectedCheckedBag === 'checked' ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={selectedCheckedBag === 'checked' ? '#00bdd6' : '#666'}
                    />
                    <Text style={styles.optionText}>1 checked bag (Max weight 22.1 lbs) from $19.99</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioButtonContainer}
                    onPress={() => setSelectedCheckedBag('no-checked')}
                >
                    <Icon
                        name={selectedCheckedBag === 'no-checked' ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={selectedCheckedBag === 'no-checked' ? '#00bdd6' : '#666'}
                    />
                    <Text style={styles.optionText}>No checked bag $0.00</Text>
                </TouchableOpacity>
            </View>

            {/* Travel Protection Section */}
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Travel protection</Text>
                <TouchableOpacity
                    style={[styles.radioButtonContainer, styles.travelProtectionOption]}
                    onPress={() => setSelectedTravelProtection('insurance')}
                >
                    <View style={styles.iconContainer}>
                        <Icon
                            name={selectedTravelProtection === 'insurance' ? 'radio-button-on' : 'radio-button-off'}
                            size={20}
                            color={selectedTravelProtection === 'insurance' ? '#00bdd6' : '#666'}
                        />
                    </View>
                    <View style={styles.protectionDetails}>
                        <Text style={styles.optionText}>
                            1 checked bag (Max weight 22.1 lbs)
                        </Text>
                        <Text style={styles.priceText}>from $19.99</Text>
                        <View style={styles.extraOptions}>
                            <View style={styles.extraOption}>
                                <Icon name="checkmark" size={16} color="#E46C1A" />
                                <Text style={styles.extraOptionText}>Laboris exercitation Lorem anim pariatur</Text>
                            </View>
                            <View style={styles.extraOption}>
                                <Icon name="checkmark" size={16} color="#E46C1A" />
                                <Text style={styles.extraOptionText}>Duis aute irure dolor in reprehenderit in voluptate</Text>
                            </View>
                            <View style={styles.extraOption}>
                                <Icon name="checkmark" size={16} color="#E46C1A" />
                                <Text style={styles.extraOptionText}>Incididunt amet cupidatat elit enim amet labore</Text>
                            </View>
                            <View style={styles.extraOption}>
                                <Icon name="checkmark" size={16} color="#E46C1A" />
                                <Text style={styles.extraOptionText}>Magna eu mollit veniam ipsum in dolore anim</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioButtonContainer}
                    onPress={() => setSelectedTravelProtection('no-insurance')}
                >
                    <Icon
                        name={selectedTravelProtection === 'no-insurance' ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={selectedTravelProtection === 'no-insurance' ? '#00bdd6' : '#666'}
                    />
                    <Text style={styles.optionText}>No insurance $0.00</Text>
                </TouchableOpacity>
            </View>


            {/* Next Button */}
            <View style={styles.footer}>
                <Text style={styles.totalText}>$806</Text>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        // fontSize: 24,
        // fontWeight: 'bold',
        marginBottom: 16,
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginRight: 32,
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
    
    optionContainer: {
        marginBottom: 24,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    optionText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
    },
    travelProtectionContainer: {
        flexDirection: 'column',
    },
    travelProtectionOption: {
        alignItems: 'flex-start',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#F9F9F9',
    },
    protectionDetails: {
        flex: 1,
        marginLeft: 8,
    },
    priceText: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
        marginBottom: 8,
    },
    extraOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    extraOptionText: {
        marginLeft: 8,
        fontSize: 12,
        color: '#666',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    nextButton: {
        backgroundColor: '#00bdd6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default BaggageScreen;
