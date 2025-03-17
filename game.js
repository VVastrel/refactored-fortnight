// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ensure canvas exists
if (!canvas) {
    alert("Error: gameCanvas not found in HTML!");
}

canvas.width = 400;
canvas.height = 400;

const TILE_SIZE = 40;
const ROWS = canvas.height / TILE_SIZE;
const COLS = canvas.width / TILE_SIZE;

const WALL = 1;
const FLOOR = 0;

// Player object
let player = { 
    x: 1, y: 1, 
    hp: 5, maxHp: 5, 
    damage: 1, 
    level: 1, 
    xp: 0, 
    xpToNextLevel: 5, 
    dungeonLevel: 1 
};

// Enemy list
let enemies = [];
let stairs = { x: 0, y: 0 }; // Stairs position
let dungeon = [];

// Generate a random dungeon
function generateDungeon() {
    let dungeon = Array.from({ length: ROWS }, () => Array(COLS).fill(WALL));

    const roomCount = 5 + Math.floor(Math.random() * 5);
    let rooms = [];

    for (let i = 0; i < roomCount; i++) {
        let width = 3 + Math.floor(Math.random() * 4);
        let height = 3 + Math.floor(Math.random() * 4);
        let x = Math.floor(Math.random() * (COLS - width - 1)) + 1;
        let y = Math.floor(Math.random() * (ROWS - height - 1)) + 1;

        rooms.push({ x, y, width, height });

        for (let row = y; row < y + height; row++) {
            for (let col = x; col < x + width; col++) {
                dungeon[row][col] = FLOOR;
            }
        }
    }

    if (rooms.length === 0) {
        alert("Error: Dungeon generation failed!");
        return;
    }

    // Place player in the first room
    player.x = rooms[0].x + 1;
    player.y = rooms[0].y + 1;

    // Place stairs in the last room
    stairs.x = rooms[rooms.length - 1].x + 1;
    stairs.y = rooms[rooms.length - 1].y + 1;

    // Spawn enemies
    spawnEnemies(rooms);

    return dungeon;
}

// Spawn enemies with increasing difficulty
function spawnEnemies(rooms) {
    let enemyCount = Math.floor(Math.random() * 4) + 2;
    enemies = [];

    for (let i = 0; i < enemyCount; i++) {
        let room = rooms[Math.floor(Math.random() * rooms.length)];
        let enemyX = room.x + Math.floor(Math.random() * room.width);
        let enemyY = room.y + Math.floor(Math.random() * room.height);

        if (!(enemyX === player.x && enemyY === player.y) && !(enemyX === stairs.x && enemyY === stairs.y)) {
            enemies.push({ 
                x: enemyX, 
                y: enemyY, 
                hp: 3 + player.dungeonLevel, // Stronger enemies
                damage: 1 + Math.floor(player.dungeonLevel / 2), 
                xpValue: 2 + player.dungeonLevel // More XP per level
            });
        }
    }
}

// Draw the dungeon
function drawDungeon() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            ctx.fillStyle = dungeon[row][col] === WALL ? "gray" : "black";
            ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x * TILE_SIZE, player.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

// Draw enemies
function drawEnemies() {
    ctx.fillStyle = "green";
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x * TILE_SIZE, enemy.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
}

// Draw stairs
function drawStairs() {
    ctx.fillStyle = "white";
    ctx.fillRect(stairs.x * TILE_SIZE, stairs.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

// Draw UI
function drawUI() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(`HP: ${player.hp}/${player.maxHp}`, 10, 20);
    ctx.fillText(`Level: ${player.level}`, 10, 40);
    ctx.fillText(`XP: ${player.xp}/${player.xpToNextLevel}`, 10, 60);
    ctx.fillText(`Dungeon Level: ${player.dungeonLevel}`, 10, 80);
}

// Move player, check combat, and stairs
function movePlayer(dx, dy) {
    let newX = player.x + dx;
    let newY = player.y + dy;

    // Check if player reaches stairs
    if (newX === stairs.x && newY === stairs.y) {
        nextLevel();
        return;
    }

    // Check for enemies
    let enemyIndex = enemies.findIndex(e => e.x === newX && e.y === newY);
    if (enemyIndex !== -1) {
        enemies[enemyIndex].hp -= player.damage;

        if (enemies[enemyIndex].hp <= 0) {
            player.xp += enemies[enemyIndex].xpValue;
            enemies.splice(enemyIndex, 1);
            checkLevelUp();
        }

        render();
        return;
    }

    // Prevent walking through walls
    if (dungeon[newY][newX] === FLOOR) {
        player.x = newX;
        player.y = newY;
    }

    moveEnemies();
    render();
}

// Move to next level
function nextLevel() {
    player.dungeonLevel++;
    dungeon = generateDungeon();
    render();
}

// Check if player levels up
function checkLevelUp() {
    if (player.xp >= player.xpToNextLevel) {
        player.level++;
        player.xp -= player.xpToNextLevel;
        player.xpToNextLevel += 5;
        player.maxHp += 2;
        player.hp = player.maxHp;
        player.damage += 1;
    }
}

// Move enemies
function moveEnemies() {
    enemies.forEach(enemy => {
        let dx = player.x - enemy.x;
        let dy = player.y - enemy.y;

        let moveX = Math.abs(dx) > Math.abs(dy) ? Math.sign(dx) : 0;
        let moveY = moveX === 0 ? Math.sign(dy) : 0;

        if (enemy.x + moveX === player.x && enemy.y + moveY === player.y) {
            player.hp -= enemy.damage;
            if (player.hp <= 0) {
                alert("Game Over! You died.");
                window.location.reload();
            }
            return;
        }

        if (dungeon[enemy.y + moveY][enemy.x + moveX] === FLOOR) {
            enemy.x += moveX;
            enemy.y += moveY;
        }
    });
}

// Initialize game
dungeon = generateDungeon();
if (!dungeon) alert("Dungeon failed to generate!");
render();


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen
    drawDungeon();
    drawPlayer();
    drawEnemies();
    drawStairs();
    drawUI();
}


document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            movePlayer(0, -1);
            break;
        case "ArrowDown":
        case "s":
            movePlayer(0, 1);
            break;
        case "ArrowLeft":
        case "a":
            movePlayer(-1, 0);
            break;
        case "ArrowRight":
        case "d":
            movePlayer(1, 0);
            break;
    }
});
