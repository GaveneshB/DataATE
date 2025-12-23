// Booking Confirmation JavaScript

// Booking data (would normally come from server/session)
let bookingData = {
    car: 'Perodua Bezza 2023',
    destination: 'Melaka',
    startTime: '7:00am',
    startDate: '16.12.2025',
    endTime: '7:00am',
    endDate: '19.12.2025',
    totalHours: 72,
    pricePerHour: 6.25,
    deposit: 50.00,
    addOns: 0.00,
    promoDiscount: 0.00,
    cashback: 0.00,
    appliedVoucher: null
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBookingData();
    initializePaymentOptions();
    checkSelectedVoucher();
});

// Load booking data from URL params or session
function loadBookingData() {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('car')) {
        bookingData.car = urlParams.get('car');
    }
    if (urlParams.has('destination')) {
        bookingData.destination = urlParams.get('destination');
    }
    if (urlParams.has('hours')) {
        bookingData.totalHours = parseInt(urlParams.get('hours'));
    }
    if (urlParams.has('startTime')) {
        bookingData.startTime = urlParams.get('startTime');
    }
    if (urlParams.has('endTime')) {
        bookingData.endTime = urlParams.get('endTime');
    }
    if (urlParams.has('startDate')) {
        bookingData.startDate = urlParams.get('startDate');
    }
    if (urlParams.has('endDate')) {
        bookingData.endDate = urlParams.get('endDate');
    }
    
    // Store hours in sessionStorage for voucher page
    sessionStorage.setItem('bookingHours', bookingData.totalHours.toString());
    
    updateUI();
}

// Update UI with booking data
function updateUI() {
    // Car name
    document.getElementById('carName').textContent = bookingData.car;
    
    // Destination
    document.getElementById('destination').textContent = bookingData.destination;
    
    // Booking time
    const timeStr = `${bookingData.startTime} (${bookingData.startDate}) - ${bookingData.endTime} (${bookingData.endDate})`;
    document.getElementById('bookingTime').textContent = timeStr;
    
    // Hours and prices
    document.getElementById('bookingHours').textContent = `${bookingData.totalHours} hour(s)`;
    
    const bookingPrice = bookingData.totalHours * bookingData.pricePerHour;
    document.getElementById('bookingPrice').textContent = formatCurrency(bookingPrice);
    
    document.getElementById('depositAmount').textContent = formatCurrency(bookingData.deposit);
    document.getElementById('addonsAmount').textContent = formatCurrency(bookingData.addOns);
    
    // Calculate total
    const total = bookingPrice + bookingData.deposit + bookingData.addOns - bookingData.promoDiscount;
    document.getElementById('totalPrice').textContent = formatCurrency(total);
}

// Format currency
function formatCurrency(amount) {
    return `RM${amount.toFixed(2)}`;
}

// Initialize payment options
function initializePaymentOptions() {
    const options = document.querySelectorAll('.payment-option');
    
    options.forEach(option => {
        const input = option.querySelector('input[type="radio"]');
        
        option.addEventListener('click', function() {
            // Remove selected from all
            options.forEach(opt => opt.classList.remove('selected'));
            // Add selected to clicked one
            this.classList.add('selected');
            input.checked = true;
        });
    });
}

// Check if a voucher was selected from the voucher page
function checkSelectedVoucher() {
    const selectedVoucher = sessionStorage.getItem('selectedVoucher');
    
    if (selectedVoucher) {
        const voucherData = JSON.parse(selectedVoucher);
        applyVoucherFromStorage(voucherData);
    }
}

// Apply voucher from storage
function applyVoucherFromStorage(voucherData) {
    const bookingPrice = bookingData.totalHours * bookingData.pricePerHour;
    
    switch (voucherData.type) {
        case 'percent':
            bookingData.promoDiscount = (bookingPrice * voucherData.value) / 100;
            break;
        case 'flat':
            bookingData.promoDiscount = voucherData.value;
            break;
        case 'hours':
            bookingData.promoDiscount = voucherData.value * bookingData.pricePerHour;
            break;
        case 'daily':
            // Special daily rate calculation
            const days = Math.ceil(bookingData.totalHours / 24);
            const normalPrice = bookingData.totalHours * bookingData.pricePerHour;
            const discountedPrice = days * voucherData.value;
            bookingData.promoDiscount = Math.max(0, normalPrice - discountedPrice);
            break;
        case 'cashback':
            // Cashback is applied after payment, show as info
            bookingData.promoDiscount = 0;
            bookingData.cashback = (bookingPrice * voucherData.value) / 100;
            break;
        default:
            bookingData.promoDiscount = 0;
    }
    
    // Store applied voucher
    bookingData.appliedVoucher = {
        code: voucherData.code,
        name: voucherData.name
    };
    
    // Update voucher status in UI
    const voucherStatus = document.getElementById('voucherStatus');
    if (voucherStatus) {
        voucherStatus.textContent = voucherData.name;
        voucherStatus.classList.add('applied');
    }
    
    // Show applied voucher section
    showAppliedVoucher(voucherData.name);
    
    // Update UI with discount
    updateUI();
}

// Go back
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/booking/calendar';
    }
}

// Edit booking - go back to calendar
function editBooking() {
    window.location.href = '/booking/calendar';
}

// Show applied voucher
function showAppliedVoucher(name) {
    const appliedSection = document.getElementById('appliedVoucher');
    const appliedName = document.getElementById('appliedVoucherName');
    
    if (appliedSection && appliedName) {
        appliedName.textContent = name;
        appliedSection.style.display = 'flex';
    }
}

// Remove voucher
function removeVoucher() {
    bookingData.promoDiscount = 0;
    bookingData.appliedVoucher = null;
    bookingData.cashback = 0;
    
    // Clear from sessionStorage
    sessionStorage.removeItem('selectedVoucher');
    
    // Hide applied section
    const appliedSection = document.getElementById('appliedVoucher');
    if (appliedSection) {
        appliedSection.style.display = 'none';
    }
    
    // Reset voucher status
    const voucherStatus = document.getElementById('voucherStatus');
    if (voucherStatus) {
        voucherStatus.textContent = 'Select a voucher';
        voucherStatus.classList.remove('applied');
    }
    
    updateUI();
    showNotification('Voucher removed', 'info');
}

function proceedToPayment() {
    window.location.href = PICKUP_URL;
}

function goNext() {
    window.location.href = "{{ route('booking.booking_complete') }}";
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 8px;
        font-family: 'Sen', sans-serif;
        font-size: 14px;
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
        ${type === 'error' ? 'background: #E75B5B; color: white;' : 
          type === 'success' ? 'background: #06D23F; color: white;' :
          'background: #14213D; color: white;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translate(-50%, -10px);
        }
    }
`;
document.head.appendChild(style);
