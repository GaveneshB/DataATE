// Car data from Figma design
const carsData = [
    {
        id: 1,
        name: "Perodua Axia 2014",
        image: "image/car-axia-2014.png",
        available: true
    },
    {
        id: 2,
        name: "Perodua Axia 2015",
        image: "image/car-axia-2015.png",
        available: true
    },
    {
        id: 3,
        name: "Perodua Axia 2016",
        image: "image/car-axia-2016.png",
        available: true
    },
    {
        id: 4,
        name: "Perodua Axia 2018",
        image: "image/car-axia-2018.png",
        available: true
    },
    {
        id: 5,
        name: "Perodua Axia 2024",
        image: "image/car-axia-2024-1.png",
        available: true
    },
    {
        id: 6,
        name: "Perodua Axia 2024",
        image: "image/car-axia-2024-2.png",
        available: true
    },
    {
        id: 7,
        name: "Perodua Myvi 2013",
        image: "image/car-myvi-2013.png",
        available: true
    },
    {
        id: 8,
        name: "Perodua Myvi 2016",
        image: "image/car-myvi-2016.png",
        available: true
    },
    {
        id: 9,
        name: "Perodua Bezza 2013",
        image: "image/car-bezza-2013.png",
        available: true
    },
    {
        id: 10,
        name: "Perodua Bezza 2023",
        image: "image/car-bezza-2023-1.png",
        available: true
    },
    {
        id: 11,
        name: "Perodua Bezza 2023",
        image: "image/car-bezza-2023-2.png",
        available: false
    },
    {
        id: 12,
        name: "Honda Dash 125",
        image: "image/car-dash-125.png",
        available: true
    },
    {
        id: 13,
        name: "Honda Beat 110",
        image: "image/car-beat-110.png",
        available: false
    }
];

// DOM Elements
const carsGrid = document.getElementById('carsGrid');

// Render car cards
function renderCars() {
    carsGrid.innerHTML = carsData.map(car => createCarCard(car)).join('');
}

// Create individual car card HTML
function createCarCard(car) {
    const availableButtons = `
        <button class="btn btn-rent" onclick="handleRent(${car.id})">Rent</button>
        <button class="btn btn-details" onclick="handleDetails(${car.id})">Details</button>
    `;
    
    const unavailableButton = `
        <button class="btn btn-unavailable" disabled>Not Available</button>
    `;
    
    return `
        <div class="car-card ${!car.available ? 'unavailable' : ''}">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}" loading="lazy">
            </div>
            <div class="car-info">
                <h3 class="car-name">${car.name}</h3>
                <div class="car-actions">
                    ${car.available ? availableButtons : unavailableButton}
                </div>
            </div>
        </div>
    `;
}

// Handle Rent button click
function handleRent(carId) {
    const car = carsData.find(c => c.id === carId);

    if (!car) return;

    // Redirect ONLY for Perodua Bezza 2023
    if (car.name === "Perodua Bezza 2023") {
        window.location.href = "/booking/calendar";
        return;
    }

    // Default behavior for other cars
    alert(`Renting: ${car.name}\n\nPlease login to continue with the rental process.`);
}


// Handle Details button click
function handleDetails(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        alert(`${car.name}\n\nDetailed specifications and availability will be shown here.\n\nFeatures:\n• Air Conditioning\n• Bluetooth Audio\n• GPS Navigation\n• Fuel Efficient`);
    }
}

// Scroll to car models section
function scrollToCarModels() {
    const carModelsSection = document.getElementById('car-rental');
    carModelsSection.scrollIntoView({ behavior: 'smooth' });
}

// Hero carousel functionality
let currentSlide = 0;
const totalSlides = 4;
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateDots();
    // In a full implementation, this would update the hero car image
}

// Event listeners for carousel
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Auto-play carousel
setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCars();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

