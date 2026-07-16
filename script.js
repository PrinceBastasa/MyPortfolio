document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. SCROLL PROGRESS & BACK TO TOP CONTROLLER
    // ==========================================================================
    window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressIndicator = document.getElementById("scroll-progress");
        if(progressIndicator) progressIndicator.style.width = scrolled + "%";
        
        const backToTop = document.getElementById("back-to-top");
        if(backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }
    });

    const backBtn = document.getElementById("back-to-top");
    if(backBtn) {
        backBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==========================================================================
    // 2. STICKY INTERACTIVE NAV & HAMBURGER SYSTEM
    // ==========================================================================
    const hamburger = document.getElementById("hamburger");
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-link");

    if(hamburger && navLinksContainer) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinksContainer.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinksContainer.classList.remove("active");
            });
        });
    }

    // Active link highlighting on scroll
    const sections = document.querySelectorAll("section, header");
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================================================
    // 3. TYPING RECREATIONAL ENGINE
    // ==========================================================================
    const typingText = document.getElementById("typing-text");
    if(typingText) {
        const roles = ["BS Information Systems Student", "Web Developer", "System Designer"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 45;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2200; // Pause at sentence end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }
            setTimeout(typeEffect, typingSpeed);
        }
        typeEffect();
    }

    // ==========================================================================
    // 4. THEME TOGGLE CONTROLLER
    // ==========================================================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    if(themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            document.body.classList.toggle("dark-mode");
            const icon = themeToggleBtn.querySelector("i");
            if(document.body.classList.contains("light-mode")) {
                icon.className = "fas fa-moon";
            } else {
                icon.className = "fas fa-sun";
            }
        });
    }

    // ==========================================================================
    // 5. INTERSECTION OBSERVER FOR FADE-IN SCROLLING
    // ==========================================================================
    const animatedElements = document.querySelectorAll(".fade-in-element");
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appeared");
            }
        });
    }, { threshold: 0.12 });

    animatedElements.forEach(el => elementObserver.observe(el));

    // ==========================================================================
    // 6. CANVAS FLOATING BACKGROUND PARTICLES
    // ==========================================================================
    const canvas = document.getElementById("particle-canvas");
    if(canvas) {
        const ctx = canvas.getContext("2d");
        let particlesArray = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.6;
                this.speedX = Math.random() * 0.35 - 0.175;
                this.speedY = Math.random() * 0.35 - 0.175;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                const colorMode = document.body.classList.contains("light-mode") 
                    ? "rgba(2, 132, 199, 0.12)" 
                    : "rgba(56, 189, 248, 0.15)";
                ctx.fillStyle = colorMode;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            const count = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < count; i++) {
                particlesArray.push(new Particle());
            }
        }
        initParticles();
        window.addEventListener("resize", initParticles);

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ==========================================================================
    // 7. FORM SUBMIT HANDLER
    // ==========================================================================
    const formElement = document.getElementById("contact-form");
    if(formElement) {
        formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("form-name").value;
            const subject = document.getElementById("form-subject").value;
            
            alert(`Thanks ${name}! Your query regarding "${subject}" has been successfully parsed.`);
            formElement.reset();
        });
    }
});