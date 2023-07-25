const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const eatSound = new Audio('../assets/eat.wav');
const gameOverSound = new Audio('../assets/gave-over-music.wav');
const size = 20;

const score = document.querySelector('.score > span');
const finalScore = document.querySelector('.score-final > span');
const gameOverMenu = document.querySelector('.menu-screen');
const btn = document.querySelector('.btn-play');


const up = document.querySelector('.cima');
const down = document.querySelector('.baixo');
const left = document.querySelector('.esquerda');
const right = document.querySelector('.direita');

const w = document.querySelector('.w');
const a = document.querySelector('.a');
const s = document.querySelector('.s');
const d = document.querySelector('.d');


let snake = [{x:200, y:200},];

let direction, loopId

const incrementScore = () => {
    score.innerText = +score.innerText+ 10
}


const randomNumber= (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}
const randomPosition= () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / size) * size;
}
const colors = [
    "#fb6900",
    "#f63700",
    "#007e80",
    "#00b9bd",
    "#90ff17",
    "#00c16c",
    "#ff1f4c",
    "#daf204",
    "#40ffdc",
    "#e80560",
]
const randomColors = (min, max) =>{
    return Math.round(Math.random() * (max - min) + min);

}

let food = {
    x:randomPosition(),
    y:randomPosition(),
    color:colors[randomColors(0, colors.length - 1)]
}

const drawFood = () => {
    const {x, y , color} = food
    ctx.fillStyle = color
    ctx.shadowColor = color
    ctx.shadowBlur = 10
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0
}


const drawSnake = () => {
    ctx.fillStyle = '#e9e9e9';
   
    snake.forEach((position, index) => {

        if(index == snake.length - 1){
            ctx.fillStyle = food.color;
        }

        ctx.fillRect(position.x, position.y, size, size)
    });
}

const moveSnake = () =>  {
    if(!direction) return
    const head = snake[snake.length - 1];

    if(direction == 'right'){
        snake.push({x:head.x + size, y:head.y})
    }
    if(direction == 'left' ) {
        snake.push({x:head.x - size, y:head.y})
    }
    if(direction == 'down' ) {
        snake.push({x:head.x, y:head.y + size})
    }
    if(direction == 'up' ) {
        snake.push({x:head.x, y:head.y - size})
    }

    snake.shift();

}

const drawGrid = () => {
    ctx.lineWidth = .1 
    ctx.strokeStyle = '#ddd'

    for(let i = 20; i < canvas.width; i+= 20){
        ctx.beginPath();
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke();


        ctx.beginPath();
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke();

    }

}

const checkEat = () => {
    const head = snake[snake.length - 1];

    if(head.x == food.x && head.y == food.y){
        incrementScore();
        snake.push(head);
        eatSound.play();
        

        let x = randomPosition();
        let y = randomPosition();

        while (snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x;
        food.y = y;
        food.color = colors[randomColors(0, colors.length - 1)];
       

    }
}


const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;

    const wallCollision =
        head.x < 0 || head.y < 0 || head.x > canvasLimit|| head.y > canvasLimit;

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if(wallCollision || selfCollision) {
        gameOver();
        gameOverSound.play();
        
    }else {
        gameOverSound.pause();
    }

}



const gameOver = () => {
    direction = undefined
    gameOverMenu.style.display = "flex"
    canvas.style.filter = "blur(50px)";
    finalScore.innerText = score.innerText;
}

const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, 600, 600);

    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();

    loopId = setTimeout(() => {
        gameLoop();
    },80)
}

gameLoop();

document.addEventListener('keydown', (e) => {

  

    if(e.key == 'ArrowRight' && direction !== "left" || e.key == 'd' && direction !== "left"){
        direction = "right";
        right.style.backgroundColor = `#e9e9e9`
        left.style.backgroundColor = 'transparent'
        up.style.backgroundColor = 'transparent'
        down.style.backgroundColor = 'transparent'

        d.style.backgroundColor = `#e9e9e9`
        a.style.backgroundColor = 'transparent'
        w.style.backgroundColor = 'transparent'
        s.style.backgroundColor = 'transparent'
    }

    if(e.key == 'ArrowUp'  && direction !== "down"|| e.key == 'w' && direction !== "down"){
        direction = "up";
        right.style.backgroundColor = 'transparent'
        left.style.backgroundColor = 'transparent'
        up.style.backgroundColor = `#e9e9e9`
        down.style.backgroundColor = 'transparent'

        d.style.backgroundColor = 'transparent'
        a.style.backgroundColor = 'transparent'
        w.style.backgroundColor = `#e9e9e9`
        s.style.backgroundColor = 'transparent'
    }

    if(e.key == 'ArrowLeft'  && direction !== "right"|| e.key == 'a' && direction !== "right"){
        direction = "left";
        right.style.backgroundColor = 'transparent'
        left.style.backgroundColor = `#e9e9e9`
        up.style.backgroundColor = 'transparent'
        down.style.backgroundColor = 'transparent'

        d.style.backgroundColor = 'transparent'
        a.style.backgroundColor = `#e9e9e9`
        w.style.backgroundColor = 'transparent'
        s.style.backgroundColor = 'transparent'
    }

    if(e.key == 'ArrowDown' && direction !== "up" || e.key == 's' && direction !== "up"   ){
        direction = "down";
        right.style.backgroundColor = 'transparent'
        left.style.backgroundColor = 'transparent'
        up.style.backgroundColor = 'transparent'
        down.style.backgroundColor = `#e9e9e9`

        d.style.backgroundColor = 'transparent'
        a.style.backgroundColor = 'transparent'
        w.style.backgroundColor = 'transparent'
        s.style.backgroundColor = `#e9e9e9`

    }

})


btn.addEventListener('click', () => {

    score.innerText = "00"
    canvas.style.filter = "none"
    gameOverMenu.style.display = "none"

    snake = [{x:200, y:200}]
})
