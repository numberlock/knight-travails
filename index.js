"use strict";
const board = document.querySelector(".board");

let adjList = new Map();

const addEdges = function (i, j) {
  let possibleMoves = [
    [2, -1],
    [2, 1],
    [1, -2],
    [1, 2],
    [-1, -2],
    [-1, 2],
    [-2, -1],
    [-2, 1],
  ];
  for (let k = 0; k < 8; k++) {
    let newI = i + possibleMoves[k][0];
    let newJ = j + possibleMoves[k][1];
    if (newI >= 0 && newJ >= 0 && newI < 8 && newJ < 8) {
      adjList.get(`[${i},${j}]`).push(`[${newI},${newJ}]`);
    }
  }
};

function createGrid() {
  for (let i = 0; i <= 7; i++) {
    const createRow = document.createElement("div");
    for (let j = 7; j >= 0; j--) {
      const createColumn = document.createElement("div");
      createColumn.classList.add("square");
      createColumn.dataset.cord = `${i},${j}`;
      createColumn.textContent = `${i},${j}`;
      adjList.set(`[${i},${j}]`, []);
      addEdges(i, j);
      if (i % 2 === 0) {
        if (j % 2 === 0) createColumn.classList.add("white-square");
        else createColumn.classList.add("black-square");
      } else {
        if (j % 2 === 0) createColumn.classList.add("black-square");
        else createColumn.classList.add("white-square");
      }

      createRow.appendChild(createColumn);
    }
    board.appendChild(createRow);
  }
}

function createKnight() {
  const createImg = document.createElement("img");
  createImg.classList.add("knight");
  createImg.dataset.cord = "0,0";
  createImg.src = "knight.png";
  const square = document.querySelector("[data-cord='0,0']");
  square.appendChild(createImg);
}

createGrid();
createKnight();

const knightMoves = function (s, e) {
  const breathFirst = function (start) {
    let queue = [start];
    let visited = [start];
    let bfs = [{ object: start, pred: null }];

    while (queue.length !== 0) {
      let node = queue.shift();
      let neighbors = adjList.get(node);
      for (let i = 0; i < neighbors.length; i++) {
        if (!visited.includes(neighbors[i])) {
          queue.push(neighbors[i]);
          visited.push(neighbors[i]);

          bfs.push({ object: neighbors[i], pred: node });
        }
      }
    }
    console.log(bfs);
    return bfs;
  };

  let path = [];
  const reconstructPath = function (s, e, bfs) {
    for (let i = 0; i < bfs.length; i++) {
      if (bfs[i].object === e) {
        if (bfs[i].pred === null) return;
        path.push(bfs[i].pred);
        reconstructPath(s, bfs[i].pred, bfs);
      }
    }
  };

  reconstructPath(s, e, breathFirst(s));
  path.unshift(e);
  return path;
};
console.log(knightMoves("[0,0]", "[2,1]"));
