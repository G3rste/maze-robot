# Maze Robot
Help the little robot find an exit to any given maze.

## Exercise 1 - How to control the robot
Take a look at the maze we are going to solve. To do so, just open up exercise1.html in a browser of your liking.
Try getting familiar with the robots controls. Open up the file solveMaze.js and edit the `solveMaze` function to make the robot move.
The robot has access to the following methods: 
* `turnLeft` -> turns the Robot to the left 
* `turnRight` -> turns the Robot to the right 
* `lookForward` -> looks in front of the robot returns:
  * `wall` -> if the robot is facing a wall
  * `floor` -> if the space in front of the robot is free
  * `target` -> if the robot is facing the exit of the maze
* `moveForward` -> moves the robot one block forward

Try editing the `solveMaze` function to make the robot move onto the exit.

## Exercise 2 - How to solve any maze
Now Try modifying your solveMaze function so that it can solve any maze you get when opening exercise2.html in your browser. If you have any trouble thinking of a way to do that, take a look <a href="https://en.wikipedia.org/wiki/Maze-solving_algorithm">here</a>.

## Exercise 3 - Any maze you say?
Open up the file unsolvableMaze.js and return a maze that can not be solved by your algorithm from exercise 2. Tipp: The exit does not have to be on the outside of the maze.