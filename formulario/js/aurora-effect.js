// Efecto Aurora
document.addEventListener('DOMContentLoaded', function() {
    const aurora = document.getElementById('aurora-bg');
    
    function createAuroraEffect() {
        // Colores para el efecto aurora
        const colors = [
            'rgba(26, 115, 232, 0.2)',
            'rgba(109, 213, 237, 0.2)',
            'rgba(41, 182, 246, 0.2)',
            'rgba(3, 169, 244, 0.2)',
            'rgba(0, 188, 212, 0.2)'
        ];
        
        // Crear gradientes aleatorios
        function generateGradient() {
            const angle = Math.floor(Math.random() * 360);
            const colorStops = colors
                .sort(() => Math.random() - 0.5)
                .map((color, index) => {
                    const percent = (index * 100) / (colors.length - 1);
                    return `${color} ${percent}%`;
                })
                .join(', ');
                
            return `linear-gradient(${angle}deg, ${colorStops})`;
        }
        
        // Actualizar el fondo con un nuevo gradiente
        function updateAurora() {
            const newGradient = generateGradient();
            aurora.style.background = newGradient;
        }
        
        // Iniciar el efecto
        updateAurora();
        setInterval(updateAurora, 3000);
    }
    
    // Iniciar el efecto aurora si existe el elemento
    if (aurora) {
        createAuroraEffect();
    }
});
