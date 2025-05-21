# Portfolio Personal

Este es un portfolio personal que muestra mis proyectos y habilidades como desarrollador web. El sitio está construido con HTML, CSS y JavaScript, y está containerizado con Docker para facilitar su despliegue.

## 🚀 Proyectos Incluidos

1. **Sobre Mí**
   - Presentación personal interactiva
   - Tecnologías: HTML, CSS, JavaScript

2. **Tienda Online**
   - Showcase de productos tecnológicos
   - Tecnologías: HTML, CSS, JavaScript

3. **Restaurante Sant Grial**
   - Sitio web para restaurante con diseño vintage
   - Tecnologías: HTML, CSS, JavaScript

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript
- Docker
- Nginx
- GitHub Actions

## 🏗️ Instalación y Despliegue

### Requisitos Previos
- Docker instalado
- Git instalado

### Ejecución Local
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/GABRIEL-SYS-COD/principal.git
   cd principal
   ```

2. Construir la imagen Docker:
   ```bash
   docker build -t syscod/portfolio:latest .
   ```

3. Ejecutar el contenedor:
   ```bash
   docker run -d -p 80:80 syscod/portfolio:latest
   ```

4. Visitar `http://localhost:80` en tu navegador

### Despliegue con Docker Hub
```bash
docker pull syscod/portfolio:latest
docker run -d -p 80:80 syscod/portfolio:latest
```

## 📁 Estructura del Proyecto

```
principal/
├── css/               # Estilos globales
├── js/                # Scripts globales
├── imagenes/          # Imágenes del proyecto
├── formulario/        # Formularios interactivos
├── restaurant/        # Proyecto restaurante
├── sobre-mi/         # Página personal
├── tienda-online/    # Tienda virtual
└── Dockerfile        # Configuración de Docker
```

## 🔄 CI/CD

El proyecto utiliza GitHub Actions para CI/CD:
- Build automático de la imagen Docker
- Push automático a Docker Hub
- Despliegue continuo

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 📧 Contacto

Gabriel - gerson.cod1001@gmail.com

Link del proyecto: [https://github.com/GABRIEL-SYS-COD/principal](https://github.com/GABRIEL-SYS-COD/principal)
