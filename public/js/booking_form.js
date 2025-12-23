// Booking Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeDatePickers();
    initializePhoneInput();
    initializeFormValidation();
});

// Go back to previous page
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/';
    }
}

// Initialize date pickers
function initializeDatePickers() {
    const startDateInput = document.getElementById('start_date');
    const endDateInput = document.getElementById('end_date');
    const calendarIcons = document.querySelectorAll('.calendar-icon');

    // Add click handlers for calendar icons
    calendarIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            const input = index === 0 ? startDateInput : endDateInput;
            showDateTimePicker(input);
        });
    });

    // Add click handlers for date inputs
    [startDateInput, endDateInput].forEach(input => {
        input.addEventListener('click', function() {
            showDateTimePicker(this);
        });
    });
}

// Show date/time picker (simplified native fallback)
function showDateTimePicker(input) {
    // Create a temporary datetime-local input
    const tempInput = document.createElement('input');
    tempInput.type = 'datetime-local';
    tempInput.style.position = 'absolute';
    tempInput.style.opacity = '0';
    tempInput.style.pointerEvents = 'none';
    
    document.body.appendChild(tempInput);
    
    tempInput.addEventListener('change', function() {
        const date = new Date(this.value);
        const formattedDate = formatDateTime(date);
        input.value = formattedDate;
        calculateTotal();
        document.body.removeChild(tempInput);
    });
    
    tempInput.addEventListener('blur', function() {
        setTimeout(() => {
            if (document.body.contains(tempInput)) {
                document.body.removeChild(tempInput);
            }
        }, 100);
    });
    
    tempInput.showPicker();
}

// Format date time to display format
function formatDateTime(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'P.M.' : 'A.M.';
    hours = hours % 12 || 12;
    
    return `${day}.${month}.${year}      ${hours}.${minutes} ${ampm}`;
}

// Initialize phone input
function initializePhoneInput() {
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        // Remove non-numeric characters except spaces
        let value = e.target.value.replace(/[^\d\s]/g, '');
        
        // Format with spaces for readability
        value = value.replace(/\s+/g, ' ').trim();
        
        e.target.value = value;
    });
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('bookingForm');
    const confirmBtn = document.querySelector('.confirm-btn');
    
    confirmBtn.addEventListener('click', function(e) {
        if (!validateForm()) {
            e.preventDefault();
        }
    });
    
    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
        }
    });
}

// Validate form
function validateForm() {
    const requiredFields = ['name', 'email', 'phone', 'id_no', 'pickup', 'start_date', 'end_date'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const inputField = field.closest('.input-field');
        
        if (!field.value.trim()) {
            isValid = false;
            inputField.style.borderColor = '#ff4444';
            inputField.style.animation = 'shake 0.3s ease';
            
            setTimeout(() => {
                inputField.style.borderColor = '#000000';
                inputField.style.animation = '';
            }, 1500);
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

// Calculate total price based on dates
function calculateTotal() {
    const startDateInput = document.getElementById('start_date');
    const endDateInput = document.getElementById('end_date');
    const totalAmount = document.querySelector('.total-amount');
    
    // Parse dates (simplified calculation)
    const startDate = parseCustomDate(startDateInput.value);
    const endDate = parseCustomDate(endDateInput.value);
    
    if (startDate && endDate && endDate > startDate) {
        const hours = Math.ceil((endDate - startDate) / (1000 * 60 * 60));
        const pricePerHour = 15.12; // Base rate
        const total = hours * pricePerHour;
        
        totalAmount.textContent = `RM ${total.toFixed(2)}`;
    }
}

// Parse custom date format
function parseCustomDate(dateString) {
    // Format: "27.7.2025      9.20 P.M."
    const match = dateString.match(/(\d+)\.(\d+)\.(\d+)\s+(\d+)\.(\d+)\s+(A\.M\.|P\.M\.)/);
    
    if (match) {
        let [, day, month, year, hours, minutes, ampm] = match;
        hours = parseInt(hours);
        
        if (ampm === 'P.M.' && hours !== 12) {
            hours += 12;
        } else if (ampm === 'A.M.' && hours === 12) {
            hours = 0;
        }
        
        return new Date(year, month - 1, day, hours, minutes);
    }
    
    return null;
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
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
        ${type === 'error' ? 'background: #ff4444; color: white;' : 'background: #14213D; color: white;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add shake animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
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

