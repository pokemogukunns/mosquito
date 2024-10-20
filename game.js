const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const mosquitoImages = [];
let currentFrame = 0;
const totalFrames = 10;
const frameRate = 100;

let imagesLoaded = 0; // 読み込まれた画像の数
const totalImages = totalFrames + 3; // 読み込む画像の合計数（スキンは3つ）

const skins = ["skin1.png", "skin2.png", "skin3.png"]; // スキンの配列
let currentSkin = 0; // 現在のスキンのインデックス

let mosquitoCount = 0; // 蚊の数
const maxMosquitoes = 10; // 最大蚊の数
const mosquitoes = []; // 蚊の位置を管理する配列

let blood = 0; // 血の量

function loadImages() {
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `mosquito-${i}.png`; // 蚊の画像
        img.onload = imageLoaded; // 読み込み完了時の処理
        mosquitoImages.push(img);
    }

    skins.forEach(skin => {
        const img = new Image();
        img.src = skin; // スキンの画像
        img.onload = imageLoaded; // 読み込み完了時の処理
    });
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        startGame(); // すべての画像が読み込まれたらゲーム開始
    }
}

function showLoadingScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Loading...', canvas.width / 2 - 70, canvas.height / 2);
}

function startGame() {
    gameLoop(); // ゲームループを開始
}

function calculateMosquitoes() {
    const randomValue = Math.floor(Math.random() * 4); // 0~3のランダムな値
    let result;

    switch (randomValue) {
        case 0:
            result = mosquitoCount + 1; // 蚊を1匹増やす
            break;
        case 1:
            result = mosquitoCount - 1; // 蚊を1匹減らす
            break;
        case 2:
            result = mosquitoCount * 2; // 蚊を倍にする
            break;
        case 3:
            result = Math.floor(mosquitoCount / 2); // 蚊を半分にする
            break;
    }

    mosquitoCount = Math.min(Math.max(result, 0), maxMosquitoes);
}

function calculateBlood() {
    blood = mosquitoCount * 2; // 蚊の数 × 2
}

function checkClear() {
    if (blood >= 200) {
        alert("クリア！血の量が200を超えました！");
    }
}

function updateMosquitoPositions() {
    mosquitoes.length = 0; // 配列をクリア
    for (let i = 0; i < mosquitoCount; i++) {
        mosquitoes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        });
    }
}

function buyMosquito() {
    if (blood >= 20) {
        blood -= 20;
        mosquitoCount += 1;
        updateMosquitoPositions();
    } else {
        alert("血が足りません！");
    }
}

function buySkin() {
    if (blood >= 50) {
        blood -= 50;
        currentSkin = (currentSkin + 1) % skins.length;
    } else {
        alert("血が足りません！");
    }
}

function update() {
    currentFrame = (currentFrame + 1) % totalFrames;
    calculateMosquitoes(); // 蚊の数を計算
    updateMosquitoPositions(); // 蚊の位置を更新
    calculateBlood(); // 血の量を計算
    checkClear(); // クリア判定をチェック
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 蚊を描画
    mosquitoes.forEach(mosquito => {
        const skinImage = new Image();
        skinImage.src = skins[currentSkin]; // 現在のスキンを選択
        ctx.drawImage(skinImage, mosquito.x, mosquito.y);
    });
}

function gameLoop() {
    update();
    render();
    setTimeout(gameLoop, frameRate);
}

// 初期化関数
function init() {
    loadImages(); // 画像の読み込みを開始
    showLoadingScreen(); // ローディング画面を表示
}

// ゲームの初期化
init();

