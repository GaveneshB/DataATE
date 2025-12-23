// Order History JavaScript

let currentBookingToCancel = null;

// Go back
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/profile';
    }
}

// Switch between tabs
function switchTab(tabName) {
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update tab content
    const currentTab = document.getElementById('currentTab');
    const pastTab = document.getElementById('pastTab');
    
    if (tabName === 'current') {
        currentTab.classList.add('active');
        pastTab.classList.remove('active');
    } else {
        pastTab.classList.add('active');
        currentTab.classList.remove('active');
    }
}

// Cancel booking - redirect to cancel form page
function cancelBooking(bookingId) {
    // Redirect to the cancel booking form page
    window.location.href = '/booking/' + bookingId + '/cancel';
}

// Close modal
function closeModal() {
    document.getElementById('cancelModal').style.display = 'none';
    currentBookingToCancel = null;
}

// Confirm cancellation
function confirmCancel() {
    if (!currentBookingToCancel) return;
    
    const bookingCard = document.querySelector(`[data-booking-id="${currentBookingToCancel}"]`);
    
    if (bookingCard) {
        // Animate removal
        bookingCard.style.transition = 'all 0.3s ease';
        bookingCard.style.transform = 'translateX(-100%)';
        bookingCard.style.opacity = '0';
        
        setTimeout(() => {
            // Remove from current tab
            bookingCard.remove();
            
            // Check if current tab is empty
            const currentTab = document.getElementById('currentTab');
            const remainingCards = currentTab.querySelectorAll('.booking-card');
            
            if (remainingCards.length === 0) {
                document.getElementById('currentEmpty').style.display = 'flex';
            }
            
            // Add to past tab as cancelled (optional - in real app, would be handled server-side)
            addToPastBookings(currentBookingToCancel);
            
            showNotification('Booking cancelled successfully', 'success');
        }, 300);
    }
    
    closeModal();
}

// Add cancelled booking to past bookings
function addToPastBookings(bookingId) {
    const pastTab = document.getElementById('pastTab');
    const emptyState = document.getElementById('pastEmpty');
    
    // Hide empty state if visible
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    // Create cancelled booking card
    const cancelledCard = document.createElement('div');
    cancelledCard.className = 'booking-card past';
    cancelledCard.innerHTML = `
        <div class="booking-info">
            <h3 class="booking-title">Booking Details</h3>
            
            <div class="detail-row">
                <div class="detail-icon">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 1L11.5 7L17 8L13 12L14 17L8.5 14.5L3 17L4 12L0 8L5.5 7L8.5 1Z" fill="#000"/>
                    </svg>
                </div>
                <div class="detail-content">
                    <span class="detail-label">Destination</span>
                    <span class="detail-value">Melaka</span>
                </div>
            </div>

            <div class="detail-row">
                <div class="detail-icon">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="3" width="15" height="13" rx="2" stroke="#000" stroke-width="1.5"/>
                        <path d="M1 7H16" stroke="#000" stroke-width="1.5"/>
                        <path d="M5 1V4" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M12 1V4" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="detail-content">
                    <span class="detail-label">Time</span>
                    <span class="detail-value">7:00am (16.12.2025) - 7:00am (19.12.2025)</span>
                </div>
            </div>

            <div class="booking-status cancelled">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="#D52F2F" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>Cancelled</span>
            </div>
        </div>

        <div class="booking-car-image">
            <img src="/image/car-bezza-2023-1.png" alt="Car" onerror="this.src='https://via.placeholder.com/166x111?text=Car'">
        </div>
    `;
    
    // Insert at the beginning of past tab
    const firstCard = pastTab.querySelector('.booking-card');
    if (firstCard) {
        pastTab.insertBefore(cancelledCard, firstCard);
    } else {
        pastTab.appendChild(cancelledCard);
    }
    
    // Animate in
    cancelledCard.style.opacity = '0';
    cancelledCard.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        cancelledCard.style.transition = 'all 0.3s ease';
        cancelledCard.style.opacity = '1';
        cancelledCard.style.transform = 'translateY(0)';
    }, 10);
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
    }, 3000);
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

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('cancelModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

