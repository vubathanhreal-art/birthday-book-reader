// This file implements swipe functionality for touch devices, allowing users to navigate between pages by swiping left or right.

let startX;
let endX;
const threshold = 50; // Minimum distance to consider a swipe

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX;
}

function handleTouchEnd() {
    if (startX - endX > threshold) {
        // Swipe left
        navigateToNextPage();
    } else if (endX - startX > threshold) {
        // Swipe right
        navigateToPreviousPage();
    }
}

function navigateToNextPage() {
    // Logic to navigate to the next page
    console.log("Navigating to the next page");
}

function navigateToPreviousPage() {
    // Logic to navigate to the previous page
    console.log("Navigating to the previous page");
}

document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);