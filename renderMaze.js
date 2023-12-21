function renderMaze(maze) {
    let html = "";
    for (let y = 0; y < maze.grid.length; y++) {
        html += '<div class="row">';
        for (let x = 0; x < maze.grid[y].length; x++) {
            html += `<div class="cell ${maze.grid[y][x]}" id="cell_${x}_${y}"></div>`;
        }
        html += '</div>';
    }
    document.getElementById("maze").innerHTML = html;
}