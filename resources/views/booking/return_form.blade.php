<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Return Car - DataATE</title>
    <link rel="stylesheet" href="{{ asset('css/return_form.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;500;600;700&display=swap" rel="stylesheet">

</head>
<body>
    <div class="return-container">
        <!-- Header -->
        <header class="return-header">
            <button class="back-btn" onclick="goBack()">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 17L8.5 11.5L14.5 6" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="header-logo">
                <img src="{{ asset('image/logo.png') }}" alt="DataATE" onerror="this.style.display='none'; this.onerror=null;">
            </div>
        </header>

        <!-- Progress Indicator -->
        <div class="progress-section">
            <div class="progress-bar">
                <div class="progress-step completed">
                    <div class="step-icon">
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2H2C1.44772 2 1 2.44772 1 3V15C1 15.5523 1.44772 16 2 16H12C12.5523 16 13 15.5523 13 15V3C13 2.44772 12.5523 2 12 2Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M4 6H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M4 10H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M4 14H7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div class="progress-line completed"></div>
                <div class="progress-step completed">
                    <div class="step-icon">
                        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 8H5C3.89543 8 3 8.89543 3 10V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V10C21 8.89543 20.1046 8 19 8Z" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M7 8V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V8" stroke="currentColor" stroke-width="1.5"/>
                            <circle cx="12" cy="13" r="2" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
                <div class="progress-line active"></div>
                <div class="progress-step active">
                    <div class="step-icon">
                        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="progress-labels">
                <span class="completed">Booking</span>
                <span class="completed">Pick Up</span>
                <span class="active">Return</span>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Form Content -->
        <form id="returnForm" class="return-form" enctype="multipart/form-data">
            @csrf
            
            <!-- Upload Car Images Section -->
            <section class="form-section">
                <h2 class="section-title">Upload car images</h2>
                <p class="section-desc">Upload clear photos of the vehicle from all sides. (with description if any)</p>
                
                <div class="upload-card" id="carImagesCard">
                    <div class="upload-area" onclick="document.getElementById('carImages').click()">
                        <div class="upload-icon">
                            <svg width="47" height="44" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="46" height="43" rx="21.5" stroke="#263955"/>
                                <path d="M23.5 15V29" stroke="#000" stroke-width="1.2" stroke-linecap="round"/>
                                <path d="M16 22H31" stroke="#000" stroke-width="1.2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <span class="upload-text">Upload Photo</span>
                    </div>
                    <input type="file" id="carImages" name="car_images[]" multiple accept="image/*" hidden>
                    
                    <div class="example-section">
                        <span class="example-label">For example:</span>
                        <div class="example-images">
                            <div class="example-placeholder" id="carExampleContainer">
                                <img id="carExampleImage" 
                                     src="{{ asset('image/car-example-front.png') }}" 
                                     alt="Front view example" 
                                     style="display: none;">
                                <div class="example-text" id="carExamplePlaceholder">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#999" stroke-width="1.5"/>
                                        <circle cx="8.5" cy="8.5" r="1.5" fill="#999"/>
                                        <path d="M3 15L7 11L11 15" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11 13L14 10L21 17" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>Front View</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="preview-container" id="carImagesPreview"></div>
                </div>
                
                <!-- Description Text Area -->
                <div class="description-input">
                    <textarea name="car_description" placeholder="Describe any scratches or issues…" rows="3"></textarea>
                </div>
            </section>

            <!-- Return Fuel Level Section -->
            <section class="form-section">
                <h2 class="section-title">Car Return Fuel Level</h2>
                <p class="section-desc">Select your fuel level during car return</p>
                
                <div class="fuel-level-card">
                    <div class="fuel-gauge">
                        <div class="fuel-level" data-level="1" onclick="selectFuelLevel(1)">
                            <svg viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="8" width="30" height="25" rx="2" stroke="#212121" stroke-width="1"/>
                                <rect x="6" y="28" width="24" height="3" fill="#FF0404"/>
                                <rect x="33" y="16" width="3" height="8" rx="1" fill="#212121"/>
                            </svg>
                        </div>
                        <div class="fuel-level" data-level="2" onclick="selectFuelLevel(2)">
                            <svg viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="8" width="30" height="25" rx="2" stroke="#212121" stroke-width="1"/>
                                <rect x="6" y="24" width="24" height="7" fill="#FF8C00"/>
                                <rect x="33" y="16" width="3" height="8" rx="1" fill="#212121"/>
                            </svg>
                        </div>
                        <div class="fuel-level" data-level="3" onclick="selectFuelLevel(3)">
                            <svg viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="8" width="30" height="25" rx="2" stroke="#212121" stroke-width="1"/>
                                <rect x="6" y="20" width="24" height="11" fill="#FFD700"/>
                                <rect x="33" y="16" width="3" height="8" rx="1" fill="#212121"/>
                            </svg>
                        </div>
                        <div class="fuel-level selected" data-level="4" onclick="selectFuelLevel(4)">
                            <svg viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="8" width="30" height="25" rx="2" stroke="#212121" stroke-width="1"/>
                                <rect x="6" y="16" width="24" height="15" fill="#90EE90"/>
                                <rect x="33" y="16" width="3" height="8" rx="1" fill="#212121"/>
                            </svg>
                        </div>
                        <div class="fuel-level" data-level="5" onclick="selectFuelLevel(5)">
                            <svg viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="8" width="30" height="25" rx="2" stroke="#212121" stroke-width="1"/>
                                <rect x="6" y="13" width="24" height="18" fill="#32CD32"/>
                                <rect x="33" y="16" width="3" height="8" rx="1" fill="#212121"/>
                            </svg>
                        </div>
                        <div class="fuel-level" data-level="6" onclick="selectFuelLevel(6)">
                            <svg viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="8" width="30" height="25" rx="2" stroke="#212121" stroke-width="1"/>
                                <rect x="6" y="10" width="24" height="21" fill="#228B22"/>
                                <rect x="33" y="16" width="3" height="8" rx="1" fill="#212121"/>
                            </svg>
                        </div>
                    </div>
                    <input type="hidden" name="fuel_level" id="fuelLevel" value="4">
                </div>
            </section>

            <!-- Upload Inspection Form Section -->
            <section class="form-section">
                <h2 class="section-title">Upload Your Inspection Form</h2>
                <p class="section-desc">Upload your form here (PDF format only).</p>
                
                <div class="upload-card" id="inspectionCard">
                    <div class="upload-area" onclick="document.getElementById('agreementForm').click()">
                        <div class="upload-icon">
                            <svg width="47" height="44" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="46" height="43" rx="21.5" stroke="#263955"/>
                                <path d="M23.5 15V29" stroke="#000" stroke-width="1.2" stroke-linecap="round"/>
                                <path d="M16 22H31" stroke="#000" stroke-width="1.2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <span class="upload-text">Upload PDF</span>
                    </div>
                    <input type="file" id="inspectionForm" name="inspection_form" accept=".pdf,application/pdf" hidden>
                    
                    <div class="example-section">
                        <span class="example-label">For example:</span>
                        <div class="example-files">
                            <span class="file-example">inspection_form.pdf</span>
                        </div>
                    </div>
                    
                    <div class="file-preview" id="inspectionPreview"></div>
                </div>
            </section>

            <!-- Rate Our Service Section -->
            <section class="form-section">
                <h2 class="section-title">Rate our service</h2>
                
                <div class="rating-container">
                    <div class="star-rating" id="starRating">
                        <div class="star" data-rating="1" onclick="setRating(1)">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 8L39.27 22.72L56 25.28L44 37.04L46.54 53.68L32 45.96L17.46 53.68L20 37.04L8 25.28L24.73 22.72L32 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="star" data-rating="2" onclick="setRating(2)">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 8L39.27 22.72L56 25.28L44 37.04L46.54 53.68L32 45.96L17.46 53.68L20 37.04L8 25.28L24.73 22.72L32 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="star" data-rating="3" onclick="setRating(3)">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 8L39.27 22.72L56 25.28L44 37.04L46.54 53.68L32 45.96L17.46 53.68L20 37.04L8 25.28L24.73 22.72L32 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="star" data-rating="4" onclick="setRating(4)">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 8L39.27 22.72L56 25.28L44 37.04L46.54 53.68L32 45.96L17.46 53.68L20 37.04L8 25.28L24.73 22.72L32 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="star" data-rating="5" onclick="setRating(5)">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 8L39.27 22.72L56 25.28L44 37.04L46.54 53.68L32 45.96L17.46 53.68L20 37.04L8 25.28L24.73 22.72L32 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <input type="hidden" name="rating" id="ratingInput" value="0">
                </div>
            </section>

            <!-- Additional Feedback Section -->
            <section class="form-section">
                <h2 class="section-title">Additional feedback</h2>
                
                <div class="feedback-card">
                    <textarea name="additional_feedback" placeholder="Any additional comments about the vehicle" rows="4"></textarea>
                </div>
            </section>

            <!-- Submit Button -->
            <button type="submit" class="submit-btn">Submit</button>
        </form>
    </div>

    <script>
        // Handle example image loading - PREVENT INFINITE LOOP
        document.addEventListener('DOMContentLoaded', function() {
            // Car example image
            const carExampleImg = document.getElementById('carExampleImage');
            const carPlaceholder = document.getElementById('carExamplePlaceholder');
            
            if (carExampleImg) {
                carExampleImg.onload = function() {
                    this.style.display = 'block';
                    if (carPlaceholder) carPlaceholder.style.display = 'none';
                };
                
                carExampleImg.onerror = function() {
                    this.style.display = 'none';
                    if (carPlaceholder) carPlaceholder.style.display = 'flex';
                    this.onerror = null; // CRITICAL: Prevent infinite loop
                };
            }
        });
    </script>
    <script src="{{ asset('js/return_form.js') }}"></script>
</body>
</html>