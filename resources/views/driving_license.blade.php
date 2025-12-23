<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Driving License - DataATE</title>
    <link rel="stylesheet" href="{{ asset('css/driving_license.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="license-container">
        <!-- Back Button -->
        <button class="back-btn" onclick="goBack()">
            <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7.5H16M1 7.5L7.5 1M1 7.5L7.5 14" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>

        <!-- Title -->
        <h1 class="page-title">Take a screenshot of your driving license</h1>

        <!-- Instructions -->
        <p class="instructions">
            Please make sure that the image uploaded is clear with no shading or dark areas covering the text.
        </p>

        <!-- Example Section -->
        <div class="example-section">
            <p class="example-label">Example:</p>
            <div class="example-image">
                <img src="{{ asset('image/driving-license-example.png') }}" alt="Driving License Example" onerror="this.parentElement.innerHTML='<div class=\'placeholder-license\'><span>Driving License Example</span></div>'">
            </div>
        </div>

        <!-- Upload Form -->
        <form id="licenseForm" enctype="multipart/form-data">
            @csrf
            
            <!-- Upload Area -->
            <div class="upload-area" id="uploadArea" onclick="triggerFileInput()">
                <div class="upload-icon">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="3.5" width="20" height="14" rx="2" stroke="#000" stroke-width="1.5"/>
                        <circle cx="7" cy="10" r="2.5" stroke="#000" stroke-width="1.5"/>
                        <circle cx="16" cy="8" r="1" fill="#000"/>
                    </svg>
                </div>
                <span class="upload-text">Upload Photo</span>
                <input type="file" id="licenseInput" name="driving_license" accept="image/*" hidden>
            </div>

            <!-- Image Preview -->
            <div class="preview-area" id="previewArea" style="display: none;">
                <div class="preview-header">
                    <span>Preview</span>
                    <button type="button" class="remove-btn" onclick="removeImage()">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="9" stroke="#D52F2F" stroke-width="2"/>
                            <path d="M7 7L13 13M13 7L7 13" stroke="#D52F2F" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <img id="previewImage" src="" alt="License Preview">
            </div>

            <!-- Submit Button -->
            <div class="submit-section">
                <button type="submit" class="submit-btn" id="submitBtn" disabled>Submit</button>
            </div>
        </form>

        <!-- Status Message -->
        <div class="status-section" id="statusSection" style="display: none;">
            <div class="status-icon pending" id="statusIcon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            <p class="status-text" id="statusText">Your driving license is under review</p>
        </div>
    </div>

    <script src="{{ asset('js/driving_license.js') }}"></script>
</body>
</html>

