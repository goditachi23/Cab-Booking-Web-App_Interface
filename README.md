# CabX - Cab Booking Web App

A simple and dynamic cab booking web application that focuses on a user-friendly interface for the Indian environment. The app works without cloud or database integrations, using static data for demonstration purposes.

## Features

- **User Interaction**: Select pickup and drop-off locations from predefined options
- **Multiple Cab Types**: Choose from Mini, Sedan, SUV, or Auto-rickshaw
- **Static Pricing**: Fare calculation based on predefined routes
- **Driver Information**: View driver details after booking confirmation
- **Multilingual Support**: Toggle between English and Hindi
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on both mobile and desktop

## How to Use

1. **Open the Application**: Load `index.html` in a web browser
2. **Search for a Ride**:
   - Enter pickup location
   - Enter drop-off location
   - Click "Find Rides"
3. **Select a Cab Type**:
   - Choose from available options (Mini, Sedan, SUV, Auto-rickshaw)
   - View the estimated fare and arrival time
   - Click "Confirm Ride"
4. **Booking Confirmation**:
   - View ride details (pickup, drop-off, vehicle, fare)
   - View driver details (name, phone, vehicle number)
   - To book another ride, click "Book Another Ride"

## Project Structure

```
CabX/
├── index.html              # Main HTML file
├── src/
│   ├── css/
│   │   └── styles.css      # CSS styles
│   ├── js/
│   │   ├── app.js          # Application logic
│   │   └── data.js         # Static data (cabs, drivers, locations)
│   └── assets/             # Images and other assets
└── README.md               # This file
```

## Technology Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome 6

## Customization

- **Add Locations**: Edit the `locations` array in `src/js/data.js`
- **Add/Modify Cab Types**: Edit the `cabTypes` array in `src/js/data.js`
- **Add/Modify Routes**: Edit the `routes` array in `src/js/data.js`
- **Add/Modify Drivers**: Edit the `drivers` array in `src/js/data.js`

## Note

This is a demonstration application and does not include real-time data or actual payment processing. The map shown is a static iframe that would need a valid Google Maps API key in a production setting.

## License

© 2023 CabX. All rights reserved. 