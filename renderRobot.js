function renderRobot(position) {
    let directionClass;
    switch (position.direction) {
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
    document.getElementById(`cell_${position.x}_${position.y}`).innerHTML = `<img class="robot ${directionClass}" src = "robot.svg" alt="Dave der Roboter"/>`;
}