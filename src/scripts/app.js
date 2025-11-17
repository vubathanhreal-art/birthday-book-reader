// This file contains the main JavaScript code for the birthday book reader application.

document.addEventListener('DOMContentLoaded', () => {
    const book = new Book();
    const pageView = new PageView(book);
    
    // Initialize the first page
    pageView.renderPage(0);

    // Event listeners for navigation
    document.getElementById('next-button').addEventListener('click', () => {
        pageView.nextPage();
    });

    document.getElementById('prev-button').addEventListener('click', () => {
        pageView.prevPage();
    });

    // Swipe functionality for touch devices
    let startX;
    const swipeArea = document.getElementById('swipe-area');

    swipeArea.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    swipeArea.addEventListener('touchmove', (e) => {
        const moveX = e.touches[0].clientX;
        const diffX = startX - moveX;

        if (diffX > 50) {
            pageView.nextPage();
        } else if (diffX < -50) {
            pageView.prevPage();
        }
    });
});