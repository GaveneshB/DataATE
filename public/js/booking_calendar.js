// Booking Calendar JavaScript

// Current calendar state
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedStartDate = null;
let selectedEndDate = null;
let map;
let geocoder;
let activeMapInputId = null;
let currentMarker = null; // To track the selected point
const studentMallJB = { lat: 1.558557, lng: 103.636647 }; // Student Mall UTM JB

// Time state
let startTime = { hour: 7, minute: 0, period: 'AM' };
let endTime = { hour: 7, minute: 0, period: 'PM' };
let currentTimeSelection = 'start'; // 'start' or 'end'
let timeMode = 'hour'; // 'hour' or 'minute'
let tempTime = { hour: 7, minute: 0, period: 'AM' };

// Sample booking data - this would come from the backend
// Status: 'whole-day', 'half-day', 'few-hours', 'unavailable'
const bookingData = {
    '2025-12-9': 'whole-day',
    '2025-12-10': 'whole-day',
    '2025-12-11': 'half-day',
    '2025-12-12': 'half-day',
    '2025-12-13': 'half-day',
    '2025-12-16': 'unavailable',
    '2025-12-17': 'few-hours',
    '2025-12-18': 'few-hours',
    '2025-12-19': 'unavailable',
    '2025-12-22': 'few-hours',
};

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    initializeClockFace();
});

// Initialize calendar
function initializeCalendar() {
    // Set current month/year in selects
    document.getElementById('monthSelect').value = currentMonth;
    document.getElementById('yearSelect').value = currentYear;
    
    renderCalendar();
}

// Render calendar
function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('button');
        emptyDay.className = 'calendar-day hidden';
        emptyDay.disabled = true;
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
        const dayButton = document.createElement('button');
        dayButton.className = 'calendar-day';
        dayButton.textContent = day;
        
        const dateObj = new Date(currentYear, currentMonth, day);
        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
        
        // Check if date is in the past
        if (dateObj < today) {
            dayButton.classList.add('disabled');
            dayButton.disabled = true;
        } else {
            // Check booking status
            const status = bookingData[dateKey];
            if (status) {
                switch (status) {
                    case 'whole-day':
                        dayButton.classList.add('whole-day-booked');
                        dayButton.disabled = true;
                        dayButton.title = 'Fully booked for the whole day';
                        break;
                    case 'half-day':
                        dayButton.classList.add('half-day-booked');
                        dayButton.title = 'Half-day booked - limited availability';
                        break;
                    case 'few-hours':
                        dayButton.classList.add('few-hours-booked');
                        dayButton.title = 'Few hours booked - mostly available';
                        break;
                    case 'unavailable':
                        dayButton.classList.add('unavailable');
                        dayButton.disabled = true;
                        dayButton.title = 'Not available';
                        break;
                }
            }
            
            // Check if today
            if (dateObj.getTime() === today.getTime()) {
                dayButton.classList.add('today');
            }
            
            // Check if selected
            if (selectedStartDate && dateObj.getTime() === selectedStartDate.getTime()) {
                dayButton.classList.add('selected-start');
            }
            if (selectedEndDate && dateObj.getTime() === selectedEndDate.getTime()) {
                dayButton.classList.add('selected-end');
            }
            if (selectedStartDate && selectedEndDate && 
                dateObj > selectedStartDate && dateObj < selectedEndDate) {
                dayButton.classList.add('selected-range');
            }
            
            // Add click handler
            if (!dayButton.disabled) {
                dayButton.addEventListener('click', () => selectDate(dateObj, day));
            }
        }
        
        calendarDays.appendChild(dayButton);
    }
    
    // Add empty cells to complete the last row
    const remainingCells = 7 - ((startingDay + totalDays) % 7);
    if (remainingCells < 7) {
        for (let i = 0; i < remainingCells; i++) {
            const emptyDay = document.createElement('button');
            emptyDay.className = 'calendar-day disabled';
            emptyDay.textContent = i + 1;
            emptyDay.disabled = true;
            calendarDays.appendChild(emptyDay);
        }
    }
}

