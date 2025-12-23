// Return Form JavaScript - FIXED VERSION

// Selected values
let selectedFuelLevel = 4;
let selectedRating = 0;

// Uploaded files
let carImages = [];
let inspectionFile = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

// Initialize form
function initializeForm() {
    // Set initial fuel level
    selectFuelLevel(4);
    
    // Handle form submission
    const form = document.getElementById('returnForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    // Initialize file inputs
    const carImagesInput = document.getElementById('carImages');
    const inspectionInput = document.getElementById('inspectionForm');
    
    if (carImagesInput) {
        carImagesInput.addEventListener('change', function() {
            handleImageUpload(this, 'carImagesPreview');
        });
    }
    
    if (inspectionInput) {
        inspectionInput.addEventListener('change', function() {
            handleFileUpload(this, 'inspectionPreview');
        });
    }
}

// Go back
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/booking/pickup';
    }
}

// Select fuel level
function selectFuelLevel(level) {
    selectedFuelLevel = level;
    
    const fuelLevelInput = document.getElementById('fuelLevel');
    if (fuelLevelInput) {
        fuelLevelInput.value = level;
    }
    
    // Update UI
    const allLevels = document.querySelectorAll('.fuel-level');
    allLevels.forEach(el => {
        el.classList.remove('selected');
        if (parseInt(el.dataset.level) === level) {
            el.classList.add('selected');
        }
    });
}

// Set star rating
function setRating(rating) {
    selectedRating = rating;
    
    const ratingInput = document.getElementById('ratingInput');
    if (ratingInput) {
        ratingInput.value = rating;
    }
    
    // Update UI
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Handle image upload - FIXED
function handleImageUpload(input, previewId) {
    const previewContainer = document.getElementById(previewId);
    if (!previewContainer) return;
    
    const files = Array.from(input.files);
    
    if (files.length === 0) return;
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(f => !validTypes.includes(f.type.toLowerCase()));
    
    if (invalidFiles.length > 0) {
        showNotification('Please upload only image files (JPG, PNG, GIF, WebP)', 'error');
        input.value = '';
        return;
    }
    
    // Validate file size (max 5MB per image)
    const oversizedFiles = files.filter(f => f.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
        showNotification('Each image must be less than 5MB', 'error');
        input.value = '';
        return;
    }
    
    // Process files
    let processedCount = 0;
    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = {
                file: file,
                dataUrl: e.target.result,
                id: Date.now() + Math.random() + index,
                name: file.name
            };
            carImages.push(imageData);
            
            processedCount++;
            if (processedCount === files.length) {
                renderImagePreview(previewContainer);
            }
        };
        reader.onerror = function() {
            showNotification('Error reading file: ' + file.name, 'error');
            processedCount++;
        };
        reader.readAsDataURL(file);
    });
    
    // Clear input to allow re-uploading same file
    input.value = '';
}

// Render image preview - FIXED
function renderImagePreview(container) {
    if (!container) return;
    
    container.innerHTML = carImages.map((img, index) => `
        <div class="preview-item" data-index="${index}">
            <img src="${img.dataUrl}" alt="Car image ${index + 1}">
            <button type="button" class="preview-remove" onclick="removeImage(${index})" aria-label="Remove image">×</button>
        </div>
    `).join('');
}

// Remove image - FIXED
function removeImage(index) {
    if (index >= 0 && index < carImages.length) {
        carImages.splice(index, 1);
        const container = document.getElementById('carImagesPreview');
        if (container) {
            renderImagePreview(container);
        }
    }
}

// Handle file upload (PDF) - COMPLETELY FIXED
function handleFileUpload(input, previewId) {
    console.log('handleFileUpload called for PDF');
    const previewContainer = document.getElementById(previewId);
    
    if (!previewContainer) {
        console.error('Preview container not found:', previewId);
        return;
    }
    
    const file = input.files[0];
    console.log('File selected:', file);
    
    if (!file) {
        console.log('No file selected');
        return;
    }
    
    console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size
    });
    
    // Validate file type
    const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    
    if (!isPDF) {
        console.error('Invalid file type:', file.type);
        showNotification('Please upload only PDF files', 'error');
        input.value = '';
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        console.error('File too large:', file.size);
        showNotification('File size must be less than 10MB', 'error');
        input.value = '';
        return;
    }
    
    // Save file
    inspectionFile = file;
    console.log('Inspection file saved:', inspectionFile.name);
    
    // Show preview - THIS IS THE KEY FIX
    const previewHTML = `
        <div class="file-item">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${file.name}</span>
            <button type="button" class="file-remove" onclick="removeFile('${previewId}')" aria-label="Remove file">×</button>
        </div>
    `;
    
    previewContainer.innerHTML = previewHTML;
    console.log('PDF preview rendered');
    
    showNotification('PDF uploaded successfully!', 'success');
}

// Remove file - FIXED
function removeFile(previewId) {
    inspectionFile = null;
    const previewContainer = document.getElementById(previewId);
    const inspectionInput = document.getElementById('inspectionForm');
    
    if (previewContainer) {
        previewContainer.innerHTML = '';
    }
    if (inspectionInput) {
        inspectionInput.value = '';
    }
}

// Handle form submission - FIXED
function handleSubmit(e) {
    e.preventDefault();
    
    // Validate required fields
    if (carImages.length === 0) {
        showNotification('Please upload at least one car image', 'error');
        return;
    }
    
    if (!inspectionFile) {
        showNotification('Please upload the inspection form', 'error');
        return;
    }
    
    if (selectedRating === 0) {
        showNotification('Please rate our service', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(e.target);
    
    // Remove any existing car_images entries
    formData.delete('car_images[]');
    
    // Add car images
    carImages.forEach((img, index) => {
        formData.append('car_images[]', img.file);
    });
    
    // Remove any existing inspection_form entries
    formData.delete('inspection_form');
    
    // Add inspection file
    formData.append('inspection_form', inspectionFile);
    
    // Set fuel level and rating
    formData.set('fuel_level', selectedFuelLevel);
    formData.set('rating', selectedRating);
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            console.log('Return form submitted:', {
                carImages: carImages.length,
                inspectionFile: inspectionFile.name,
                fuelLevel: selectedFuelLevel,
                rating: selectedRating,
                description: formData.get('car_description'),
                additionalFeedback: formData.get('additional_feedback')
            });
            
            showNotification('Return form submitted successfully!', 'success');
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show thank you message
            setTimeout(() => {
                showNotification('Thank you for using our service!', 'info');
                // Redirect to completion page
                setTimeout(() => {
                    // Uncomment when ready to redirect
                    // window.location.href = '/booking/complete';
                    console.log('Would redirect to completion page');
                }, 1500);
            }, 1500);
        }, 1500);
    }
}

// Show notification - FIXED
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 14px 28px;
        border-radius: 12px;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        animation: slideDownNotif 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 90%;
        text-align: center;
    `;
    
    // Set background based on type
    if (type === 'success') {
        notification.style.background = '#06D23F';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#E75B5B';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#14213D';
        notification.style.color = 'white';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOutNotif 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add animation styles - FIXED
if (!document.getElementById('return-animations')) {
    const style = document.createElement('style');
    style.id = 'return-animations';
    style.textContent = `
        @keyframes slideDownNotif {
            from {
                opacity: 0;
                transform: translate(-50%, -30px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes fadeOutNotif {
            to {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
        }
    `;
    document.head.appendChild(style);
}