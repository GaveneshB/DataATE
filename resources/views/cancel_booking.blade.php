<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cancel Booking - DataATE</title>
    <link rel="stylesheet" href="{{ asset('css/cancel_booking.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@700&family=Work+Sans:wght@400&family=Yeseva+One&display=swap" rel="stylesheet">
</head>
<body>
    <div class="cancel-container">
        <!-- Header -->
        <header class="cancel-header">
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
                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9H16M1 9L7.5 2M1 9L7.5 16" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <h1 class="page-title">Cancel booking</h1>
            </div>
        </header>

        <!-- Form Content -->
        <form id="cancelForm" class="cancel-form">
            @csrf
            <input type="hidden" name="booking_id" id="bookingId" value="{{ $bookingId ?? '1' }}">

            <!-- Booking Details Card -->
            <div class="booking-details-card">
                <div class="card-header">
                    <div class="card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#0B1C3F" stroke-width="2"/>
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="#0B1C3F" stroke-width="2"/>
                            <path d="M9 12H15" stroke="#0B1C3F" stroke-width="2" stroke-linecap="round"/>
                            <path d="M9 16H13" stroke="#0B1C3F" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <h2 class="card-title">Booking Details</h2>
                </div>

                <div class="booking-info-grid">
                    <div class="info-row">
                        <span class="info-label">Booking ID:</span>
                        <span class="info-value" id="displayBookingId">UNI-2025-0622-001</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Customer Name:</span>
                        <span class="info-value" id="displayCustomerName">Faizal1234</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Matric no:</span>
                        <span class="info-value" id="displayMatricNo">A24C1234</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Rental Period:</span>
                        <span class="info-value" id="displayRentalPeriod">72 hours</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Vehicle:</span>
                        <span class="info-value" id="displayVehicle">Perodua Bezza 2023</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Plate:</span>
                        <span class="info-value" id="displayPlate">ABC 1234</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Pickup:</span>
                        <span class="info-value" id="displayPickup">Student Mall</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Return:</span>
                        <span class="info-value" id="displayReturn">2025-12-03 18:00</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Return Place:</span>
                        <span class="info-value" id="displayReturnPlace">Student Mall</span>
                    </div>
                </div>
            </div>

            <!-- Bank Selection Section -->
            <section class="form-section">
                <h3 class="section-title">Select your bank</h3>
                
                <div class="select-wrapper">
                    <select name="bank" id="bankSelect" required>
                        <option value="" disabled selected>Select</option>
                        <option value="maybank">Maybank</option>
                        <option value="cimb">CIMB Bank</option>
                        <option value="publicbank">Public Bank</option>
                        <option value="rhb">RHB Bank</option>
                        <option value="hongLeong">Hong Leong Bank</option>
                        <option value="ambank">AmBank</option>
                        <option value="bankislam">Bank Islam</option>
                        <option value="bsn">BSN</option>
                    </select>
                    <div class="select-arrow">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6L8 10L12 6" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </section>

            <!-- Account Details Section -->
            <section class="form-section">
                <h3 class="section-title">Enter your account details</h3>
                
                <div class="input-group">
                    <input type="text" name="account_number" id="accountNumber" placeholder="Your account number" required pattern="[0-9]{10,16}" title="Please enter a valid account number (10-16 digits)">
                </div>

                <div class="input-group">
                    <input type="text" name="account_holder" id="accountHolder" placeholder="Account holder name" required>
                </div>
            </section>

            <!-- Refund Info -->
            <div class="refund-info">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="#14AE5C" stroke-width="2"/>
                    <path d="M10 6V10" stroke="#14AE5C" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="10" cy="14" r="1" fill="#14AE5C"/>
                </svg>
                <span>Your deposit of <strong>RM50.00</strong> will be refunded within 3-5 working days.</span>
            </div>

            <!-- Cancel Button -->
            <button type="submit" class="cancel-btn">Cancel</button>
        </form>
    </div>

    <script src="{{ asset('js/cancel_booking.js') }}"></script>
</body>
</html>

