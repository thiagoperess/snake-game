let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 24;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
// a comida aparece sempre de forma aleatória
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//definindo o canvas
function createBG() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
// criando a serpente
function createSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
// criando a comida da serpente
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// adicionando os comandos do jogo
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame(){

    // cria o 'loop' infito da serpente
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // cria o choque da serpente
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(jogo);
        alert("                    GAME OVER! ☹️ \nRecarregue a página e tente de novo! 🖖");
        }
    }

    createBG();
    createSnake();
    drawFood();

    // movimentos da serpente
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction  == "down") snakeY += box;

    //aumenta a serpente a cada acerto
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(startGame, 100);

