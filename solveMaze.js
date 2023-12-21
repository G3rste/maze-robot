function solveMaze(robot) {
    while (true) {
        robot.turnRight();
        while (robot.lookForward() === "wall") {
            robot.turnLeft();
        }
        if (robot.lookForward() === "target") {
            robot.moveForward();
            //break;
        }
        robot.moveForward();
    }
}