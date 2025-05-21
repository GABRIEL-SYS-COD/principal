// Pruebas básicas de la interfaz de usuario
describe('Portfolio Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    require('../index.html');
  });

  test('Título de la página es correcto', () => {
    expect(document.title).toBe('Mi Portafolio | Desarrollador Full Stack');
  });

  test('Navegación contiene los enlaces correctos', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const expectedLinks = ['Inicio', 'Sobre Mí', 'Tecnologías', 'Educación', 'Proyectos', 'Contacto'];
    
    expect(navLinks.length).toBe(expectedLinks.length);
    navLinks.forEach((link, index) => {
      expect(link.textContent).toBe(expectedLinks[index]);
    });
  });

  test('Sección de habilidades muestra porcentajes correctos', () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
      const width = parseInt(level.style.width);
      expect(width).toBeGreaterThanOrEqual(0);
      expect(width).toBeLessThanOrEqual(100);
    });
  });
});

// Pruebas del formulario de contacto
describe('Contact Form Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    require('../index.html');
  });

  test('Formulario de contacto existe', () => {
    const form = document.getElementById('contactForm');
    expect(form).toBeTruthy();
  });

  test('Campos requeridos están presentes', () => {
    const form = document.getElementById('contactForm');
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    requiredFields.forEach(field => {
      const input = form.querySelector(`[name="${field}"]`);
      expect(input).toBeTruthy();
      expect(input.required).toBeTruthy();
    });
  });
});
