var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

alert('Click two nodes to create an edge\nHold shift to move nodes\nHold control to delete nodes');

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
            c.lineWidth = 2
            c.arc(this.location[i].x, this.location[i].y, this.nodeRadius, 0, 2 * Math.PI);
            c.fillStyle = 'black'
            c.fill();
            
            if (this.adjList[i].length > 0) {
                for (var j = 0; j < this.adjList[i].length; j++) {
                    c.beginPath();

                    if (this.adjList[i][j] > i) {
                        try { // BANDAID - Deletion does not work right and can cause errors here
                        c.moveTo(this.location[this.adjList[i][j]].x, this.location[this.adjList[i][j]].y)
                        c.lineTo(this.location[i].x, this.location[i].y);
                        }
                        catch {

                        }
    
                        c.stroke();
                    }
                }
            }

            var adjust = 8;
            if (i > 9) {
                adjust = 16;
            }
            if (i > 99) {
                adjust = 23
            }
            
            c.font = "30px calibri";
            c.beginPath();
            c.fillStyle = 'white';
            c.fillText(String(i), this.location[i].x - adjust, this.location[i].y + 10);


        }
    }

    addEdge() {
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
                    }

                    if (this.nodeClicked1 !== undefined && this.nodeClicked2 !== undefined ) {
                        if (this.nodeClicked1 != this.nodeClicked2 && !graph.adjList[this.nodeClicked1].includes(this.nodeClicked2) && !graph.adjList[this.nodeClicked2].includes(this.nodeClicked1)) {
                            this.adjList[this.nodeClicked1].push(this.nodeClicked2);
                            this.adjList[this.nodeClicked2].push(this.nodeClicked1);
                        }
                        this.nodeClicked1 = undefined;
                        this.nodeClicked2 = undefined;
                    }
                    return true;
                }
            }
        }
        return false;
    }   
}


graph = new Graph();

var mouseClick = {
    x: undefined,
    y: undefined,
}

var mouseMove = {
    x: undefined,
    y: undefined,
    control: false,
    shift: false
}

window.addEventListener('click', function(event) {
    mouseClick.x = event.pageX;
    mouseClick.y = event.pageY;

    if (!graph.addEdge()) {
        graph.createNode({x: mouseClick.x, y: mouseClick.y});
    }
})

window.addEventListener('mousemove', function(event) {
    mouseMove.x = event.pageX;
    mouseMove.y = event.pageY;
    mouseMove.control = event.ctrlKey;
    mouseMove.shift = event.shiftKey;


})

function moveNode() {
    if (graph.adjList.length > 0) {
        for (var i = 0; i < graph.adjList.length; i++) {
            var checkX = mouseMove.x - graph.location[i].x;
            var checkY = mouseMove.y - graph.location[i].y;

            if (checkX >= -graph.nodeRadius && checkX <= graph.nodeRadius && checkY >= -graph.nodeRadius && checkY <= graph.nodeRadius) {
                graph.location[i].x = mouseMove.x;
                graph.location[i].y = mouseMove.y;
                break;
            }
        }
    }
}

function deleteNode() {
    if (graph.adjList.length > 0) {
        var remove = -1;

        for (var i = 0; i < graph.adjList.length; i++) {
            var checkX = mouseMove.x - graph.location[i].x;
            var checkY = mouseMove.y - graph.location[i].y;

            if (checkX >= -graph.nodeRadius && checkX <= graph.nodeRadius && checkY >= -graph.nodeRadius && checkY <= graph.nodeRadius) {
                remove = i;
            }
        }

        if (remove != -1) {
            
            // issues with deletion
            // EX: create interconnected triangle and try to remove node 0 or 1
            // creates error on line 41 which is caught
            for (var i = 0; i < graph.adjList.length; i++) {
                for (var j = 0; j < graph.adjList.length; j++) {
                     if (graph.adjList[i][j] == remove) {
                         graph.adjList[i].splice(j, 1);
                     }                    
                }
            }
            graph.location.splice(remove, 1);
            graph.adjList.splice(remove, 1);
        }

    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (mouseMove.control) {
        deleteNode();
    }
    graph.print();

    c.beginPath()
    c.font = "30px calibri";

    if (mouseMove.shift) {
        moveNode();
    }

    let comma;
    c.fillStyle = 'black';
    for (var i = 0; i < graph.adjList.length; i++) {
        c.fillText(String(i) + ' ---> ', 30, (30 * i) + 30);

        for (var j = 0; j < graph.adjList[i].length; j++) {
            if (graph.adjList[i].length > 1 && j != graph.adjList[i].length - 1) {
                comma = ',';
            }
            else {
                comma = '';
            }
            c.fillText(String(graph.adjList[i][j] + comma), 110 + (30 * j), (30 * i) + 30);
        }
    }
};

animate();