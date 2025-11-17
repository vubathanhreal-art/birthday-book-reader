// This file handles the logic for displaying individual pages, including loading content from the JSON file and updating the view based on user interactions.

// Try legacy selector first, then fall back to the #page-view element used in the HTML
const pageContainer = document.querySelector('.page-container') || document.getElementById('page-view');
let currentPageIndex = 0;
let pagesData = [];

// Function to load pages data from JSON
async function loadPages() {
    // Use absolute path from root to avoid issues with custom domains
    const basePath = window.location.pathname.includes('/birthday-book-reader/') 
        ? '/birthday-book-reader/' 
        : '/';
    const jsonPath = basePath + 'src/data/pages.json';
    
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Accept either an array or an object with a `pages` array
        pagesData = Array.isArray(data) ? data : (data.pages || []);
        // Ensure the container has the expected inner wrapper used by the CSS (.pages)
        if (pageContainer && !pageContainer.querySelector('.pages')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'pages';
            pageContainer.appendChild(wrapper);
        }

        renderPage(currentPageIndex);
    } catch (error) {
        console.error('Error loading pages:', error);
        pageContainer.innerHTML = '<p style="color: red;">Error loading content. Check console.</p>';
    }
}

// Function to render the current page
function renderPage(index) {
    const page = pagesData[index];
    if (page) {
        // Put left/right pages inside the .pages wrapper so CSS covers look correct
        const wrapper = pageContainer.querySelector('.pages') || pageContainer;
        wrapper.innerHTML = '';

        const left = document.createElement('div');
        left.className = 'left-page';
        
        // Only show image if not the final page (page 8)
        if (index !== pagesData.length - 1) {
            const img = document.createElement('img');
            img.className = 'page-image';
            
            // Handle image path - convert relative to absolute if needed
            let imageSrc = page.image || '';
            if (imageSrc && !imageSrc.startsWith('http') && !imageSrc.startsWith('/')) {
                // Relative path - prepend base path
                const basePath = window.location.pathname.includes('/birthday-book-reader/') 
                    ? '/birthday-book-reader/' 
                    : '/';
                imageSrc = basePath + imageSrc;
            }
            
            img.src = imageSrc;
            img.alt = page.title || 'Page image';
            img.onerror = () => {
                console.warn('Failed to load image:', imageSrc);
                img.style.display = 'none';
            };
            left.appendChild(img);
        }

        const right = document.createElement('div');
        right.className = 'right-page';
        const h1 = document.createElement('h1');
        h1.textContent = page.title || '';
        const pdiv = document.createElement('div');
        pdiv.className = 'page-text';
        
        // Allow safe HTML tags: <strong>, <em>, <span> with class="highlight"
        // Use innerHTML with sanitization to support formatting
        const text = page.text || '';
        pdiv.innerHTML = sanitizeHTML(text);

        right.appendChild(h1);
        right.appendChild(pdiv);

        wrapper.appendChild(left);
        wrapper.appendChild(right);
    }
}

// Simple sanitizer: allow only whitelisted tags and attributes
function sanitizeHTML(html) {
    const parser = new DOMParser();
    
    // Wrap in div to ensure valid HTML, then parse
    const wrapped = `<div>${html}</div>`;
    try {
        const doc = parser.parseFromString(wrapped, 'text/html');
        
        // Walk through all nodes and keep only whitelisted elements
        const walker = document.createTreeWalker(
            doc.body,
            NodeFilter.SHOW_ELEMENT,
            null,
            false
        );
        
        const nodesToRemove = [];
        let node;
        while (node = walker.nextNode()) {
            const tag = node.nodeName.toLowerCase();
            const isValid = 
                (tag === 'strong' && node.className === 'highlight') ||
                (tag === 'em') ||
                (tag === 'span' && node.className === 'highlight') ||
                (tag === 'div' && node.className === 'final-page') ||
                (tag === 'div') ||
                (tag === 'p' && (node.className === 'caption' || node.className === '')) ||
                (tag === 'a' && node.className === 'fb-button' && node.href && node.target);
            
            if (!isValid) {
                // Replace element with its children (unwrap)
                while (node.firstChild) {
                    node.parentNode.insertBefore(node.firstChild, node);
                }
                nodesToRemove.push(node);
            }
        }
        nodesToRemove.forEach(n => n.remove());
        
        // Return the inner HTML
        return doc.body.innerHTML;
    } catch (e) {
        // If parsing fails, return escaped text
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
}

// Function to navigate to the next page
function nextPage() {
    if (currentPageIndex < pagesData.length - 1) {
        currentPageIndex++;
        renderPage(currentPageIndex);
    }
}

// Function to navigate to the previous page
function previousPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        renderPage(currentPageIndex);
    }
}

// Event listeners for navigation
// Bind navigation buttons. Support both id-based and legacy class-based buttons.
const nextBtn = document.getElementById('next-page') || document.querySelector('.next-button');
const prevBtn = document.getElementById('prev-page') || document.querySelector('.prev-button');
if (nextBtn) nextBtn.addEventListener('click', nextPage);
if (prevBtn) prevBtn.addEventListener('click', previousPage);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Current URL:', window.location.href);
    console.log('Pathname:', window.location.pathname);
    loadPages();
});