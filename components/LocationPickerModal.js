import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const locations = [
    { id: '1', name: 'London, United Kingdom', desc: 'Capital of England', airports: [{ id: '1', name: 'London City Airport', distance: '20 km to destination', code: 'LCY' }, { id: '2', name: 'Heathrow Airport', code: 'LHR', distance: '13 km to destination' }] },
    { id: '2', name: 'Ontario, Canada', desc: 'City in Ontario, Canada', airports: [{ id: '3', name: 'London Airport', distance: '30 km to destination', code: 'YXU' }] },
    { id: 'anywhere', name: 'Anywhere', desc: 'Trips to anywhere in the world' },
];

const LocationPickerModal = ({ visible, onClose, onSelect, title, from, to, onSwap, selectedInput }) => {
    const [expandedLocations, setExpandedLocations] = useState([]);

    const toggleLocationExpansion = (locationId) => {
        if (expandedLocations.includes(locationId)) {
            setExpandedLocations(expandedLocations.filter((id) => id !== locationId));
        } else {
            setExpandedLocations([...expandedLocations, locationId]);
        }
    };

    const renderLocationItem = ({ item }) => (
        <View>
            {item.id !== 'anywhere' && (
                <TouchableOpacity style={styles.locationItem} onPress={() => toggleLocationExpansion(item.id)}>
                    <Image source={require('../assets/image/Icon/location.png')} style={styles.locationIcon} />
                    <View>
                        <Text style={styles.locationCity}>{item.name}</Text>
                        <Text style={styles.locationDescription}>{item.desc}</Text>
                    </View>
                    <Icon name={expandedLocations.includes(item.id) ? 'chevron-up' : 'chevron-down'} size={20} color="#000" style={{ position: 'absolute', right: 0 }} />
                </TouchableOpacity>
            )}
            {item.id === 'anywhere' && selectedInput === 'to' && (
                <TouchableOpacity style={styles.locationItem} onPress={() => onSelect('Anywhere')}>
                    <Icon name="globe" size={20} color="#000" style={styles.locationIcon} />
                    <View>
                        <Text style={styles.locationCity}>Anywhere</Text>
                        <Text style={styles.locationDescription}>Trips to anywhere in the world</Text>
                    </View>
                </TouchableOpacity>
            )}
            {item.id !== 'anywhere' && expandedLocations.includes(item.id) && item.airports && (
                <FlatList
                    data={item.airports}
                    renderItem={({ item: airport }) => (
                        <TouchableOpacity style={styles.airportItem} onPress={() => onSelect({
                            city: item.name,
                            code: airport.code,
                            path: `/city/${item.id}/airport/${airport.id}` // Pass the full path
                        })}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Icon name="airplane" size={20} color="#000" />
                                <View style={{ marginLeft: 20, justifyContent: 'space-between', flex: 1 }}>
                                    <Text style={styles.airportName} numberOfLines={1}>{airport.name}</Text>
                                    <Text style={styles.airportDistance}>{airport.distance}</Text>
                                </View>
                                <Text style={styles.airportCode}>{airport.code}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(airport) => airport.code}
                />
            )}
        </View>
    );

    const displayLocations = selectedInput === 'to'
        ? [...locations, { id: 'anywhere', name: 'Anywhere', desc: 'Trips to anywhere in the world' }]
        : locations;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.modalBackground}>
                <View style={styles.subModalContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.fromToContainer}>
                        <TouchableOpacity style={styles.searchInputContainer} onPress={() => selectedInput === 'from' && null}>
                            <Image source={require('../assets/image/Icon/airplane.png')} style={styles.airplaneImg} />
                            <TextInput
                                style={styles.fromToInput}
                                placeholder="From"
                                placeholderTextColor="#9095a0"
                                value={from}
                                autoFocus={selectedInput === 'from'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.swapContainer} onPress={onSwap}>
                            <Icon name="swap-vertical" size={24} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.searchInputContainer} onPress={() => selectedInput === 'to' && null}>
                            <Image source={require('../assets/image/Icon/arrivals.png')} style={styles.airplaneImg} />
                            <TextInput
                                style={styles.fromToInput}
                                placeholder="To"
                                placeholderTextColor="#9095a0"
                                value={to}
                                autoFocus={selectedInput === 'to'}
                            />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={displayLocations}
                        renderItem={renderLocationItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subModalContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 30,
        padding: 20,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: 30,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        position: 'absolute',
        left: '36%',

    },
    closeBtn: {
        position: 'absolute',
        right: 0,
    },
    fromToContainer: {
        marginBottom: 20,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        height: 54,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        marginBottom: 2,
    },
    fromToInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    airplaneImg: {
        width: 20,
        height: 20,
        marginLeft: 6,
        marginRight: 12,
    },
    swapContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 30,
        left: '90%',
        marginLeft: -35,
        zIndex: 1,
        backgroundColor: '#f3f4f6',
        borderRadius: 25,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderColor: '#fff',
        borderWidth: 1,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
        // width: '120%',
    },
    locationIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
    },
    locationCity: {
        fontSize: 16,
        fontWeight: '700',
    },
    locationDescription: {
        fontSize: 14,
        color: '#a8acb5',
    },
    airportItem: {
        paddingLeft: 50,
        paddingVertical: 8,
        // backgroundColor: '#f7f7f7',
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    airportName: {
        fontSize: 14,
        color: '#333',
        fontWeight: '700',
        maxWidth: 180, // Đặt chiều rộng tối đa cho tên sân bay
    },
    airportDistance: {
        fontSize: 14,
        color: '#a8acb5',
    },
    airportCode: {
        fontSize: 16,
        color: '#000',
        fontWeight: '700',
        // marginRight: 10,
    },
});
export default LocationPickerModal;
