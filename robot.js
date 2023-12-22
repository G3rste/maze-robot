class Robot {
    constructor(maze, x, y, direction) {
        this.maze = maze;
        this.x = x;
        this.y = y;
        this.direction = direction; //0 - left, 1 - up, 2 - right, 3 - down
        this.renderIndex = 0;
        this.renderAsync();
    }

    turnRight() {
        this.direction = (this.direction + 1) % 4;
        this.renderAsync();
    }

    turnLeft() {
        this.direction = (this.direction + 3) % 4;
        this.renderAsync();
    }

    lookForward() {
        if (this.direction % 2 === 1) {
            return this.maze.getCell(this.x, this.y + this.direction - 2);
        } else {
            return this.maze.getCell(this.x + this.direction - 1, this.y);
        }
    }

    moveForward() {
        if (this.lookForward() === "floor" || this.lookForward() === "target") {
            if (this.direction % 2 === 1) {
                this.y += this.direction - 2;
            } else {
                this.x += this.direction - 1;
            }
        }
        this.renderAsync();
    }

    renderAsync() {
        if (this.renderIndex > 100000) {
            throw new Error("Robot ran out of battery (you probably created an infinite loop)!");
        }
        let x = this.x;
        let y = this.y;
        let direction = this.direction;
        setTimeout(() => {
            render(this.maze, x, y, direction);
        }, this.renderIndex * timeout);
        this.renderIndex++;
    }
}