var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas.width, canvas.height);

var c = canvas.getContext('2d');
var winner = false;
var winColor = 'white';

var mouseClick = {
    x: undefined,
    y: undefined
}

window.addEventListener('click', function(event) {
    mouseClick.x = event.pageX;
    mouseClick.y = event.pageY;
})

function Block(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = 'gray';


    this.draw = function() {
        c.fillStyle = this.color;
        c.fillRect(x, y, width, height);
    }

    this.clicked = function() {
        var checkX = mouseClick.x - x;
        var checkY = mouseClick.y - y;

        if (checkX > 0 && checkX <= width && checkY > 0 && checkY <= height) {
            mouseClick.x = -1;
            mouseClick.y = -1;
            return true;
        }
    }
}

var rectangles = [];

for (var i = 0; i <= 2; i++) {
    var x = canvas.width/2.5;
    var xIncrement = 100;
    var y = canvas.height/2;
    var width = 50;
    var height = 50;

    if (i == 1) {
        y -= 100;
    }
    if (i == 2) {
        y -= 200; 
    }
    rectangles.push([new Block(x, y, width, height),new Block(x + 100, y, width, height),new Block(x + 200, y, width, height)]);
}

var previous = 'blue';
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < rectangles.length; i++) {
        for (var j = 0; j < rectangles[i].length; j++) {
            if (rectangles[i][j].clicked() == true && rectangles[i][j].color == 'gray') {
                if (previous == 'blue') {
                    previous = 'red';
                }
                else {
                    previous = 'blue';
                }
                rectangles[i][j].color = previous;
            }
            rectangles[i][j].draw()
        }
    }

    var row1 = rectangles[2][0].color + rectangles[2][1].color + rectangles[2][2].color;
    var row2 = rectangles[1][0].color + rectangles[1][1].color + rectangles[1][2].color;
    var row3 = rectangles[0][0].color + rectangles[0][1].color + rectangles[0][2].color;

    var col1 = rectangles[0][2].color + rectangles[1][2].color + rectangles[2][2].color;
    var col2 = rectangles[0][1].color + rectangles[1][1].color + rectangles[2][1].color;
    var col3 = rectangles[0][0].color + rectangles[1][0].color + rectangles[2][0].color;
	console.log(col2);

    var diag1 = rectangles[2][0].color + rectangles[1][1].color + rectangles[0][2].color;
    var diag2 = rectangles[0][0].color + rectangles[1][1].color + rectangles[2][2].color;

    checkAll = [row1, row2, row3, col1, col2, col3, diag1, diag2]

    if (checkAll.includes('redredred') && !winner) {
        winColor = 'red';
        winner = true;
    }
    if (checkAll.includes('blueblueblue') && !winner) {
        winColor = 'blue';
        winner == true;
    }

    c.fillStyle = winColor;
    c.fillRect(canvas.width/2.5 + 100, 600, 50, 50);

};

animate();