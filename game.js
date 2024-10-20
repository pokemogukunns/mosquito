const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const mosquitoImages = [];
let currentFrame = 0;
const totalFrames = 10;
const frameRate = 100;

for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    img.src = `mosquito-${i}.png`; // 画像のパス
    mosquitoImages.push(img);
}

function update() {
    currentFrame = (currentFrame + 1) % totalFrames;
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mosquitoImages[currentFrame], 100, 100); // 蚊の位置（x=100, y=100）
}

function gameLoop() {
    update();
    render();
    setTimeout(gameLoop, frameRate);
}

gameLoop();
