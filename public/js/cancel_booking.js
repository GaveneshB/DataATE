// Cancel Booking Form JavaScript

// Go back
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/profile/order-history';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadBookingDetails();
});

// Initialize form
function initializeForm() {
    const form = document.getElementById('cancelForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSubmit();
    });
    
    // Account number validation - only digits
    const accountNumber = document.getElementById('accountNumber');
    accountNumber.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

// Load booking details from URL params or session
function loadBookingDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // In a real app, these would come from the server
    if (urlParams.has('bookingId')) {
        document.getElementById('bookingId').value = urlParams.get('bookingId');
        document.getElementById('displayBookingId').textContent = urlParams.get('bookingId');
    }
    
    if (urlParams.has('customerName')) {
        document.getElementById('displayCustomerName').textContent = urlParams.get('customerName');
    }
    
    if (urlParams.has('vehicle')) {
        document.getElementById('displayVehicle').textContent = urlParams.get('vehicle');
    }
    
    if (urlParams.has('plate')) {
        document.getElementById('displayPlate').textContent = urlParams.get('plate');
    }
    
    if (urlParams.has('rentalPeriod')) {
        document.getElementById('displayRentalPeriod').textContent = urlParams.get('rentalPeriod');
    }
    
    if (urlParams.has('pickup')) {
        document.getElementById('displayPickup').textContent = urlParams.get('pickup');
    }
    
    if (urlParams.has('returnDate')) {
        document.getElementById('displayReturn').textContent = urlParams.get('returnDate');
    }
    
    if (urlParams.has('returnPlace')) {
        document.getElementById('displayReturnPlace').textContent = urlParams.get('returnPlace');
    }
}

// Handle form submission
function handleSubmit() {
    const form = document.getElementById('cancelForm');
    const formData = new FormData(form);
    
    // Validate fields
    const bank = formData.get('bank');
    const accountNumber = formData.get('account_number');
    const accountHolder = formData.get('account_holder');
    
    if (!bank) {
        showNotification('Please select your bank', 'error');
        return;
    }
    
    if (!accountNumber || accountNumber.length < 10) {
        showNotification('Please enter a valid account number (min 10 digits)', 'error');
        return;
    }
    
    if (!accountHolder || accountHolder.trim().length < 3) {
        showNotification('Please enter the account holder name', 'error');
        return;
    }
    
    // Show loading state
    const cancelBtn = document.querySelector('.cancel-btn');
    cancelBtn.textContent = 'Processing...';
    cancelBtn.disabled = true;
    
    // Prepare data
    const data = {
        booking_id: formData.get('booking_id'),
        bank: bank,
        account_number: accountNumber,
        account_holder: accountHolder
    };
    
    console.log('Cancellation data:', data);
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, this would be an actual API call
        // fetch('/booking/' + data.booking_id + '/cancel', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
        //     },
        //     body: JSON.stringify(data)
        // })
        
        showNotification('Booking cancelled successfully! Refund will be processed within 3-5 working days.', 'success');
        
        // Reset button
        cancelBtn.textContent = 'Cancel';
        cancelBtn.disabled = false;
        
        // Redirect to order history after delay
        setTimeout(() => {
            window.location.href = '/profile/order-history';
        }, 2000);
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translate(-50%, -10px);
        }
    }
`;
document.head.appendChild(style);

