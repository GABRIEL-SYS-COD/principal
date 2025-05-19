document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            // Solo prevenir el comportamiento por defecto para enlaces internos
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // Animación de barras de habilidades
    const skillLevels = document.querySelectorAll('.skill-level');
    // Guardar el valor real de width y ponerlas en 0 al inicio
    skillLevels.forEach(bar => {
        bar.dataset.targetWidth = bar.style.width;
        bar.style.width = '0';
    });
    
    function animateSkillBars() {
        skillLevels.forEach(bar => {
            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.4,0,0.2,1)';
                bar.style.width = bar.dataset.targetWidth;
            }, 400);
        });
    }
    
    // Detectar cuando la sección de skills es visible
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    animateSkillBars();
                    skillsAnimated = true;
                }
            });
        }, { threshold: 0.2 });
        skillsObserver.observe(skillsSection);
    }

    // Efecto de resplandor en botones y tarjetas
    const glowElements = document.querySelectorAll('.btn, .glass-card');
    glowElements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.boxShadow = `0 0 20px 5px var(--primary-color), 0 0 40px 10px var(--secondary-color)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.boxShadow = '';
        });
    });

    // Scroll suave para todos los anclajes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Solo aplicar desplazamiento suave a enlaces internos con ID existente
            if (href.startsWith('#') && href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Efecto partículas de fondo (simple, modo dios)
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-3';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeParticles);
    resizeParticles();
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7,
            color: Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)'
        });
    }
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }
    function updateParticles() {
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
    }
    function animateParticles() {
        drawParticles();
        updateParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Botón flotante ir arriba
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll-indicator: desplaza a la siguiente sección
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.getElementById('about');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        scrollIndicator.style.cursor = 'pointer';
    }

    // Swipe functionality for projects grid
    const projectsGrid = document.querySelector('.projects-grid');

    let isDown = false;
    let startX;
    let scrollLeft;

    projectsGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        projectsGrid.classList.add('active');
        startX = e.pageX - projectsGrid.offsetLeft;
        scrollLeft = projectsGrid.scrollLeft;
    });

    projectsGrid.addEventListener('mouseleave', () => {
        isDown = false;
        projectsGrid.classList.remove('active');
    });

    projectsGrid.addEventListener('mouseup', () => {
        isDown = false;
        projectsGrid.classList.remove('active');
    });

    projectsGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        // Solo prevenir el comportamiento por defecto si no es un enlace
        if (!e.target.closest('a')) {
            e.preventDefault();
            const x = e.pageX - projectsGrid.offsetLeft;
            const walk = (x - startX) * 3; // Ajusta la velocidad de desplazamiento
            projectsGrid.scrollLeft = scrollLeft - walk;
        }
    });

    // Swipe functionality for projects grid using mouse wheel
    projectsGrid.addEventListener('wheel', (e) => {
        e.preventDefault();
        projectsGrid.scrollLeft += e.deltaY; // Desplaza horizontalmente según el movimiento de la rueda
    });

    // Infinite auto-scroll functionality for projects grid
    let scrollInterval;
    const scrollSpeed = 2; // Ajusta la velocidad de desplazamiento

    projectsGrid.addEventListener('mousemove', (e) => {
        const rect = projectsGrid.getBoundingClientRect();

        clearInterval(scrollInterval);

        if (e.clientX < rect.left + 50) {
            // Cursor cerca del borde izquierdo
            scrollInterval = setInterval(() => {
                projectsGrid.scrollLeft -= scrollSpeed;
                if (projectsGrid.scrollLeft <= 0) {
                    projectsGrid.scrollLeft = projectsGrid.scrollWidth;
                }
            }, 10);
        } else if (e.clientX > rect.right - 50) {
            // Cursor cerca del borde derecho
            scrollInterval = setInterval(() => {
                projectsGrid.scrollLeft += scrollSpeed;
                if (projectsGrid.scrollLeft + projectsGrid.clientWidth >= projectsGrid.scrollWidth) {
                    projectsGrid.scrollLeft = 0;
                }
            }, 10);
        }
    });

    projectsGrid.addEventListener('mouseleave', () => {
        clearInterval(scrollInterval);
    });

    projectsGrid.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
    });
});
