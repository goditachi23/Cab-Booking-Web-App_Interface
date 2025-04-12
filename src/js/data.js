// Static data for CabX
const appData = {
    // Popular locations in India
    locations: [
        "Connaught Place, Delhi",
        "India Gate, Delhi",
        "Chandni Chowk, Delhi",
        "Lotus Temple, Delhi",
        "Qutub Minar, Delhi",
        "Red Fort, Delhi",
        "Akshardham Temple, Delhi",
        "Humayun's Tomb, Delhi",
        "Jama Masjid, Delhi",
        "Jantar Mantar, Delhi"
    ],
    
    // Cab types with details
    cabTypes: [
        {
            id: "mini",
            name: "Mini",
            name_hi: "मिनी",
            icon: "fa-car",
            basePrice: 50,
            pricePerKm: 8,
            capacity: "3",
            description: "Economical, small hatchback",
            description_hi: "किफायती, छोटी हैचबैक"
        },
        {
            id: "sedan",
            name: "Sedan",
            name_hi: "सेडान",
            icon: "fa-car-side",
            basePrice: 80,
            pricePerKm: 12,
            capacity: "4",
            description: "Comfortable, spacious sedan",
            description_hi: "आरामदायक, विशाल सेडान"
        },
        {
            id: "suv",
            name: "SUV",
            name_hi: "एसयूवी",
            icon: "fa-truck-monster",
            basePrice: 120,
            pricePerKm: 15,
            capacity: "6",
            description: "Spacious SUV for groups",
            description_hi: "समूहों के लिए विशाल एसयूवी"
        },
        {
            id: "auto",
            name: "Auto-rickshaw",
            name_hi: "ऑटो-रिक्शा",
            icon: "fa-shuttle-van",
            basePrice: 30,
            pricePerKm: 5,
            capacity: "3",
            description: "Classic Indian auto-rickshaw",
            description_hi: "क्लासिक भारतीय ऑटो-रिक्शा"
        }
    ],
    
    // Drivers pool
    drivers: [
        {
            id: 1,
            name: "Ramesh Kumar",
            phone: "+91 9876543210",
            rating: 4.7,
            cabType: "auto",
            vehicleNumber: "DL01AB1234"
        },
        {
            id: 2,
            name: "Suresh Singh",
            phone: "+91 9876543211",
            rating: 4.8,
            cabType: "mini",
            vehicleNumber: "DL02CD5678"
        },
        {
            id: 3,
            name: "Mahesh Sharma",
            phone: "+91 9876543212",
            rating: 4.5,
            cabType: "sedan",
            vehicleNumber: "DL03EF9012"
        },
        {
            id: 4,
            name: "Rajesh Verma",
            phone: "+91 9876543213",
            rating: 4.9,
            cabType: "suv",
            vehicleNumber: "DL04GH3456"
        },
        {
            id: 5,
            name: "Dinesh Patel",
            phone: "+91 9876543214",
            rating: 4.6,
            cabType: "auto",
            vehicleNumber: "DL05IJ7890"
        },
        {
            id: 6,
            name: "Anil Gupta",
            phone: "+91 9876543215",
            rating: 4.7,
            cabType: "mini",
            vehicleNumber: "DL06KL1234"
        },
        {
            id: 7,
            name: "Vijay Malhotra",
            phone: "+91 9876543216",
            rating: 4.8,
            cabType: "sedan",
            vehicleNumber: "DL07MN5678"
        },
        {
            id: 8,
            name: "Sanjay Joshi",
            phone: "+91 9876543217",
            rating: 4.6,
            cabType: "suv",
            vehicleNumber: "DL08OP9012"
        }
    ],
    
    // Predefined routes with distances (in kilometers)
    routes: [
        {
            from: "Connaught Place, Delhi",
            to: "India Gate, Delhi",
            distance: 3,
            estimatedTime: 12
        },
        {
            from: "Connaught Place, Delhi",
            to: "Red Fort, Delhi",
            distance: 5.5,
            estimatedTime: 18
        },
        {
            from: "Connaught Place, Delhi",
            to: "Qutub Minar, Delhi",
            distance: 15,
            estimatedTime: 35
        },
        {
            from: "India Gate, Delhi",
            to: "Lotus Temple, Delhi",
            distance: 10,
            estimatedTime: 25
        },
        {
            from: "Chandni Chowk, Delhi",
            to: "Red Fort, Delhi",
            distance: 1.5,
            estimatedTime: 8
        }
    ],
    
    // Function to calculate fare for a given distance and cab type
    calculateFare: function(distance, cabType) {
        const cab = this.cabTypes.find(c => c.id === cabType);
        return cab.basePrice + (cab.pricePerKm * distance);
    },
    
    // Function to get estimated arrival time in minutes
    getEstimatedTime: function(from, to) {
        const route = this.routes.find(r => 
            (r.from === from && r.to === to) || 
            (r.from === to && r.to === from)
        );
        
        if (route) {
            return route.estimatedTime;
        }
        
        // Default estimation for unknown routes (3 minutes per km)
        return Math.round(this.getRandomDistance(from, to) * 3);
    },
    
    // Function to get distance between locations
    getDistance: function(from, to) {
        const route = this.routes.find(r => 
            (r.from === from && r.to === to) || 
            (r.from === to && r.to === from)
        );
        
        if (route) {
            return route.distance;
        }
        
        return this.getRandomDistance(from, to);
    },
    
    // Function to generate a random distance for unknown routes
    getRandomDistance: function(from, to) {
        // Generate a random distance between 2 and 20 km
        // Using a hash function to ensure the same from/to always gives the same distance
        const seed = (from + to).split('').reduce((a, b) => {
            return a + b.charCodeAt(0);
        }, 0);
        
        // Use the seed to generate a "random" number between 2 and 20
        return 2 + (seed % 19);
    },
    
    // Function to get available drivers for a cab type
    getAvailableDrivers: function(cabType) {
        return this.drivers.filter(driver => driver.cabType === cabType);
    },
    
    // Function to get a random driver for a cab type
    getRandomDriver: function(cabType) {
        const availableDrivers = this.getAvailableDrivers(cabType);
        const randomIndex = Math.floor(Math.random() * availableDrivers.length);
        return availableDrivers[randomIndex];
    }
}; 