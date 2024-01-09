//accepts a starting position and an ending position (positions are in the format of [x,y]) of a knight on a chess board
//returns the shortest path from start to end in the form "You made it in [number] of moves! Here's your path: [path]"
//uses a data structure traversed with a breadth first search

function knightsTravails(start, end) {
  // Check if start and end are valid
  if (start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7) {
    console.log("Invalid starting position");
    return;
  }
  if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
    console.log("Invalid ending position");
    return;
  }

  // Create a graph of all possible moves
  const graph = createGraph();

  // Use a breadth first search to find the shortest path
  const path = breadthFirstSearch(graph, start, end);

  // Return the path
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((move) => console.log(`[${move[0]}, ${move[1]}]`));

  return path;

  // Function to create a graph of all possible moves
  function createGraph() {
    const graph = {}; // Initialize an empty object to store the graph
    for (let i = 0; i < 8; i++) {
      // Iterate over the rows of the chessboard
      for (let j = 0; j < 8; j++) {
        // Iterate over the columns of the chessboard
        graph[[i, j]] = []; // Initialize an empty array for each position on the chessboard

        // Define all possible knight moves
        const moves = [
          [-2, -1],
          [-2, 1],
          [-1, -2],
          [-1, 2],
          [1, -2],
          [1, 2],
          [2, -1],
          [2, 1],
        ];

        // Check each possible move and add valid moves to the graph
        moves.forEach(([dx, dy]) => {
          const x = i + dx; // Calculate the new row position
          const y = j + dy; // Calculate the new column position
          if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            // Check if the new position is within the chessboard boundaries
            graph[[i, j]].push([x, y]); // Add the valid move to the array of possible moves for the current position
          }
        });
      }
    }
    return graph; // Return the created graph
  }

  // Function to perform breadth first search
  function breadthFirstSearch(graph, start, end) {
    const queue = []; // Initialize a queue to store the nodes to be visited
    const visited = {}; // Initialize an object to keep track of visited nodes
    const parent = {}; // Initialize an object to store the parent node of each visited node
    queue.push(start); // Add the start node to the queue
    visited[start] = true; // Mark the start node as visited
    while (queue.length) {
      // Continue the loop until the queue is empty
      const current = queue.shift(); // Get the next node from the front of the queue
      if (current[0] === end[0] && current[1] === end[1]) {
        // Check if the current node is the end node
        return getPath(parent, end); // If yes, return the path from start to end using the parent object
      }
      for (let i = 0; i < graph[current].length; i++) {
        // Iterate over the neighbors of the current node
        if (!visited[graph[current][i]]) {
          // Check if the neighbor node has not been visited
          queue.push(graph[current][i]); // Add the neighbor node to the queue
          visited[graph[current][i]] = true; // Mark the neighbor node as visited
          parent[graph[current][i]] = current; // Set the parent of the neighbor node as the current node
        }
      }
    }
  }

  // Function to retrieve the path from start to end using the parent object
  function getPath(parent, end) {
    const path = []; // Initialize an empty array to store the path
    let current = end; // Set the current node as the end node
    while (current) {
      // Continue the loop until the current node is null (reached the start node)
      path.unshift(current); // Add the current node to the front of the path array
      current = parent[current]; // Update the current node to its parent node
    }
    return path; // Return the path from start to end
  }
}

console.log("Knights Travails");

console.log("\n----------------------------------------");
console.log("Test 1");
console.log("Start: [0, 0], End: [3, 3]\n");
console.log("Expected: \nYou made it in 2 moves! Here's your path:");
console.log("[0, 0]");
console.log("[1, 2]");
console.log("[3, 3]");
console.log("\nActual:");
knightsTravails([0, 0], [3, 3]);

console.log("\n----------------------------------------");
console.log("Test 2");
console.log("Start: [3, 3], End: [0, 0]\n");
console.log("Expected: \nYou made it in 2 moves! Here's your path:");
console.log("[3, 3]");
console.log("[1, 2]");
console.log("[0, 0]");
console.log("\nActual:");
knightsTravails([3, 3], [0, 0]);

console.log("\n----------------------------------------");
console.log("Test 3");
console.log("Start: [0, 0], End: [7, 7]\n");
console.log("Expected: \nYou made it in 6 moves! Here's your path:");
console.log("[0, 0]");
console.log("[1, 2]");
console.log("[0, 4]");
console.log("[1, 6]");
console.log("[3, 5]");
console.log("[5, 6]");
console.log("[7, 7]");
console.log("\nActual:");
knightsTravails([0, 0], [7, 7]);

console.log("\n----------------------------------------");
console.log("Test 4");
console.log("Start: [0, 0], End: [1, 2]\n");
console.log("Expected: \nYou made it in 1 moves! Here's your path:");
console.log("[0, 0]");
console.log("[1, 2]");
console.log("\nActual:");
knightsTravails([0, 0], [1, 2]);

console.log("\n----------------------------------------");
console.log("Test 5");
console.log("Start: [-1, -1], End: [5, 5]\n");
console.log("Expected: \nInvalid starting position");
console.log("\nActual:");
knightsTravails([-1, -1], [5, 5]);

console.log("\n----------------------------------------");
console.log("Test 6");
console.log("Start: [0, 0], End: [9, 9]\n");
console.log("Expected: \nInvalid ending position");
console.log("\nActual:");
knightsTravails([0, 0], [9, 9]);
