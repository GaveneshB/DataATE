// Return Reminder JavaScript

let countdownInterval = null;
let returnDateTime = null;

// Initialize reminder with booking data
function initializeReminder(bookingData) {
    // Set car info
    document.getElementById('carInfo').textContent = `${bookingData.carPlate} . ${bookingData.carModel}`;
    
    // Set return location
    document.getElementById('returnLocation').textContent = bookingData.returnLocation;
    
    // Parse return date and time
    const [year, month, day] = bookingData.returnDate.split('-').map(Number);
    const [hours, minutes] = bookingData.returnTime.split(':').map(Number);
    
    returnDateTime = new Date(year, month - 1, day, hours, minutes, 0);
    
    // Format and display return time
    const formattedTime = formatTime(hours, minutes);
    document.getElementById('returnTime').textContent = formattedTime;
    
    // Format and display return date
    const formattedDate = formatDate(returnDateTime);
    document.getElementById('returnDate').textContent = formattedDate;
    
    // Start countdown
    startCountdown();
    
    // Update timeline progress
    updateTimelineProgress();
}

// Format time to display format (e.g., "7.00 p.m.")
function formatTime(hours, minutes) {
    const period = hours >= 12 ? 'p.m.' : 'a.m.';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}.${displayMinutes} ${period}`;
}

// Format date to display format (e.g., "19 December 2025")
function formatDate(date) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

// Start countdown timer
function startCountdown() {
    // Clear existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    const now = new Date();
    const diff = returnDateTime - now;
    
    // Check if overdue
    if (diff <= 0) {
        displayOverdue(Math.abs(diff));
        return;
    }
    
    // Calculate time components
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Update countdown text
    updateCountdownText(hours, minutes);
    
    // Update clock display
    updateClockDisplay(hours, minutes, seconds);
    
    // Update timeline
    updateTimelineProgress();
    
    // Check if urgent (less than 30 minutes)
    if (totalSeconds < 1800) {
        setUrgentState();
    }
}

// Update countdown text
function updateCountdownText(hours, minutes) {
    const countdownText = document.getElementById('countdownText');
    
    if (hours > 0) {
        countdownText.textContent = `Return in ${hours}h ${minutes}min`;
    } else {
        countdownText.textContent = `Return in ${minutes} min`;
    }
    
    countdownText.classList.remove('overdue');
}

// Update clock display
function updateClockDisplay(hours, minutes, seconds) {
    const hourTens = Math.floor(hours / 10);
    const hourOnes = hours % 10;
    const minTens = Math.floor(minutes / 10);
    const minOnes = minutes % 10;
    const secTens = Math.floor(seconds / 10);
    const secOnes = seconds % 10;
    
    document.getElementById('hourTens').textContent = hourTens;
    document.getElementById('hourOnes').textContent = hourOnes;
    document.getElementById('minTens').textContent = minTens;
    document.getElementById('minOnes').textContent = minOnes;
    document.getElementById('secTens').textContent = secTens;
    document.getElementById('secOnes').textContent = secOnes;
    
    // Remove overdue class
    document.querySelectorAll('.clock-digit').forEach(digit => {
        digit.classList.remove('overdue');
    });
}

// Display overdue state
function displayOverdue(overdueMs) {
    const countdownText = document.getElementById('countdownText');
    const totalSeconds = Math.floor(overdueMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Update text
    if (hours > 0) {
        countdownText.textContent = `Overdue by ${hours}h ${minutes}min`;
    } else {
        countdownText.textContent = `Overdue by ${minutes} min`;
    }
    countdownText.classList.add('overdue');
    
    // Update clock display with overdue styling
    document.getElementById('hourTens').textContent = Math.floor(hours / 10);
    document.getElementById('hourOnes').textContent = hours % 10;
    document.getElementById('minTens').textContent = Math.floor(minutes / 10);
    document.getElementById('minOnes').textContent = minutes % 10;
    document.getElementById('secTens').textContent = Math.floor(seconds / 10);
    document.getElementById('secOnes').textContent = seconds % 10;
    
    document.querySelectorAll('.clock-digit').forEach(digit => {
        digit.classList.add('overdue');
    });
    
    // Set urgent button state
    setUrgentState();
    
    // Update timeline to 100%
    document.getElementById('timelineFill').style.width = '100%';
}

// Set urgent state
function setUrgentState() {
    const returnBtn = document.getElementById('returnBtn');
    returnBtn.classList.add('urgent');
    returnBtn.textContent = 'Return Now!';
}

// Update timeline progress
function updateTimelineProgress() {
    // Assume booking started 3 days ago (for demo)
    // In real app, this would come from actual booking data
    const bookingDuration = 3 * 24 * 60 * 60 * 1000; // 3 days in ms
    
    const now = new Date();
    const timeUntilReturn = returnDateTime - now;
    
    // Calculate progress (100% - remaining percentage)
    let progress;
    if (timeUntilReturn <= 0) {
        progress = 100;
    } else if (timeUntilReturn >= bookingDuration) {
        progress = 0;
    } else {
        progress = ((bookingDuration - timeUntilReturn) / bookingDuration) * 100;
    }
    
    document.getElementById('timelineFill').style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 8px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
        ${type === 'error' ? 'background: #E75B5B; color: white;' : 
          type === 'warning' ? 'background: #FFB800; color: #000;' :
          'background: #14213D; color: white;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
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

// Check for low time warning
function checkLowTimeWarning() {
    const now = new Date();
    const diff = returnDateTime - now;
    const minutesLeft = Math.floor(diff / 60000);
    
    if (minutesLeft === 30) {
        showNotification('30 minutes remaining until car return!', 'warning');
    } else if (minutesLeft === 10) {
        showNotification('10 minutes remaining! Please return the car soon.', 'error');
    }
}

// Run warning check every minute
setInterval(checkLowTimeWarning, 60000);

