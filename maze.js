class Maze {
    constructor(grid) {
        this.grid = grid;
    }

    getCell(x, y) {
        if (y >= 0 && y < this.grid.length) {
            let row = this.grid[y];
            if (x >= 0 && x < row.length) {
                return row[x];
            }
        }
        return "wall";
    }
}