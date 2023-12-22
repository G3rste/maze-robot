function render(maze, x, y, direction) {
    let html = "";
    for (let y = 0; y < maze.grid.length; y++) {
        html += '<div class="row">';
        for (let x = 0; x < maze.grid[y].length; x++) {
            html += `<div class="cell ${maze.grid[y][x]}" id="cell_${x}_${y}"></div>`;
        }
        html += '</div>';
    }
    document.getElementById("maze").innerHTML = html;

    let directionClass;
    switch (direction) {
        case 0: directionClass = "left";
            break;
        case 1: directionClass = "up";
            break;
        case 2: directionClass = "right";
            break;
        case 3: directionClass = "down";
            break;
        default: throw new Error("Invalid direction");
    }
    document.getElementById(`cell_${x}_${y}`).innerHTML = `<img class="robot ${directionClass}" src = "robot.svg" alt="Dave der Roboter"/>`;
    if (maze.getCell(x, y) === "target") {
        document.getElementById("status").innerHTML = 'Maze solved';
    }
}