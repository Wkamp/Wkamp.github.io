const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const SNAKE_SIZE = 20;

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Snake {
    constructor(pos, color, dir=0) {
        this.size = SNAKE_SIZE;
        this.body = [{x: pos.x, y: pos.y}];
        this.len = 0;
        this.xDir = dir;
        this.yDir = 0;
        this.color = color;
    }

    setDir(x, y) {
        this.xDir = x;
        this.yDir = y;
    }

    update(collisionMessage='snake') {
        var head = {x: this.body[this.body.length-1].x , y: this.body[this.body.length-1].y};

        head.x += this.xDir;
        head.y += this.yDir;
        this.body.push(head);

        if (this.collide()) {
            return collisionMessage;
        }
    }

    collide() {
        var head = {x: this.body[this.body.length-1].x , y: this.body[this.body.length-1].y};

        for (var i = 0; i < this.body.length-15; i++) {
            if (this.body[i].x + SNAKE_SIZE >= head.x &&
                this.body[i].x <= head.x + SNAKE_SIZE &&
                this.body[i].y + SNAKE_SIZE >= head.y &&
                this.body[i].y <= head.y + SNAKE_SIZE) {
                    //console.log('collide')
                    return true;
            }
        }

        if (head.x < 0 || head.x + SNAKE_SIZE > canvas.width
            || head.y < 0 || head.y + SNAKE_SIZE > canvas.height) {
            return true;
        }
    }

    draw(color = this.color) {
        for (var i = 0; i < this.body.length; i++) {
            c.beginPath();
            c.fillStyle = color;
            if (i >= this.body.length-2) {
                c.fillStyle = "white"
            } 
            else {
                c.fillStyle = color;
            }
            c.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);
            c.stroke();
        }

    }

}

var speed = 4.5
let snake1 = new Snake({x: 0, y: canvas.height/2}, 'blue', speed);
let snake2 = new Snake({x: canvas.width - SNAKE_SIZE, y: canvas.height/2}, 'red', -speed);

function reset() {
    snake1 = new Snake({x: 0, y: canvas.height/2}, 'blue', 4);
    snake2 = new Snake({x: canvas.width - SNAKE_SIZE, y: canvas.height/2}, 'red', -speed);
}

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case "ArrowLeft":
            snake2.setDir(-1 * speed, 0);
            break

        case "a":
            snake1.setDir(-1 * speed, 0);
            break;

        case "ArrowRight":
            snake2.setDir(1 * speed, 0);
            break;
        case "d":
            snake1.setDir(1 * speed, 0);
            break;

        case "ArrowDown":
            snake2.setDir(0, 1 * speed);
            break;

        case "s":
            snake1.setDir(0, 1 * speed);
            break;

        case "ArrowUp":
            snake2.setDir(0, -1 * speed);
            break;

        case "w":
            snake1.setDir(0, -1 * speed);
            break;
    }
})


function snakeCollision(snake1, snake2) {
    var head1 = {x: snake1.body[snake1.body.length-1].x , y: snake1.body[snake1.body.length-1].y};
    var head2 = {x: snake2.body[snake2.body.length-1].x , y: snake2.body[snake2.body.length-1].y};

    var snake1Collide = false;
    var snake2Collide = false;

    for (var i = 0; i < snake2.body.length; i++) {
        if (head1.x + SNAKE_SIZE >= snake2.body[i].x &&
            head1.x <= snake2.body[i].x + SNAKE_SIZE &&
            head1.y + SNAKE_SIZE >= snake2.body[i].y &&
            head1.y <= snake2.body[i].y + SNAKE_SIZE) {
                snake1Collide = true;
        }
    }

    for (var i = 0; i < snake1.body.length; i++) {
        if (head2.x + SNAKE_SIZE >= snake1.body[i].x &&
            head2.x <= snake1.body[i].x + SNAKE_SIZE &&
            head2.y + SNAKE_SIZE >= snake1.body[i].y &&
            head2.y <= snake1.body[i].y + SNAKE_SIZE) {
                snake2Collide = true;
        }
    }

    if (snake1Collide && snake2Collide) {
        return 'both'
    }
    if (snake1Collide) {
        return 'snake1'
    }
    if (snake2Collide) {
        return 'snake2'
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.rect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'black';
    c.fill();

    let collide;
    collide = snake1.update('snake1');

    if (collide == undefined) {
        collide = snake2.update('snake2');
    }

    if (collide == undefined) {
        collide = snakeCollision(snake1, snake2);
    }

    let lostColor = 'pink'
    switch (collide) {
        case 'both':
            snake1.draw(lostColor);
            snake2.draw(lostColor);
            break;

        case 'snake1':
            snake1.draw(lostColor);
            break;

        case 'snake2':
            snake2.draw(lostColor);
            break;

    }
    if (collide != undefined) {
        
        reset();
    }
    else {
        snake1.draw();
        snake2.draw();
    }

}

animate();