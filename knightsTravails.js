//accepts a starting position and an ending position (positions are in the format of [x,y]) of a knight on a chess board
//returns the shortest path from start to end in the form "You made it in [number] of moves! Here's your path: [path]"
//uses a data structure traversed with a breadth first search

function knightsTravails(start, end) {
  //check if start and end are valid
  if (start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7) {
    console.log("Invalid starting position");
    return;
  }
  if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
    console.log("Invalid ending position");
    return;
  }

  //create a graph of all possible moves
  //use a breadth first search to find the shortest path
  //return the path

  //create a graph of all possible moves
  const graph = createGraph();

  //use a breadth first search to find the shortest path
  const path = breadthFirstSearch(graph, start, end);

  //return the path
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((move) => console.log(`[${move[0]}, ${move[1]}]`));

  return path;

  //helper functions
  function createGraph() {
    const graph = {};
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        graph[[i, j]] = [];
        if (i - 2 >= 0 && j - 1 >= 0) {
          graph[[i, j]].push([i - 2, j - 1]);
        }
        if (i - 2 >= 0 && j + 1 < 8) {
          graph[[i, j]].push([i - 2, j + 1]);
        }
        if (i - 1 >= 0 && j - 2 >= 0) {
          graph[[i, j]].push([i - 1, j - 2]);
        }
        if (i - 1 >= 0 && j + 2 < 8) {
          graph[[i, j]].push([i - 1, j + 2]);
        }
        if (i + 1 < 8 && j - 2 >= 0) {
          graph[[i, j]].push([i + 1, j - 2]);
        }
        if (i + 1 < 8 && j + 2 < 8) {
          graph[[i, j]].push([i + 1, j + 2]);
        }
        if (i + 2 < 8 && j - 1 >= 0) {
          graph[[i, j]].push([i + 2, j - 1]);
        }
        if (i + 2 < 8 && j + 1 < 8) {
          graph[[i, j]].push([i + 2, j + 1]);
        }
      }
    }
    return graph;
  }

  function breadthFirstSearch(graph, start, end) {
    const queue = [];
    const visited = {};
    const parent = {};
    queue.push(start);
    visited[start] = true;
    while (queue.length) {
      const current = queue.shift();
      if (current[0] === end[0] && current[1] === end[1]) {
        return getPath(parent, start, end);
      }
      for (let i = 0; i < graph[current].length; i++) {
        if (!visited[graph[current][i]]) {
          queue.push(graph[current][i]);
          visited[graph[current][i]] = true;
          parent[graph[current][i]] = current;
        }
      }
    }
  }

  function getPath(parent, start, end) {
    const path = [];
    let current = end;
    while (current) {
      path.unshift(current);
      current = parent[current];
    }
    return path;
  }
}

console.log("Knights Travails");
console.log("----------------------------------------");
console.log("Test 1");
console.log("\nStart: [0, 0], End: [3, 3]");
console.log("Expected: You made it in 2 moves! Here's your path:");
console.log("[0, 0]");
console.log("[1, 2]");
console.log("[3, 3]");
console.log("\nActual:");
knightsTravails([0, 0], [3, 3]);
console.log("----------------------------------------");
console.log("Test 2");
console.log("\nStart: [3, 3], End: [0, 0]");
console.log("Expected: You made it in 2 moves! Here's your path:");
console.log("[3, 3]");
console.log("[1, 2]");
console.log("[0, 0]");
console.log("\nActual:");
knightsTravails([3, 3], [0, 0]);
console.log("----------------------------------------");
console.log("Test 3");
console.log("\nStart: [0, 0], End: [7, 7]");
console.log("Expected: You made it in 6 moves! Here's your path:");
console.log("[0, 0]");
console.log("[1, 2]");
console.log("[2, 4]");
console.log("[3, 6]");
console.log("[5, 7]");
console.log("[7, 6]");
console.log("[6, 4]");
console.log("[7, 2]");
console.log("[6, 0]");
console.log("[7, 7]");
console.log("\nActual:");
knightsTravails([0, 0], [7, 7]);
console.log("----------------------------------------");
console.log("Test 4");
console.log("\nStart: [0, 0], End: [1, 2]");
console.log("Expected: You made it in 1 moves! Here's your path:");
console.log("[0, 0]");
console.log("[1, 2]");
console.log("\nActual:");
knightsTravails([0, 0], [1, 2]);
console.log("----------------------------------------");
console.log("Test 5");
console.log("\nStart: [-1, -1], End: [5, 5]");
console.log("Expected: Invalid starting position");
console.log("\nActual:");
knightsTravails([0, 0], [5, 5]);
console.log("----------------------------------------");
console.log("Test 6");
console.log("\nStart: [0, 0], End: [9, 9]");
console.log("Expected: Invalid ending position");
console.log("\nActual:");
knightsTravails([0, 0], [9, 9]);
