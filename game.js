const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 75;
const paddleWidth = 10;
const ballRadius = 10;
let upPressed = false;
let downPressed = false;

const paddle1 = {
    x: 0,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 5
};

const paddle2 = {
    x: canvas.width - paddleWidth,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 5
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    dx: 4,
    dy: 4
};

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

function movePaddles() {
    if (upPressed && paddle2.y > 0) {
        paddle2.y -= paddle2.dy;
    }
    if (downPressed && paddle2.y < canvas.height - paddle2.height) {
        paddle2.y += paddle2.dy;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }

    if (ball.x + ball.dx < ball.radius + paddle1.width) {
        if (ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
            ball.dx = -ball.dx;
        } else {
            resetBall();
        }
    } else if (ball.x + ball.dx > canvas.width - ball.radius - paddle2.width) {
        if (ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
            ball.dx = -ball.dx;
        } else {
            resetBall();
        }
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
}

function drawPaddle(paddle) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(paddle1);
    drawPaddle(paddle2);
    drawBall();

    movePaddles();
    moveBall();

    requestAnimationFrame(draw);
}

draw();