function initMap() {
    const defaultLocation = { lat: 1.5607, lng: 103.6370 }; // UTM JB

    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 14,
    });

    geocoder = new google.maps.Geocoder();

    map.addListener("click", function (event) {
        placeMarker(event.latLng);
        getAddress(event.latLng);
    });
}

function getAddress(latLng) {
    geocoder.geocode({ location: latLng }, function(results, status) {
        if (status === "OK") {
            if (results[0]) {
                document.getElementById(activeMapInputId).value = results[0].formatted_address;
            } else {
                document.getElementById(activeMapInputId).value = latLng.lat() + ", " + latLng.lng();
            }
        } else {
            alert("Geocoder failed: " + status);
        }
    });
}


function placeMarker(location) {
    if (currentMarker) {
        currentMarker.setPosition(location);
    } else {
        currentMarker = new google.maps.Marker({
            position: location,
            map: map,
        });
    }
}

function openMapPicker(inputId) {
    activeMapInputId = inputId;
    const modal = document.getElementById('mapModal');
    modal.classList.add('active');

    if (!map) {
        map = new google.maps.Map(document.getElementById("mapCanvas"), {
            center: studentMallJB,
            zoom: 16,
        });

        geocoder = new google.maps.Geocoder();

        // Place default marker
        currentMarker = new google.maps.Marker({
            position: studentMallJB,
            map: map,
        });

        map.addListener("click", function(event) {
            placeMarker(event.latLng);
            getAddress(event.latLng);
        });
    } else {
        google.maps.event.trigger(map, "resize");
        map.setCenter(studentMallJB);
        if (currentMarker) currentMarker.setPosition(studentMallJB);
        else {
            currentMarker = new google.maps.Marker({
                position: studentMallJB,
                map: map,
            });
        }
    }
}

function closeMapPicker() {
    document.getElementById('mapModal').classList.remove('active');
}

// Confirm map selection
function confirmMapSelection() {
    if (!currentMarker) {
        alert("Please click on the map to select a location.");
        return;
    }
    const position = currentMarker.getPosition();
    getAddress(position);
    closeMapPicker();
}

function closeMap() {
    document.getElementById('mapModal').style.display = 'none';
}

// Select date - now triggers time picker
function selectDate(date, day) {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        // Start new selection - show time picker for start time
        selectedStartDate = date;
        selectedEndDate = null;
        currentTimeSelection = 'start';
        tempTime = { ...startTime };
        showTimePicker('Select start time');
    } else if (date >= selectedStartDate) {
        // Set end date - show time picker for end time
        selectedEndDate = date;
        currentTimeSelection = 'end';
        tempTime = { ...endTime };
        showTimePicker('Select end time');
    } else {
        // Reset and start new selection
        selectedStartDate = date;
        selectedEndDate = null;
        currentTimeSelection = 'start';
        tempTime = { ...startTime };
        showTimePicker('Select start time');
    }
    
    renderCalendar();
}

function initializeClockFace() {
    const clockFace = document.getElementById('clockFace');
    const radius = 85; // Matches the height of the clock hand
    const centerX = 128;
    const centerY = 128;
    
    // Clear existing to avoid duplicates
    clockFace.querySelectorAll('.clock-number').forEach(n => n.remove());
    
    for (let i = 1; i <= 12; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const numberEl = document.createElement('div');
        numberEl.className = 'clock-number';
        numberEl.dataset.value = i;
        numberEl.style.left = `${x}px`;
        numberEl.style.top = `${y}px`;
        // Centering trick for perfect alignment
        numberEl.style.transform = 'translate(-50%, -50%)'; 
        
        numberEl.onclick = () => selectClockNumber(i);
        clockFace.appendChild(numberEl);
    }
}

