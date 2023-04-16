const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 700;

var mouseClick = {
    x: undefined,
    y: undefined
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

canvas.addEventListener("click", function(e) { 
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
    mouseClick.x = canvasX;
    mouseClick.y = canvasY
    //c.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
    console.log("X: "+canvasX+", Y: "+canvasY);
});

class Rectangle {
    constructor(x, y, width=50, height=100) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgb(139,69,19)';

        this.treasure = false;
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height)

    }
    clicked() {
        var checkX = mouseClick.x - this.x;
        var checkY = mouseClick.y - this.y;

        if (checkX > 0 && checkX <= this.width && checkY > 0 && checkY <= this.height) {
            mouseClick.x = -1;
            mouseClick.y = -1;
            return true;
        }
    }
}


let door1;
let door2;
let door3;

let doors;
let picked;
function init() {
    // door1 = new Rectangle(0,0);
    // door2 = new Rectangle(100,0);
    // door3 = new Rectangle(200,0);

    doors = [new Rectangle(0,0), new Rectangle(100,0), new Rectangle(200,0)];

    picked = false;
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < doors.length; i++) {
        doors[i].draw();

        if (doors[i].clicked() && !picked) {
            doors[i].color = 'rgba(139,69,19, 0.8)';
            picked = true;
        }
    }
    if (picked) {

    }
}
init();
animate();