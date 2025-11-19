// ====================================================================
// OPTIMIZED JAVASCRIPT FOR ELZERO WORLD PORTFOLIO
// Improved Performance, Countdown Timer, and Animations
// ====================================================================

// Cache DOM elements for better performance
const skillSection = document.querySelector(".skill-box");
const skillSpans = document.querySelectorAll(".skill-box .skill-inner");
const statsSection = document.querySelector(".stats-awesome");
const statsNumbers = document.querySelectorAll(".number");
let animationStarted = false;

// Debounce function for performance optimization
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Main scroll handler for animations
function handleScroll() {
    const scrollY = window.scrollY;

    // Skills progress bar animation
    if (skillSection && scrollY >= skillSection.offsetTop - 300) {
        skillSpans.forEach((span) => {
            span.style.width = span.dataset.width;
        });
    }

    // Stats counter animation
    if (statsSection && scrollY >= statsSection.offsetTop - 300) {
        if (!animationStarted) {
            statsNumbers.forEach((number) => startCount(number));
            animationStarted = true;
        }
    }
}

// Counter animation function with smooth increment
function startCount(element) {
    const goal = parseInt(element.dataset.goal);
    const increment = goal / 100; // Smoother animation
    let current = 0;

    const counter = setInterval(() => {
        current += increment;
        if (current >= goal) {
            element.textContent = goal;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Countdown Timer Function
function initCountdown() {
    // Set your event date here (YEAR, MONTH-1, DAY, HOUR, MINUTE, SECOND)
    // Note: Month is 0-indexed (0 = January, 11 = December)
    const countDownDate = new Date("Dec 31, 2026 23:59:59").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownTimer);
            const daysEl = document.querySelector(".days");
            const hoursEl = document.querySelector(".hours");
            const minutesEl = document.querySelector(".minutes");
            const secondsEl = document.querySelector(".seconds");

            if (daysEl) daysEl.innerHTML = "00";
            if (hoursEl) hoursEl.innerHTML = "00";
            if (minutesEl) minutesEl.innerHTML = "00";
            if (secondsEl) secondsEl.innerHTML = "00";
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM with padded values
        const daysEl = document.querySelector(".days");
        const hoursEl = document.querySelector(".hours");
        const minutesEl = document.querySelector(".minutes");
        const secondsEl = document.querySelector(".seconds");

        if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerHTML = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerHTML = seconds.toString().padStart(2, '0');
    };

    // Initial call
    updateCountdown();

    // Update every second
    const countdownTimer = setInterval(updateCountdown, 1000);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown timer
    initCountdown();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Add optimized scroll event listener
    window.addEventListener('scroll', debounce(handleScroll, 10));

    console.log('✅ All scripts initialized successfully');
});

// Optional: Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
