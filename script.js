const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Game variables
const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
let score = 0;

// Handle keyboard input
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Game loop
function gameLoop() {
    if (isGameOver()) {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
        return;
    }

    updateSnake();
    checkFoodCollision();
    drawGame();
}

function updateSnake() {
    const head = { ...snake[0] };

    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;

    snake.unshift(head);
    snake.pop();
}

function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        snake.push({}); // Add a new segment to the snake
        food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
    }
}

function isGameOver() {
    const head = snake[0];

    // Check wall collisions
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        return true;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "#0f0";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });

    // Draw food
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function getRandomCoordinate() {
    return Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
    score = 0;
}

// Start the game
setInterval(gameLoop, 100);
