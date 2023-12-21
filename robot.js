class Robot {
    constructor(maze, position) {
        this.maze = maze;
        this.position = position;
        this.renderIndex = 0;
        this.updatePosition();
    }

    turnRight() {
        this.position.turnRight();
        this.updatePosition();
    }

    turnLeft() {
        this.position.turnLeft();
        this.updatePosition();
    }

    lookForward() {
        if (this.position.direction % 2 === 1) {
            return this.maze.getCell(this.position.x, this.position.y + this.position.direction - 2);
        } else {
            return this.maze.getCell(this.position.x + this.position.direction - 1, this.position.y);
        }
    }

    moveForward() {
        if (this.lookForward() === "floor" || this.lookForward() === "target") {
            this.position.moveForward();
        }
        this.updatePosition();
    }

    updatePosition() {
        if (this.renderIndex > 100000) {
            throw new Error("Robot ran out of battery (you probably created an infinite loop)!");
        }
        let position = JSON.parse(JSON.stringify(this.position));
        setTimeout(() => {
            postMessage(position);
        }, this.renderIndex * timeout);
        this.renderIndex++;
    }
}

class RobotPosition {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction; //0 - left, 1 - up, 2 - right, 3 - down
    }
    turnRight() {
        this.direction = (this.direction + 1) % 4;
    }

    turnLeft() {
        this.direction = (this.direction + 3) % 4;
    }

    moveForward() {
        if (this.direction % 2 === 1) {
            this.y += this.direction - 2;
        } else {
            this.x += this.direction - 1;
        }
    }
}