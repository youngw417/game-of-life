# Cellular Automata and The Game of Life in React

## The Game of Life
A very famous cellular automaton is John Conway's Game of Life. app. This game is a class of discrete model known as a Cellular Automaton, abbreviated CA.

It's made up of a grid of cells (usually 2D, but can be any dimension) that follow a simple set of rules from which complex behaviors can emerge.

## running simulation

In the Game of Life, these rules examine each cell of the grid. For each cell, it counts that cell's eight neighbors (up, down, left, right, and diagonals), and then act on that result.

* If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
* If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
* From those two rules, many types of "creatures" can be created that move around the "landscape".

Note: cells that are off the edge of the grid are typically assumed to be dead. (In other cases, people sometimes code it up to wrap around to the far side.)