document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links and all buttons with href starting with '#'
    document.querySelectorAll('.header .nav-links a[href^="#"], .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return; // Ensure element exists

            const headerOffset = document.querySelector('.header').offsetHeight; 
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset - 20; // Added 20px buffer for better top alignment

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Close mobile nav if open
            const nav = document.querySelector('.nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false'); // Update ARIA
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav'); 

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active'); 
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile nav when clicking outside (improved)
        document.addEventListener('click', (event) => {
            if (window.innerWidth <= 992 && nav.classList.contains('active')) {
                const isClickInsideNav = nav.contains(event.target);
                const isClickOnToggle = menuToggle.contains(event.target);

                if (!isClickInsideNav && !isClickOnToggle) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Toggle active class on the question
            question.classList.toggle('active');
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', !isExpanded);

            // Toggle open class on the answer and adjust max-height for smooth transition
            answer.classList.toggle('open');

            if (answer.classList.contains('open')) {
                answer.style.maxHeight = answer.scrollHeight + 'px'; 
                answer.style.padding = '20px 30px'; 
            } else {
                answer.style.maxHeight = null; 
                answer.style.padding = '0 30px'; 
            }
        });
    });

    // Tabs functionality for Beneficios and Funcionalidades
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    pane.setAttribute('aria-hidden', 'true');
                });

                // Add active class to the clicked button
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                // Show the corresponding tab pane
                const targetTabId = button.dataset.tab + '-pane'; 
                const targetPane = document.getElementById(targetTabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                    targetPane.setAttribute('aria-hidden', 'false');
                }
            });
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});