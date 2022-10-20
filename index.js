"use strict";
const board = document.querySelector(".board");

function createGrid() {
  for (let i = 1; i <= 8; i++) {
    const createRow = document.createElement("div");
    for (let j = 8; j >= 1; j--) {
      const createColumn = document.createElement("div");
      createColumn.classList.add("square");
      createColumn.dataset.cord = `${i},${j}`;
      createColumn.textContent = `${i}`;
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
  createImg.dataset.cord = "1,1";
  createImg.src = "knight.png";
  const square = document.querySelector("[data-cord='1,1']");
  square.appendChild(createImg);
}

createGrid();
createKnight();
