// CabX - Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const bookingSection = document.getElementById('booking-section');
    const ridesSection = document.getElementById('rides-section');
    const confirmationSection = document.getElementById('confirmation-section');
    const bookingForm = document.getElementById('booking-form');
    const pickupInput = document.getElementById('pickup');
    const dropoffInput = document.getElementById('dropoff');
    const rideOptionsContainer = document.getElementById('ride-options');
    const backToSearchBtn = document.getElementById('back-to-search');
    const newBookingBtn = document.getElementById('new-booking');
    const langToggle = document.getElementById('langToggle');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Current state
    let currentLanguage = 'en';
    let selectedCabType = null;
    let currentPickup = '';
    let currentDropoff = '';
    
    // Set up autocomplete for pickup and dropoff inputs
    setupAutocomplete(pickupInput, appData.locations);
    setupAutocomplete(dropoffInput, appData.locations);
    
    // Event Listeners
    bookingForm.addEventListener('submit', handleBookingFormSubmit);
    backToSearchBtn.addEventListener('click', showBookingSection);
    newBookingBtn.addEventListener('click', showBookingSection);
    langToggle.addEventListener('click', toggleLanguage);
    darkModeToggle.addEventListener('change', toggleDarkMode);
    
    // Functions
    
    // Setup autocomplete for inputs
    function setupAutocomplete(input, items) {
        // Create a datalist element
        const listId = input.id + 'List';
        let datalist = document.getElementById(listId);
        
        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = listId;
            document.body.appendChild(datalist);
            input.setAttribute('list', listId);
        }
        
        // Clear existing options
        datalist.innerHTML = '';
        
        // Add options to datalist
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            datalist.appendChild(option);
        });
    }
    
    // Handle booking form submission
    function handleBookingFormSubmit(e) {
        e.preventDefault();
        
        currentPickup = pickupInput.value.trim();
        currentDropoff = dropoffInput.value.trim();
        
        if (currentPickup && currentDropoff) {
            if (currentPickup === currentDropoff) {
                alert(currentLanguage === 'en' ? 
                    'Pickup and drop-off locations cannot be the same.' : 
                    'पिकअप और ड्रॉप-ऑफ स्थान एक समान नहीं हो सकते।');
                return;
            }
            
            showRideOptions();
        }
    }
    
    // Show available ride options
    function showRideOptions() {
        // Clear previous options
        rideOptionsContainer.innerHTML = '';
        
        // Get distance between locations
        const distance = appData.getDistance(currentPickup, currentDropoff);
        
        // Add cab type options
        appData.cabTypes.forEach(cabType => {
            // Calculate fare
            const fare = appData.calculateFare(distance, cabType.id);
            
            // Calculate ETA
            const eta = appData.getEstimatedTime(currentPickup, currentDropoff);
            const adjustedEta = calculateAdjustedEta(eta, cabType.id);
            
            // Create card for cab option
            const cabCard = document.createElement('div');
            cabCard.className = 'col-md-3 col-sm-6';
            cabCard.innerHTML = `
                <div class="card mb-3 cab-option" data-cab-type="${cabType.id}">
                    <div class="card-body text-center">
                        <div class="cab-icon ${cabType.id}">
                            <i class="fas ${cabType.icon}"></i>
                        </div>
                        <h5 class="card-title" data-en="${cabType.name}" data-hi="${cabType.name_hi}">
                            ${currentLanguage === 'en' ? cabType.name : cabType.name_hi}
                        </h5>
                        <p class="card-text mb-1" data-en="${cabType.description}" data-hi="${cabType.description_hi}">
                            ${currentLanguage === 'en' ? cabType.description : cabType.description_hi}
                        </p>
                        <p class="card-text mb-1">
                            <span data-en="Capacity:" data-hi="क्षमता:">
                                ${currentLanguage === 'en' ? 'Capacity:' : 'क्षमता:'}
                            </span> 
                            ${cabType.capacity}
                        </p>
                        <p class="card-text mb-1">
                            <strong class="text-success">₹${fare.toFixed(0)}</strong>
                        </p>
                        <p class="card-text text-muted">
                            <small data-en="${adjustedEta} mins" data-hi="${adjustedEta} मिनट">
                                ${currentLanguage === 'en' ? `${adjustedEta} mins` : `${adjustedEta} मिनट`}
                            </small>
                        </p>
                    </div>
                </div>
            `;
            
            rideOptionsContainer.appendChild(cabCard);
            
            // Add click event to card
            cabCard.querySelector('.cab-option').addEventListener('click', function() {
                selectCabType(cabType.id, fare, adjustedEta);
            });
        });
        
        // Hide booking section and show rides section
        bookingSection.classList.remove('animate__fadeIn');
        bookingSection.classList.add('animate__fadeOut');
        
        setTimeout(() => {
            bookingSection.classList.add('d-none');
            ridesSection.classList.remove('d-none');
            ridesSection.classList.add('animate__slideInRight');
        }, 300);
    }
    
    // Select a cab type
    function selectCabType(cabType, fare, eta) {
        selectedCabType = cabType;
        
        // Remove selected class from all options
        document.querySelectorAll('.cab-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selected class to chosen option
        document.querySelector(`.cab-option[data-cab-type="${cabType}"]`).classList.add('selected');
        
        // Show confirm button
        if (!document.getElementById('confirm-ride-btn')) {
            const confirmBtn = document.createElement('button');
            confirmBtn.id = 'confirm-ride-btn';
            confirmBtn.className = 'btn btn-success w-100 mt-3';
            confirmBtn.setAttribute('data-en', 'Confirm Ride');
            confirmBtn.setAttribute('data-hi', 'सवारी की पुष्टि करें');
            confirmBtn.textContent = currentLanguage === 'en' ? 'Confirm Ride' : 'सवारी की पुष्टि करें';
            
            confirmBtn.addEventListener('click', () => {
                confirmRide(cabType, fare, eta);
            });
            
            rideOptionsContainer.insertAdjacentElement('afterend', confirmBtn);
        }
    }
    
    // Confirm ride and show confirmation page
    function confirmRide(cabType, fare, eta) {
        // Get random driver for selected cab type
        const driver = appData.getRandomDriver(cabType);
        
        // Get cab details
        const cab = appData.cabTypes.find(c => c.id === cabType);
        
        // Update confirmation page content
        document.getElementById('confirm-pickup').textContent = currentPickup;
        document.getElementById('confirm-dropoff').textContent = currentDropoff;
        document.getElementById('confirm-vehicle').textContent = currentLanguage === 'en' ? cab.name : cab.name_hi;
        document.getElementById('confirm-fare').textContent = `₹${fare.toFixed(0)}`;
        document.getElementById('driver-name').textContent = driver.name;
        document.getElementById('driver-phone').textContent = driver.phone;
        document.getElementById('vehicle-number').textContent = driver.vehicleNumber;
        document.getElementById('eta').textContent = currentLanguage === 'en' ? 
            `${eta} minutes` : `${eta} मिनट`;
        
        // Hide rides section and show confirmation section
        ridesSection.classList.remove('animate__slideInRight');
        ridesSection.classList.add('animate__slideOutLeft');
        
        setTimeout(() => {
            ridesSection.classList.add('d-none');
            confirmationSection.classList.remove('d-none');
            confirmationSection.classList.add('animate__fadeIn');
        }, 300);
    }
    
    // Show booking section (go back to start)
    function showBookingSection() {
        // Reset selected cab type
        selectedCabType = null;
        
        // Hide confirmation section if visible
        if (!confirmationSection.classList.contains('d-none')) {
            confirmationSection.classList.remove('animate__fadeIn');
            confirmationSection.classList.add('animate__fadeOut');
            
            setTimeout(() => {
                confirmationSection.classList.add('d-none');
                resetBookingSection();
            }, 300);
        }
        
        // Hide rides section if visible
        if (!ridesSection.classList.contains('d-none')) {
            ridesSection.classList.remove('animate__slideInRight');
            ridesSection.classList.add('animate__fadeOut');
            
            setTimeout(() => {
                ridesSection.classList.add('d-none');
                resetBookingSection();
            }, 300);
        }
    }
    
    // Reset booking section
    function resetBookingSection() {
        // Clear inputs
        pickupInput.value = '';
        dropoffInput.value = '';
        
        // Show booking section
        bookingSection.classList.remove('d-none', 'animate__fadeOut');
        bookingSection.classList.add('animate__fadeIn');
        
        // Remove confirm button if exists
        const confirmBtn = document.getElementById('confirm-ride-btn');
        if (confirmBtn) {
            confirmBtn.remove();
        }
    }
    
    // Toggle language between English and Hindi
    function toggleLanguage(e) {
        e.preventDefault();
        
        currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
        
        // Update toggle text
        langToggle.textContent = currentLanguage === 'en' ? 'हिंदी' : 'English';
        
        // Update all elements with data-en and data-hi attributes
        document.querySelectorAll('[data-en][data-hi]').forEach(el => {
            el.textContent = currentLanguage === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-hi');
        });
        
        // Update placeholders
        document.querySelectorAll('[data-en-placeholder][data-hi-placeholder]').forEach(el => {
            el.placeholder = currentLanguage === 'en' ? 
                el.getAttribute('data-en-placeholder') : 
                el.getAttribute('data-hi-placeholder');
        });
        
        // Update cab options if visible
        if (!ridesSection.classList.contains('d-none')) {
            updateCabOptionLanguage();
        }
    }
    
    // Update cab option language
    function updateCabOptionLanguage() {
        appData.cabTypes.forEach(cabType => {
            const cabOption = document.querySelector(`.cab-option[data-cab-type="${cabType.id}"]`);
            if (cabOption) {
                const title = cabOption.querySelector('.card-title');
                title.textContent = currentLanguage === 'en' ? cabType.name : cabType.name_hi;
                
                const description = cabOption.querySelector('.card-text');
                description.textContent = currentLanguage === 'en' ? cabType.description : cabType.description_hi;
            }
        });
    }
    
    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }
    
    // Calculate adjusted ETA based on cab type
    function calculateAdjustedEta(baseEta, cabType) {
        // Different cab types have slightly different ETAs
        switch (cabType) {
            case 'mini':
                return baseEta;
            case 'sedan':
                return Math.max(1, baseEta - 2); // Sedans are a bit faster
            case 'suv':
                return Math.max(1, baseEta - 1);
            case 'auto':
                return baseEta + 2; // Auto-rickshaws are slower
            default:
                return baseEta;
        }
    }
}); 