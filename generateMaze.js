function generateMaze(width, height) {
    let pathNodeMatrix = randomizedDepthSearchOnMazeMatrix(width, height);
    let mazeGrid = new Array(height * 2 + 1);
    for (i = 0; i < mazeGrid.length; i++) {
        mazeGrid[i] = new Array(width * 2 + 1);
        for (k = 0; k < mazeGrid[i].length; k++) {
            mazeGrid[i][k] = "wall";
        }
    }
    for (i = 0; i < pathNodeMatrix.length; i++) {
        for (k = 0; k < pathNodeMatrix[i].length; k++) {
            mazeGrid[2 * i + 1][2 * k + 1] = "floor";
            let node = pathNodeMatrix[i][k];
            node.openPaths.forEach(element => {
                if (element.x === node.x + 1) {
                    mazeGrid[2 * i + 2][2 * k + 1] = "floor";
                }
                if (element.x === node.x - 1) {
                    mazeGrid[2 * i][2 * k + 1] = "floor";
                }
                if (element.y === node.y + 1) {
                    mazeGrid[2 * i + 1][2 * k + 2] = "floor";
                }
                if (element.y === node.y - 1) {
                    mazeGrid[2 * i + 1][2 * k] = "floor";
                }
            });
        }
    }
    mazeGrid[mazeGrid.length - 1][mazeGrid[mazeGrid.length - 1].length - 2] = "target";
    return new Maze(mazeGrid);
}

function randomizedDepthSearchOnMazeMatrix(width, height) {
    // create node matrix
    let grid = new Array(height);
    for (i = 0; i < height; i++) {
        grid[i] = new Array(width);
        for (k = 0; k < width; k++) {
            grid[i][k] = new Node(i, k, grid);
        }
    }
    // randomized depth search
    let reachableNodes = [grid[0][0]];
    while (reachableNodes.length > 0) {
        let tuple = removeRandomElementFromList(reachableNodes);
        let current = tuple.left;
        current.visited = true;
        let visitedNeighbours = current.findVisitedNeighbours();
        if (visitedNeighbours.length > 0) {
            current.createPath(visitedNeighbours[Math.floor(Math.random() * visitedNeighbours.length)]);
        }
        reachableNodes = tuple.right;
        while (true) {
            let neighbours = current.findUnvisitedNeighbours();
            if (neighbours.length === 0) {
                break;
            }
            tuple = removeRandomElementFromList(neighbours);
            let next = tuple.left;
            current.createPath(next);
            current = next;
            current.visited = true;
            reachableNodes = reachableNodes.concat(tuple.right);
        }
        // could be implemented more efficiently, but is fast enough
        reachableNodes = reachableNodes.filter(node => !node.visited);
    }
    return grid;
}

function removeRandomElementFromList(nodeList) {
    let index = Math.floor(Math.random() * nodeList.length);
    let selected = nodeList[index];
    let newList = [];
    for (i = 0; i < nodeList.length; i++) {
        if (i != index) {
            newList.push(nodeList[i]);
        }
    }
    return new Tuple(selected, newList);
}

class Tuple {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

class Node {
    constructor(x, y, grid) {
        this.x = x;
        this.y = y;
        this.grid = grid;
        this.visited = false;
        this.openPaths = [];
    }

    findNeighbours() {
        let neighbours = [];
        if (this.x > 0) {
            neighbours.push(this.grid[this.x - 1][this.y]);
        }
        if (this.y > 0) {
            neighbours.push(this.grid[this.x][this.y - 1]);
        }
        if (this.x < this.grid.length - 1) {
            neighbours.push(this.grid[this.x + 1][this.y]);
        }
        if (this.y < this.grid[this.x].length - 1) {
            neighbours.push(this.grid[this.x][this.y + 1]);
        }
        return neighbours;
    }

    findVisitedNeighbours() {
        return this.findNeighbours().filter(node => node.visited);
    }

    findUnvisitedNeighbours() {
        return this.findNeighbours().filter(node => !node.visited);
    }

    createPath(node) {
        this.openPaths.push(node);
        node.openPaths.push(this);
    }
}