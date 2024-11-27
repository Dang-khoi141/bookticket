// ko sài dc
const locations = [
    { id: '1', name: 'London, United Kingdom', desc: 'Capital of England', airports: [{ id: '1', name: 'London City Airport', distance: '20 km to destination', code: 'LCY' }, { id: '2', name: 'Heathrow Airport', code: 'LHR', distance: '13 km to destination' }] },
    { id: '2', name: 'Ontario, Canada', desc: 'City in Ontario, Canada', airports: [{ id: '3', name: 'London Airport', distance: '30 km to destination', code: 'YXU' }] },
    { id: 'anywhere', name: 'Anywhere', desc: 'Trips to anywhere in the world' },
];

const flights = [
    {
        id: '1',
        from: `/city/1/airport/1`, // Sử dụng đường dẫn từ dữ liệu location
        to: `/city/1/airport/2`,
        departureTime: '9:00 AM',
        arrivalTime: '11:00 AM',
        airline: 'Vietnam Airlines',
        duration: '2h 0m',
        stops: 'Direct',
        price: '$200',
        weather: 'Sunny',
    },
    {
        id: '2',
        from: `/city/1/airport/2`,
        to: `/city/1/airport/1`,
        departureTime: '2:00 PM',
        arrivalTime: '4:00 PM',
        airline: 'Vietnam Airlines',
        duration: '2h 0m',
        stops: 'Direct',
        price: '$250',
        weather: 'Cloudy',
    },
    {
        id: '3',
        from: `/city/1/airport/1`,
        to: `/city/2/airport/3`,
        departureTime: '8:00 AM',
        arrivalTime: '12:00 PM',
        airline: 'Air Canada',
        duration: '4h 0m',
        stops: '1 stop',
        price: '$400',
        weather: 'Rainy',
    },
    {
        id: '4',
        from: `/city/1/airport/1`,
        to: `/city/2/airport/3`,
        departureTime: '3:00 PM',
        arrivalTime: '7:00 PM',
        airline: 'Air Canada',
        duration: '4h 0m',
        stops: '1 stop',
        price: '$350',
        weather: 'Sunny',
    },
];

export { locations, flights };
