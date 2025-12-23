<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Return Reminder - DataATE</title>
    <link rel="stylesheet" href="{{ asset('css/return_reminder.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
</head>
<body>
    <div class="reminder-container">
        <!-- Gradient Header -->
        <header class="reminder-header">
            <h1 class="header-title">Car Returning Details</h1>
            
            <!-- Timeline Progress -->
            <div class="timeline-progress">
                <div class="timeline-bar">
                    <div class="timeline-fill" id="timelineFill"></div>
                </div>
                <div class="timeline-markers">
                    <div class="timeline-marker start">
                        <div class="marker-dot"></div>
                    </div>
                    <div class="timeline-marker end">
                        <div class="marker-dot"></div>
                    </div>
                </div>
            </div>

            <!-- Car Info -->
            <p class="car-info" id="carInfo">ABC . Perodua New Axia</p>
        </header>

        <!-- Countdown Section -->
        <section class="countdown-section">
            <h2 class="countdown-text" id="countdownText">Return in 59 min</h2>
            
            <!-- Clock Illustration -->
            <div class="clock-display">
                <div class="clock-frame">
                    <div class="clock-digit" id="hourTens">0</div>
                    <div class="clock-digit" id="hourOnes">0</div>
                    <div class="clock-separator">:</div>
                    <div class="clock-digit" id="minTens">5</div>
                    <div class="clock-digit" id="minOnes">9</div>
                    <div class="clock-separator">:</div>
                    <div class="clock-digit" id="secTens">0</div>
                    <div class="clock-digit" id="secOnes">0</div>
                </div>
            </div>
        </section>

        <!-- Return Details Section -->
        <section class="return-details">
            <!-- Return Date/Time -->
            <div class="return-datetime">
                <span class="return-time" id="returnTime">7.00 p.m.</span>
                <span class="return-date" id="returnDate">19 December 2025</span>
            </div>

            <!-- Location Card -->
            <div class="location-card">
                <div class="location-header">
                    <svg class="location-icon" width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 0L14.5 6L21 6.75L16.25 11.25L17.5 18L11.5 14.75L5.5 18L6.75 11.25L2 6.75L8.5 6L11.5 0Z" fill="#FFFFFF"/>
                    </svg>
                    <span class="location-label">Return location: <span id="returnLocation">Student Mall</span></span>
                </div>
                
                <!-- Map -->
                <div class="map-container">
                    <iframe 
                        id="mapFrame"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.456!2d103.436!3d1.536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMzInMTAuOCJOIDEwM8KwMjYnMDkuNiJF!5e0!3m2!1sen!2smy!4v1"
                        width="100%"
                        height="111"
                        style="border:0; border-radius: 8px;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    <div class="map-overlay" id="mapPlaceholder">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#557D9A"/>
                        </svg>
                        <span>Return Location Map</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Car Image -->
        <div class="car-image-section">
            <img src="{{ asset('image/car-axia-new.png') }}" alt="Car" id="carImage" onerror="this.src='https://via.placeholder.com/337x350?text=Car+Image'">
        </div>

        <!-- Action Button -->
        <a href="{{ route('booking.return') }}" class="return-btn" id="returnBtn">Start Return Process</a>
    </div>

    <script src="{{ asset('js/return_reminder.js') }}"></script>
    <script>
        // Initialize with booking data (would come from server in real app)
        const bookingData = {
            carPlate: '{{ $carPlate ?? "ABC" }}',
            carModel: '{{ $carModel ?? "Perodua New Axia" }}',
            returnTime: '{{ $returnTime ?? "19:00" }}',
            returnDate: '{{ $returnDate ?? "2025-12-19" }}',
            returnLocation: '{{ $returnLocation ?? "Student Mall" }}'
        };
        
        initializeReminder(bookingData);
    </script>
</body>
</html>

