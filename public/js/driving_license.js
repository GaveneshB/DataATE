// Driving License Upload JavaScript

let selectedFile = null;

// Go back
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/profile';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeUpload();
    initializeForm();
});

// Initialize upload functionality
function initializeUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('licenseInput');
    
    // File input change
    fileInput.addEventListener('change', function(e) {
        handleFileSelect(e.target.files[0]);
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });
}

// Trigger file input
function triggerFileInput() {
    document.getElementById('licenseInput').click();
}

// Handle file selection
function handleFileSelect(file) {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('Please select an image file', 'error');
        return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showNotification('File size must be less than 5MB', 'error');
        return;
    }
    
    selectedFile = file;
    
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewArea = document.getElementById('previewArea');
        const previewImage = document.getElementById('previewImage');
        const uploadArea = document.getElementById('uploadArea');
        
        previewImage.src = e.target.result;
        previewArea.style.display = 'block';
        uploadArea.style.display = 'none';
        
        // Enable submit button
        document.getElementById('submitBtn').disabled = false;
    };
    reader.readAsDataURL(file);
}

// Remove selected image
function removeImage() {
    selectedFile = null;
    
    const previewArea = document.getElementById('previewArea');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('licenseInput');
    
    previewArea.style.display = 'none';
    uploadArea.style.display = 'flex';
    fileInput.value = '';
    
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;
}

// Initialize form
function initializeForm() {
    const form = document.getElementById('licenseForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSubmit();
    });
}

// Handle form submission
function handleSubmit() {
    if (!selectedFile) {
        showNotification('Please select an image of your driving license', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Uploading...';
    submitBtn.disabled = true;
    
    // Create form data
    const formData = new FormData();
    formData.append('driving_license', selectedFile);
    formData.append('_token', document.querySelector('input[name="_token"]').value);
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, this would be an actual API call
        // fetch('/profile/driving-license', {
        //     method: 'POST',
        //     body: formData
        // })
        
        showNotification('Driving license uploaded successfully! It will be reviewed within 24 hours.', 'success');
        
        // Show status section
        const statusSection = document.getElementById('statusSection');
        statusSection.style.display = 'flex';
        
        // Update button
        submitBtn.textContent = 'Submitted';
        submitBtn.disabled = true;
        
        // Hide upload/preview area
        document.getElementById('previewArea').style.display = 'none';
        
        // Redirect after delay (optional)
        setTimeout(() => {
            window.location.href = '/profile';
        }, 3000);
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translate(-50%, -10px);
        }
    }
`;
document.head.appendChild(style);

