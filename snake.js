const gameBoard = document.querySelector('.game-board');
const scoreElement = document.querySelector('.score');
const gameStatus = document.querySelector('.game-status');

const boardSize = 20;
const cellSize = 20;
const boardWidth = boardSize * cellSize;
const boardHeight = boardSize * cellSize;

gameBoard.style.width = `${boardWidth}px`;
gameBoard.style.height = `${boardHeight}px`;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = generateFood();
let score = 0;

function generateFood() {
  return {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}

function drawSnake() {
  gameBoard.innerHTML = '';
  snake.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
}

function drawFood() {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

function moveSnake() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;

  if (head.x < 0) head.x = boardSize - 1;
  if (head.x >= boardSize) head.x = 0;
  if (head.y < 0) head.y = boardSize - 1;
  if (head.y >= boardSize) head.y = 0;

  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    gameStatus.textContent = '游戏状态: 游戏结束';
    clearInterval(gameInterval);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = `得分: ${score}`;
    food = generateFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  if (event.key === 'ArrowUp' && direction.y !== 1) {
    direction = { x: 0, y: -1 };
  } else if (event.key === 'ArrowDown' && direction.y !== -1) {
    direction = { x: 0, y: 1 };
  } else if (event.key === 'ArrowLeft' && direction.x !== 1) {
    direction = { x: -1, y: 0 };
  } else if (event.key === 'ArrowRight' && direction.x !== -1) {
    direction = { x: 1, y: 0 };
  }
}

document.addEventListener('keydown', changeDirection);

function gameLoop() {
  moveSnake();
  drawSnake();
  drawFood();
}

const gameInterval = setInterval(gameLoop, 200);
