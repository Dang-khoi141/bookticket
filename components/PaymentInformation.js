import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const PaymentScreen = ({ navigation, route }) => {
    // const { passengerInformation, selectedBaggage, checkedBag, travelProtection, selectedSeat } = route.params;
    const [paymentMethod, setPaymentMethod] = useState('MasterCard **** 9876');

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleCheckout = () => {
        navigation.navigate('Summary'
                , {
                // passengerInformation,
                // selectedBaggage,
                // checkedBag,
                // travelProtection,
                // selectedSeat,
                // paymentMethod,
            }
        );
    };

    return (
        <ScrollView>
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
                    <View style={[styles.circle, styles.activeStep]}>
                        <Icon name="bed-outline" size={20} color="#fff" />
                    </View>
                    <View style={styles.line} />
                </View>

                {/* Step 4: Payment */}
                <View style={styles.stepContainer}>
                    <View style={[styles.circle, styles.currentStep]}>
                        <Icon name="card-outline" size={20} color="#00bdd6" />
                    </View>
                </View>
            </View>

            <Text style={styles.title}>Payment</Text>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment method</Text>
                <View style={styles.paymentMethodContainer}>
                    <Text style={styles.paymentMethod}>{paymentMethod}</Text>
                    <TouchableOpacity onPress={() => handlePaymentMethodChange('new card')}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.addPaymentMethod}
                    onPress={() => handlePaymentMethodChange('new card')}
                >
                    <Text style={styles.addPaymentMethodText}>+ New card</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Traveller details</Text>
                <View style={styles.travelerDetailsContainer}>
                    <Text style={styles.travelerName}> <Icon style={styles.icon} name="person-outline" size={20} /> Pedro Moreno</Text>
                    <Text style={styles.travelerInfo}>Adult · Male</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact details</Text>
                <View style={styles.contactDetailsContainer}>
                    <Text style={styles.contactDetail}> <Icon style={styles.icon} name="mail-outline" size={20} /> pedromareno@gmail.com</Text>
                </View>
                <View style={styles.contactDetailsContainer}>
                    <Text style={styles.contactDetail}> <Icon style={styles.icon} name="call-outline" size={20}  /> (208) 567-8209</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalText}>${811.56} 1 adult</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
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
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    paymentMethodContainer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paymentMethod: {
        fontSize: 14,
        color: '#333',
    },
    editText: {
        fontSize: 14,
        color: '#00b2b2',
    },
    addPaymentMethod: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 8,
    },
    addPaymentMethodText: {
        fontSize: 14,
        color: '#00b2b2',
    },
    travelerDetailsContainer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    travelerName: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    travelerInfo: {
        fontSize: 14,
        color: '#666',
    },
    contactDetailsContainer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    contactDetail: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    icon: {
        fontWeight: 'bold',
        margin: 8,
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
    checkoutButton: {
        backgroundColor: '#00bdd6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    checkoutButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PaymentScreen;