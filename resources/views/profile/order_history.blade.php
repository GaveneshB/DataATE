<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order History - DataATE</title>
    <link rel="stylesheet" href="{{ asset('css/order_history.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&family=Sen:wght@400&family=Shippori+Antique&display=swap" rel="stylesheet">
</head>
<body>
    <div class="history-container">
        <!-- Header -->
        <header class="history-header">
            <!-- Logo -->
            <div class="header-logo">
                <img src="{{ asset('image/logo.png') }}" alt="DataATE" onerror="this.style.display='none'">
            </div>

            <!-- Navigation -->
            <nav class="header-nav">
                <a href="{{ route('mainpage') }}" class="nav-link">Home</a>
                <a href="{{ route('booking.calendar') }}" class="nav-link">Car Rental</a>
                <a href="#" class="nav-link">Notification</a>
                <a href="{{ route('profile.edit') }}" class="nav-link active">Profile</a>
            </nav>

            <!-- Page Title -->
            <div class="page-title-section">
                <button class="back-btn" onclick="goBack()">
                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7.5H16M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <h1 class="page-title">Order History</h1>
            </div>

            <!-- Tab Switcher -->
            <div class="tab-switcher">
                <button class="tab-btn active" data-tab="current" onclick="switchTab('current')">Current</button>
                <button class="tab-btn" data-tab="past" onclick="switchTab('past')">Past</button>
            </div>
        </header>

        <!-- Content Area -->
        <main class="history-content">
            <!-- Current Bookings -->
            <div class="tab-content active" id="currentTab">
                <!-- Current Booking Card -->
                <div class="booking-card" data-booking-id="1">
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
                    </div>

                    <div class="booking-car-image">
                        <img src="{{ asset('image/car-bezza-2023-1.png') }}" alt="Car" onerror="this.src='https://via.placeholder.com/166x111?text=Car'">
                    </div>

                    <button class="cancel-btn" onclick="cancelBooking(1)">Cancel</button>
                </div>

                <!-- Empty State -->
                <div class="empty-state" id="currentEmpty" style="display: none;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#999" stroke-width="2"/>
                        <path d="M12 8V12L15 15" stroke="#999" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <p>No current bookings</p>
                </div>
            </div>

            <!-- Past Bookings -->
            <div class="tab-content" id="pastTab">
                <!-- Past Booking Card 1 -->
                <div class="booking-card past">
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
                                <span class="detail-value">Johor Bahru</span>
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
                                <span class="detail-value">9:00am (10.12.2025) - 5:00pm (12.12.2025)</span>
                            </div>
                        </div>

                        <div class="booking-status completed">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3 4.7L6 12L2.7 8.7" stroke="#14AE5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Completed</span>
                        </div>
                    </div>

                    <div class="booking-car-image">
                        <img src="{{ asset('image/car-axia-new.png') }}" alt="Car" onerror="this.src='https://via.placeholder.com/166x111?text=Car'">
                    </div>
                </div>

                <!-- Past Booking Card 2 (Cancelled) -->
                <div class="booking-card past">
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
                                <span class="detail-value">Kuala Lumpur</span>
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
                                <span class="detail-value">2:00pm (05.12.2025) - 8:00pm (06.12.2025)</span>
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
                        <img src="{{ asset('image/car-myvi-2024.png') }}" alt="Car" onerror="this.src='https://via.placeholder.com/166x111?text=Car'">
                    </div>
                </div>

                <!-- Empty State -->
                <div class="empty-state" id="pastEmpty" style="display: none;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#999" stroke-width="2"/>
                        <path d="M12 8V12L15 15" stroke="#999" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <p>No past bookings</p>
                </div>
            </div>
        </main>

    </div>

    <script src="{{ asset('js/order_history.js') }}"></script>
</body>
</html>