// Replace the existing selectClockNumber function
function selectClockNumber(value) {
    if (timeMode === 'hour') {
        tempTime.hour = value; // 1-12
        updateClockSelection();
        
        // Auto-switch to minute mode after a short delay
        setTimeout(() => {
            setTimeMode('minute');
        }, 300);
    } else {
        // In minute mode, value 12 represents 0 minutes
        let mins = value * 5;
        tempTime.minute = mins === 60 ? 0 : mins;
        updateClockSelection();
    }
}

function updateClockSelection() {
    // Update digital display
    document.getElementById('selectedHour').textContent = 
        tempTime.hour.toString().padStart(2, '0');
    document.getElementById('selectedMinute').textContent = 
        tempTime.minute.toString().padStart(2, '0');
    
    const clockNumbers = document.querySelectorAll('.clock-number');
    let handAngle = 0;

    clockNumbers.forEach(el => {
        const val = parseInt(el.dataset.value);
        let isSelected = false;
        
        if (timeMode === 'hour') {
            isSelected = val === tempTime.hour;
            el.textContent = val;
            if (isSelected) handAngle = val * 30;
        } else {
            let minuteVal = (val * 5) % 60;
            isSelected = minuteVal === tempTime.minute;
            el.textContent = minuteVal.toString().padStart(2, '0');
            if (isSelected) handAngle = val * 30;
        }
        
        // This class now triggers the white text color in CSS
        el.classList.toggle('selected', isSelected);
    });
    
    const hand = document.getElementById('clockHand');
    hand.style.transform = `translateX(-50%) rotate(${handAngle}deg)`;
    
    document.getElementById('amBtn').classList.toggle('active', tempTime.period === 'AM');
    document.getElementById('pmBtn').classList.toggle('active', tempTime.period === 'PM');
}

// Set time mode (hour or minute)
function setTimeMode(mode) {
    timeMode = mode;
    document.getElementById('hourInput').classList.toggle('active', mode === 'hour');
    document.getElementById('minuteInput').classList.toggle('active', mode === 'minute');
    updateClockSelection();
}

// Set period (AM/PM)
function setPeriod(period) {
    tempTime.period = period;
    updateClockSelection();
}

// Show time picker modal
function showTimePicker(title) {
    const modal = document.getElementById('timePickerModal');
    document.getElementById('timePickerTitle').textContent = title;
    
    timeMode = 'hour';
    document.getElementById('hourInput').classList.add('active');
    document.getElementById('minuteInput').classList.remove('active');
    
    updateClockSelection();
    modal.classList.add('active');
}

// Close time picker
function closeTimePicker() {
    const modal = document.getElementById('timePickerModal');
    modal.classList.remove('active');
}

// Confirm time selection
function confirmTime() {
    if (currentTimeSelection === 'start') {
        startTime = { ...tempTime };
        closeTimePicker();
        
        // If we have an end date, show end time picker
        if (selectedEndDate) {
            setTimeout(() => {
                currentTimeSelection = 'end';
                tempTime = { ...endTime };
                showTimePicker('Select end time');
            }, 300);
        }
    } else {
        endTime = { ...tempTime };
        closeTimePicker();
    }
    
    updateDurationField();
}

// Update duration field with time and calculate hours
function updateDurationField() {
    const durationInput = document.getElementById('rentalDuration');
    const durationHours = document.getElementById('durationHours');
    
    if (selectedStartDate && selectedEndDate) {
        const startStr = formatDateTime(selectedStartDate, startTime);
        const endStr = formatDateTime(selectedEndDate, endTime);
        durationInput.value = `${startStr} - ${endStr}`;
        
        // Calculate total hours
        const totalHours = calculateHours();
        durationHours.textContent = `Total: ${totalHours} hour${totalHours !== 1 ? 's' : ''}`;
    } else if (selectedStartDate) {
        const startStr = formatDateTime(selectedStartDate, startTime);
        durationInput.value = `${startStr} - Select end date`;
        durationHours.textContent = '';
    } else {
        durationInput.value = '';
        durationHours.textContent = '';
    }
}

