<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Booking Form - DataATE</title>
    <link rel="stylesheet" href="{{ asset('css/booking_form.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500&family=Geist:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
    <div class="booking-container">
        <!-- Back Arrow -->
        <button class="back-btn" onclick="goBack()">
            <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 1L1 7.5L7.5 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 7.5H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>

        <!-- Logo -->
        <img src="{{ asset('image/dataate-logo.png') }}" alt="DataATE" class="header-logo" onerror="this.style.display='none'">

        <!-- Form Card -->
        <div class="form-card">
            <!-- Header -->
            <div class="form-header">
                <h1 class="form-title">Car Booking Form</h1>
            </div>

            <!-- Booking Form -->
            <form id="bookingForm" class="booking-form" method="POST" action="{{ route('booking.store') }}">
                @csrf
                
                <!-- Car Field -->
                <div class="form-group">
                    <label for="car">Car</label>
                    <div class="input-field">
                        <input type="text" id="car" name="car" value="{{ $car->name ?? 'Perodua Bezza 2023' }}" readonly>
                    </div>
                </div>

                <!-- Choose Rental Date -->
                <div class="form-group">
                    <label>Choose your rental date</label>
                    
                    <!-- Calendar Component -->
                    <div class="calendar-container">
                        <!-- Calendar Header -->
                        <div class="calendar-header">
                            <button type="button" class="cal-nav-btn prev-month">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M12.5 15L7.5 10L12.5 5" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <div class="calendar-selects">
                                <div class="month-select">
                                    <select id="calendarMonth">
                                        <option value="0">Jan</option>
                                        <option value="1">Feb</option>
                                        <option value="2">Mar</option>
                                        <option value="3">Apr</option>
                                        <option value="4">May</option>
                                        <option value="5">Jun</option>
                                        <option value="6">Jul</option>
                                        <option value="7">Aug</option>
                                        <option value="8">Sep</option>
                                        <option value="9">Oct</option>
                                        <option value="10">Nov</option>
                                        <option value="11" selected>Dec</option>
                                    </select>
                                </div>
                                <div class="year-select">
                                    <select id="calendarYear">
                                        <option value="2024">2024</option>
                                        <option value="2025" selected>2025</option>
                                        <option value="2026">2026</option>
                                    </select>
                                </div>
                            </div>
                            <button type="button" class="cal-nav-btn next-month">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>

                        <!-- Calendar Legend -->
                        <div class="calendar-legend">
                            <div class="legend-item">
                                <span class="legend-color whole-day"></span>
                                <span class="legend-text">Whole day</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-color half-day"></span>
                                <span class="legend-text">Half day</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-color few-hours"></span>
                                <span class="legend-text">Few hours</span>
                            </div>
                        </div>

                        <!-- Calendar Table -->
                        <div class="calendar-table">
                            <!-- Days Header -->
                            <div class="calendar-thead">
                                <div class="cal-header-cell">Su</div>
                                <div class="cal-header-cell">Mo</div>
                                <div class="cal-header-cell">Tu</div>
                                <div class="cal-header-cell">We</div>
                                <div class="cal-header-cell">Th</div>
                                <div class="cal-header-cell">Fr</div>
                                <div class="cal-header-cell">Sa</div>
                            </div>
                            <!-- Calendar Body - Generated by JS -->
                            <div class="calendar-tbody" id="calendarBody">
                                <!-- Days will be rendered here -->
                            </div>
                        </div>
                    </div>

                    <!-- Hidden inputs for selected dates -->
                    <input type="hidden" id="start_date" name="start_date">
                    <input type="hidden" id="end_date" name="end_date">
                </div>

                <!-- Rental Duration -->
                <div class="form-group">
                    <label for="duration">Rental duration</label>
                    <div class="input-field">
                        <input type="text" id="duration" name="duration" placeholder="Select dates above" readonly>
                    </div>
                </div>

                <!-- Pick Up Location -->
                <div class="form-group">
                    <label for="pickup">Pick Up Location</label>
                    <div class="input-field">
                        <input type="text" id="pickup" name="pickup" value="Student Mall" placeholder="Enter pick up location">
                    </div>
                    <span class="field-note">A minimum charge of RM10 for location besides Student Mall</span>
                </div>

                <!-- Return Location -->
                <div class="form-group">
                    <label for="return_location">Return Location</label>
                    <div class="input-field">
                        <input type="text" id="return_location" name="return_location" value="Student Mall" placeholder="Enter return location">
                    </div>
                    <span class="field-note">A minimum charge of RM10 for location besides Student Mall</span>
                </div>

                <!-- Destination -->
                <div class="form-group">
                    <label for="destination">Destination</label>
                    <div class="input-field">
                        <input type="text" id="destination" name="destination" placeholder="Enter your destination">
                    </div>
                </div>

                <!-- Confirm Button -->
                <div class="form-actions">
                    <button type="submit" class="confirm-btn">Confirm</button>
                </div>
            </form>
        </div>
    </div>

    <script src="{{ asset('js/booking_form.js') }}"></script>
</body>
</html>
