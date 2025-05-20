// Validación de formularios
document.addEventListener('DOMContentLoaded', function() {
    // Función para validar el formato del teléfono español
    function validarTelefono(input) {
        const regex = /^[69][0-9]{8}$/;
        const isValid = regex.test(input.value);
        input.setCustomValidity(isValid ? '' : 'Por favor, introduce un número de teléfono español válido');
    }

    // Validar teléfonos en tiempo real
    const telefonos = document.querySelectorAll('input[type="tel"]');
    telefonos.forEach(tel => {
        tel.addEventListener('input', () => validarTelefono(tel));
    });

    // Validación de contraseña
    const password = document.querySelector('input[type="password"]');
    if (password) {
        password.addEventListener('input', function() {
            const value = this.value;
            const hasUpperCase = /[A-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const isLongEnough = value.length >= 8;
            
            this.setCustomValidity(
                (!hasUpperCase && !hasNumber && !isLongEnough) ? 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número' :
                !hasUpperCase ? 'La contraseña debe tener al menos una mayúscula' :
                !hasNumber ? 'La contraseña debe tener al menos un número' :
                !isLongEnough ? 'La contraseña debe tener al menos 8 caracteres' :
                ''
            );
        });
    }

    // Función para mostrar mensajes de validación personalizados
    function showValidationMessage(input, message) {
        const small = input.nextElementSibling;
        if (small && small.tagName.toLowerCase() === 'small') {
            small.textContent = message;
            small.style.color = message ? '#e11d48' : '#64748b';
        }
    }

    // Validación de campos requeridos
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Mostrar mensajes de error personalizados
                form.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
                    if (!input.validity.valid) {
                        showValidationMessage(input, input.validationMessage);
                    }
                });
            }
        });
    });

    // Limpiar mensajes de error al modificar campos
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                showValidationMessage(this, '');
            }
        });
    });

    // Función para manejar el envío exitoso de formularios
    function handleFormSuccess(form) {
        alert('¡Formulario enviado con éxito!');
        form.reset();
    }

    // Asignar manejadores de éxito a todos los formularios
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (form.checkValidity()) {
                e.preventDefault();
                handleFormSuccess(this);
            }
        });
    });
});

// Navigation Functions
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            navLinks.scrollBy({ left: -200, behavior: 'smooth' });
        });
        
        scrollRightBtn.addEventListener('click', () => {
            navLinks.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }

    // Highlight current section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavItem() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const targetLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                navItems.forEach(item => item.style.background = '');
                if (targetLink) {
                    targetLink.style.background = 'rgba(0, 255, 255, 0.1)';
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
});

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initially hide the button
        backToTopButton.style.display = 'none';
    }
});
