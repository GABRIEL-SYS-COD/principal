const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff9d';
    ctx.font = fontSize + 'px monospace';

    rainDrops.forEach((y, index) => {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = index * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[index] = 0;
        }
        rainDrops[index]++;
    });
}

setInterval(draw, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    rainDrops.length = Math.floor(canvas.width / fontSize);
    rainDrops.fill(1);
});