// Calculate total hours between start and end
function calculateHours() {
    if (!selectedStartDate || !selectedEndDate) return 0;
    
    // Convert to 24-hour format
    let startHour24 = startTime.hour;
    if (startTime.period === 'PM' && startTime.hour !== 12) startHour24 += 12;
    if (startTime.period === 'AM' && startTime.hour === 12) startHour24 = 0;
    
    let endHour24 = endTime.hour;
    if (endTime.period === 'PM' && endTime.hour !== 12) endHour24 += 12;
    if (endTime.period === 'AM' && endTime.hour === 12) endHour24 = 0;
    
    // Create full date-time objects
    const startDateTime = new Date(selectedStartDate);
    startDateTime.setHours(startHour24, startTime.minute, 0, 0);
    
    const endDateTime = new Date(selectedEndDate);
    endDateTime.setHours(endHour24, endTime.minute, 0, 0);
    
    // Calculate difference in hours
    const diffMs = endDateTime - startDateTime;
    const diffHours = Math.round(diffMs / (1000 * 60 * 60) * 10) / 10; // Round to 1 decimal
    
    return Math.max(0, diffHours);
}

// Format date with time for display
function formatDateTime(date, time) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = time.hour.toString().padStart(2, '0');
    const minute = time.minute.toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute} ${time.period}`;
}

// Format date for display (without time)
function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Change month
function changeMonth(delta) {
    currentMonth += delta;
    
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    
    document.getElementById('monthSelect').value = currentMonth;
    document.getElementById('yearSelect').value = currentYear;
    
    renderCalendar();
}

// Update calendar from selects
function updateCalendar() {
    currentMonth = parseInt(document.getElementById('monthSelect').value);
    currentYear = parseInt(document.getElementById('yearSelect').value);
    renderCalendar();
}

// Go back to previous page
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/';
    }
}

// Confirm booking
function confirmBooking() {
    if (!selectedStartDate || !selectedEndDate) {
        showNotification('Please select both start and end dates with times', 'error');
        return;
    }
    
    const totalHours = calculateHours();
    if (totalHours <= 0) {
        showNotification('End time must be after start time', 'error');
        return;
    }
    
    const pickupLocation = document.getElementById('pickupLocation').value;
    const returnLocation = document.getElementById('returnLocation').value;
    const destination = document.getElementById('destination').value;
    
    if (!pickupLocation || !returnLocation) {
        showNotification('Please fill in pickup and return locations', 'error');
        return;
    }
    
    // Prepare booking data
    const bookingDetails = {
        car: document.getElementById('selectedCar').textContent,
        startDate: formatDateTime(selectedStartDate, startTime),
        endDate: formatDateTime(selectedEndDate, endTime),
        totalHours: totalHours,
        pickupLocation: pickupLocation,
        returnLocation: returnLocation,
        destination: destination
    };
    
    console.log('Booking confirmed:', bookingDetails);
    
    // Redirect to confirmation page with booking details
    const params = new URLSearchParams({
        car: bookingDetails.car,
        destination: bookingDetails.pickupLocation,
        hours: totalHours,
        startTime: `${startTime.hour}:${startTime.minute.toString().padStart(2, '0')}${startTime.period.toLowerCase()}`,
        endTime: `${endTime.hour}:${endTime.minute.toString().padStart(2, '0')}${endTime.period.toLowerCase()}`,
        startDate: formatDate(selectedStartDate).replace(/\//g, '.'),
        endDate: formatDate(selectedEndDate).replace(/\//g, '.')
    });
    
    window.location.href = `/booking/confirm?${params.toString()}`;
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
        z-index: 1001;
        animation: slideDown 0.3s ease-out;
        ${type === 'error' ? 'background: #E75B5B; color: white;' : 
          type === 'success' ? 'background: #14213D; color: white;' :
          'background: #3F5481; color: white;'}
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
