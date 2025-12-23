// Voucher Page JavaScript

// Get booking data from URL params or sessionStorage
let bookingHours = 72; // Default
let bookingDays = 3; // Default

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBookingInfo();
    checkVoucherEligibility();
    checkSelectedVoucher();
    
    // Enable apply button when input has value
    const couponInput = document.getElementById('couponCode');
    couponInput.addEventListener('input', function() {
        const applyBtn = document.getElementById('applyBtn');
        if (this.value.trim()) {
            applyBtn.classList.add('active');
        } else {
            applyBtn.classList.remove('active');
        }
    });
});

// Load booking info from URL or session
function loadBookingInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('hours')) {
        bookingHours = parseInt(urlParams.get('hours'));
        bookingDays = Math.ceil(bookingHours / 24);
    }
    
    // Try to get from sessionStorage
    const storedHours = sessionStorage.getItem('bookingHours');
    if (storedHours) {
        bookingHours = parseInt(storedHours);
        bookingDays = Math.ceil(bookingHours / 24);
    }
}

// Check voucher eligibility based on booking duration
function checkVoucherEligibility() {
    const vouchers = document.querySelectorAll('.voucher-card');
    
    vouchers.forEach(card => {
        const minDays = parseInt(card.dataset.minDays) || 0;
        const button = card.querySelector('.redeem-btn');
        
        if (bookingDays >= minDays) {
            button.classList.add('active');
            button.classList.remove('disabled');
            button.disabled = false;
        } else {
            button.classList.remove('active');
            button.classList.add('disabled');
            button.disabled = true;
        }
    });
}

// Check if a voucher was previously selected
function checkSelectedVoucher() {
    const selectedVoucher = sessionStorage.getItem('selectedVoucher');
    
    if (selectedVoucher) {
        const voucherData = JSON.parse(selectedVoucher);
        const card = document.querySelector(`[data-voucher="${voucherData.code}"]`);
        
        if (card) {
            card.classList.add('selected');
            const button = card.querySelector('.redeem-btn');
            button.classList.add('selected');
            button.textContent = 'SELECTED';
        }
    }
}

// Apply coupon code
function applyCoupon() {
    const couponInput = document.getElementById('couponCode');
    const couponCode = couponInput.value.trim().toUpperCase();
    
    if (!couponCode) {
        showNotification('Please enter a coupon code', 'error');
        return;
    }
    
    // Simulate coupon code validation
    const validCoupons = {
        'SAVE10': { type: 'percent', value: 10, name: '10% Off' },
        'SAVE20': { type: 'percent', value: 20, name: '20% Off' },
        'NEWUSER': { type: 'percent', value: 15, name: 'New User 15%' },
        'STUDENT': { type: 'percent', value: 25, name: 'Student Discount' },
        'RM50OFF': { type: 'flat', value: 50, name: 'RM50 Off' }
    };
    
    if (validCoupons[couponCode]) {
        const coupon = validCoupons[couponCode];
        
        // Store selected voucher
        const voucherData = {
            code: couponCode,
            type: coupon.type,
            value: coupon.value,
            name: coupon.name
        };
        
        sessionStorage.setItem('selectedVoucher', JSON.stringify(voucherData));
        
        showNotification(`Coupon "${coupon.name}" applied!`, 'success');
        
        // Redirect back to confirmation page after short delay
        setTimeout(() => {
            goBack();
        }, 1000);
    } else {
        showNotification('Invalid coupon code', 'error');
    }
}

// Select/Redeem voucher
function selectVoucher(button) {
    if (button.disabled || button.classList.contains('disabled')) {
        showNotification('This voucher is not available for your booking duration', 'error');
        return;
    }
    
    const card = button.closest('.voucher-card');
    const voucherCode = card.dataset.voucher;
    const voucherType = card.dataset.type;
    const voucherValue = parseFloat(card.dataset.value);
    const voucherTitle = card.querySelector('.voucher-title').textContent;
    
    // Remove previous selection
    const allCards = document.querySelectorAll('.voucher-card');
    allCards.forEach(c => {
        c.classList.remove('selected');
        const btn = c.querySelector('.redeem-btn');
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected');
            btn.textContent = 'REDEEM';
        }
    });
    
    // Select this voucher
    card.classList.add('selected');
    button.classList.add('selected');
    button.textContent = 'SELECTED';
    
    // Store selected voucher
    const voucherData = {
        code: voucherCode,
        type: voucherType,
        value: voucherValue,
        name: voucherTitle
    };
    
    sessionStorage.setItem('selectedVoucher', JSON.stringify(voucherData));
    
    showNotification(`"${voucherTitle}" selected!`, 'success');
    
    // Redirect back to confirmation page after short delay
    setTimeout(() => {
        goBack();
    }, 1000);
}

// Go back to previous page
function goBack() {
    if (document.referrer && document.referrer.includes('/booking/confirm')) {
        window.history.back();
    } else {
        window.location.href = '/booking/confirm';
    }
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
    }, 2500);
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

