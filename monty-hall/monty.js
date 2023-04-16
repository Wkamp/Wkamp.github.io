const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 700;

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

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
});

class Rectangle {
    constructor(x, y, width=50, height=100, color='rgb(139,69,19)') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.treasure = false;
        this.clickedOn = false;
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


let doors;
let picked;
let switchYes;
let switchNo;
let hideDoor = -1;

let treasureLocation;
let gameOver;

var totalSwitchedGames = 0;
var totalSwitchWins = 0;

var totalStayGames = 0;
var totalStayWins = 0;


function init() {
    doors = [new Rectangle(0,0), new Rectangle(100,0), new Rectangle(200,0)];
    treasureLocation = randRange(0,3);
    doors[treasureLocation].treasure = true;
    switchYes = new Rectangle(0,200, 70, 40, '#333');
    switchNo = new Rectangle(100,200, 110, 40, '#333');
    hideDoor = -1;
    
    gameOver = false;
    picked = -1;
}

function stats() {
    c.beginPath();
    c.font = '20px Arial';
    c.fillStyle = 'rgba(0,0,0,1)'
    c.fillText('Stay Wins Percentage: ' + String(totalStayWins / totalStayGames * 100) + '%' ,0,300);
    c.fillText('Switch Wins Percentage: ' + String(totalSwitchWins / totalSwitchedGames * 100) + '%' ,0,350);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    stats();

    //c.beginPath();

    if (!gameOver) {
        for (var i = 0; i < doors.length; i++) {
            doors[i].draw();

            if (doors[i].clicked() && picked == -1) {
                doors[i].color = 'rgba(139,69,19, 0.8)';
                doors[i].clickedOn = true;
                picked = i;
            }
        }
}
    if (picked != -1 && !gameOver) {
        stats();
        //console.log(picked, treasureLocation);

        
        while (hideDoor == picked || hideDoor == treasureLocation || hideDoor == -1) {
            hideDoor = randRange(0,3);
        }
        doors[hideDoor].color = 'white';
        switchYes.draw();
        c.font = '20px Arial'
        c.fillStyle = 'white';
        c.fillText('Switch',switchYes.x, switchYes.y + switchYes.height / 2)

        switchNo.draw();
        c.font = '20px Arial'
        c.fillStyle = 'white';
        c.fillText("don't switch",switchNo.x, switchNo.y + switchNo.height / 2)

        if (switchYes.clicked()) {
            totalSwitchedGames++
            gameOver = true;
            if (picked != treasureLocation) {
                totalSwitchWins++
                
            }
        }

        if (switchNo.clicked()) {
            totalStayGames++;
            gameOver = true;
            if (picked == treasureLocation) {
                totalStayWins++;


            }
        }

    }

    if (gameOver) {
        init();
    }
}
init();
animate();