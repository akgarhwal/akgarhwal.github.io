// Load components directly from strings
const headerContent = `
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wdth,wght@0,75..100,300..800;1,75..100,300..800&display=swap" rel="stylesheet">
</head>
<header>
    <nav class="container">
        <a href="index.html" class="logo">Abhinesh</a>
        <button class="nav-toggle" aria-label="toggle navigation" aria-expanded="false">
            <span class="hamburger"></span>
        </button>
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="experience.html">Experience</a></li>

            <li><button id="darkModeToggle">Dark Mode</button></li>
        </ul>
    </nav>
</header>
`;

const footerContent = `
<footer class="footer">
    <div class="container">
        <p>&copy; <span id="currentYear"></span> akgarhwal. All rights reserved.</p>
    </div>
</footer>
`;

// Load components when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Insert header
    const headerElement = document.getElementById('header');
    if (headerElement) {
        headerElement.innerHTML = headerContent;
    }

    // Insert footer
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        footerElement.innerHTML = footerContent;
    }

    // Initialize any navigation or UI elements after components are loaded
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('nav-links--visible');
        });
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Add below code to the header if you want to include more links in the navigation
            // <li><a href="projects.html">Projects</a></li>
            // <li><a href="talks.html">Talks</a></li>
            // <li><a href="bookshelf.html">Book Shelf</a></li>
            // <li><a href="papers.html">Paper Shelf</a></li>
            // <li><a href="blogs.html">Blogs</a></li>