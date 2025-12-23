<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vouchers - DataATE</title>
    <link rel="stylesheet" href="{{ asset('css/voucher.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=ABeeZee&family=Poppins:wght@400;500;600;900&display=swap" rel="stylesheet">
</head>
<body>
    <div class="voucher-container">
        <!-- Header -->
        <header class="voucher-header">
            <button class="back-btn" onclick="goBack()">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 16L7 10.5L13 5" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <h1 class="header-title">COUPON</h1>
        </header>

        <!-- Coupon Code Input -->
        <div class="coupon-input-section">
            <div class="coupon-input-container">
                <input type="text" class="coupon-input" id="couponCode" placeholder="Enter Coupon Code">
                <button class="apply-btn" id="applyBtn" onclick="applyCoupon()">APPLY</button>
            </div>
        </div>

        <!-- More Offers Section -->
        <section class="offers-section">
            <h2 class="section-title">More offer</h2>

            <!-- Vouchers List -->
            <div class="vouchers-list" id="vouchersList">
                <!-- Voucher 1 - 2 Hours Free -->
                <div class="voucher-card" data-voucher="2HOURSFREE" data-type="hours" data-value="2" data-min-days="3">
                    <div class="voucher-left">
                        <span class="voucher-value-text">2 HOURS FREE</span>
                    </div>
                    <div class="voucher-right">
                        <div class="voucher-info">
                            <h3 class="voucher-title">2 Hours Free</h3>
                            <div class="voucher-divider"></div>
                            <p class="voucher-desc">Two hours free for rental 3 days or more.</p>
                        </div>
                        <button class="redeem-btn active" data-code="2HOURSFREE" onclick="selectVoucher(this)">REDEEM</button>
                    </div>
                </div>

                <!-- Voucher 2 - RM70/day -->
                <div class="voucher-card" data-voucher="RM70DAY" data-type="daily" data-value="70" data-min-days="5">
                    <div class="voucher-left">
                        <span class="voucher-value-text">RM70/DAY</span>
                    </div>
                    <div class="voucher-right">
                        <div class="voucher-info">
                            <h3 class="voucher-title">RM70/day (5+day)</h3>
                            <div class="voucher-divider"></div>
                            <p class="voucher-desc">RM70/day for rentals 5 days or more.</p>
                        </div>
                        <button class="redeem-btn" data-code="RM70DAY" onclick="selectVoucher(this)">REDEEM</button>
                    </div>
                </div>

                <!-- Voucher 3 - RM30 flat -->
                <div class="voucher-card" data-voucher="RM30OFF" data-type="flat" data-value="30" data-min-days="0">
                    <div class="voucher-left">
                        <span class="voucher-value-text">RM30 offer</span>
                    </div>
                    <div class="voucher-right">
                        <div class="voucher-info">
                            <h3 class="voucher-title">RM 30 flat</h3>
                            <div class="voucher-divider"></div>
                            <p class="voucher-desc">RM30 off instantly.</p>
                        </div>
                        <button class="redeem-btn" data-code="RM30OFF" onclick="selectVoucher(this)">REDEEM</button>
                    </div>
                </div>

                <!-- Voucher 4 - 20% cashback -->
                <div class="voucher-card" data-voucher="CASHBACK20" data-type="cashback" data-value="20" data-min-days="0">
                    <div class="voucher-left">
                        <span class="voucher-value-text">20% cashback</span>
                    </div>
                    <div class="voucher-right">
                        <div class="voucher-info">
                            <h3 class="voucher-title">20% cashback</h3>
                            <div class="voucher-divider"></div>
                            <p class="voucher-desc">20% return as credit.</p>
                        </div>
                        <button class="redeem-btn" data-code="CASHBACK20" onclick="selectVoucher(this)">REDEEM</button>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <script src="{{ asset('js/voucher.js') }}"></script>
</body>
</html>

