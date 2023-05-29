var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


class Graph {
    constructor() {
        this.adjList = [];
        this.location = [];
        this.nodeRadius = 30
        this.nodeClicked1 = undefined;
        this.nodeClicked2 = undefined;
    }

    createNode(pos) {
        this.adjList.push([]);
        this.location.push({x: pos.x, y: pos.y})
    }

    print() {
        for (var i = 0; i < this.location.length; i++) {
            c.beginPath();
            c.arc(this.location[i].x, this.location[i].y, this.nodeRadius, 0, 2 * Math.PI);
            c.stroke();
            
            c.font = "30px calibri";
            var adjust = 8;
            if (i > 9) {
                adjust = 16;
            }
            if (i > 99) {
                adjust = 23
            }
            c.fillText(String(i), this.location[i].x - adjust, this.location[i].y + 10);

            if (this.adjList.length > 0) {
                c.beginPath;
                c.moveTo(this.location[i].x, this.location[i].y)

                for (var j = 0; j < this.adjList[i].length; j++) {
                    c.lineTo(this.location[j].x, this.location[j].y)
                    c.stroke();
                }

            }
        }
    }

    collision() {
        if (this.adjList.length > 1) {
            for (var i = 0; i < this.adjList.length; i++) {
                var checkX = mouseClick.x - this.location[i].x;
                var checkY = mouseClick.y - this.location[i].y;

                if (checkX >= -this.nodeRadius && checkX <= this.nodeRadius && checkY >= -this.nodeRadius && checkY <= this.nodeRadius) {
                    mouseClick.x = -1;
                    mouseClick.y = -1;

                    if (this.nodeClicked1 === undefined) {
                        this.nodeClicked1 = i;
                    }
                    else {
                        this.nodeClicked2 = i;
                        //BREAK?
                    }

                    if (this.nodeClicked1 !== undefined && this.nodeClicked2 !== undefined) {
                        this.adjList[this.nodeClicked1].push(this.nodeClicked2);
                        this.adjList[this.nodeClicked2].push(this.nodeClicked1);
                        
                        this.nodeClicked1 = undefined;
                        this.nodeClicked2 = undefined;
                    }
                }
            }
        }
    }   
}


graph = new Graph();
var counter = 0

var mouseClick = {
    x: undefined,
    y: undefined
}

window.addEventListener('click', function(event) {
    mouseClick.x = event.pageX;
    mouseClick.y = event.pageY;

    if (counter < 5) { //FOR DEBUG
        graph.createNode({x: mouseClick.x, y: mouseClick.y});
        counter += 1

    }
    else {
        graph.collision();
    }
})


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    graph.print();

    // c.beginPath();
    // c.arc(100, 75, 30, 0, 2 * Math.PI);
    // c.stroke();
    // c.font = "30px calibri";
    // c.fillText("10", 100-16, 75+10);

    //console.log(graph.nodeClicked1, graph.nodeClicked2);
    console.log(graph.adjList);

    
    //TODO FIX EDGE CREATION
    // PREVENT CREATEING NODES ONTOP OF NODES
    // ADD DELETION
    // ADD UI ELEMENTS
    // COLORS
    // ADD DIRECTED GRAPH FUNCTIONALITY

};

animate();