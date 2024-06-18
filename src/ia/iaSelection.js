import { checkWin, checkThree, checkTwo } from "./checkWin.js";
import { bestMove } from "../minimax/minmax";

export function iaSelection(table) {

  function createTable(row, rival, tables = table) {
    const newTable = JSON.parse(JSON.stringify(tables));
    const celda = findSpace(newTable[row]);
    if (celda < 0) return false;
    newTable[row][celda] = rival ? 1 : 2;
    return newTable;
  }

  // se le pasa un tablero en el que el amarillo alla jugado ya para que defina si la cago o no
  function checkAutoLoose (table, number) {
    for (let x = 0; x < table.length; x++) {
      const looseTable = createTable(x, true, table);
      const celda = findSpace(table[x]);
      if (
        checkWin(looseTable) == 1 &&
        table[x][celda +1] == number
      ) {
        return true // efectivamente la cago
      }
    }
    return false
  }

  function handleWin(row, rival, tableCheck = table) {
    const newTable = createTable(row, rival, tableCheck);
    if (!newTable) return false;
    const winner = checkWin(newTable);
    if (winner === 1 && rival) return true;
    if (winner === 2 && !rival) return true;
    return false;
  }

  function handleThree(row, rival) {

    const { winnerTwo, row_col_two } = checkTwo(table);
    const newTable = createTable(row, rival);
    if (!newTable) return false;
    const { winnerThree, row_col_three } = checkThree(newTable);

    if (checkAutoLoose(newTable, rival?1:2)) {
      return false
    }
    
    if (row_col_two && row_col_three) {
      if (
        row_col_three.some((pos) => JSON.stringify(pos) === JSON.stringify(row_col_two[0])) ||
        row_col_three.some((pos) => JSON.stringify(pos) === JSON.stringify(row_col_two[1]))
      ) {
        if (winnerThree === 1 && rival) return true;
        if (winnerTwo === 2 && !rival) return true;
        }
      }
    
    return false;
  }

  function randomPlay() {
    const randomNumber = Math.random();
    const thresholds = [0.5, 0.65, 0.8, 0.85, 0.9, 0.95];
    const percentages = [3, 2, 4, 0, 6, 5];
    for (let i = 0; i < thresholds.length; i++) {
      if (randomNumber <= thresholds[i]) return percentages[i];
    }
    return 1;
  }

  function noRegalarWin() {
    const result = randomPlay();
    const newTable = createTable(result, false);
    if (!newTable) return noRegalarWin();
    for (let i = 0; i < 7; i++) {
      const looseTable = createTable(i, true, newTable);
      const looseWinTable = createTable(i, false, newTable);
      if (result == undefined || checkWin(looseTable) === 1 || checkWin(looseWinTable) === 2) {
        return noRegalarWin();
      }
    }
    return result;
  }

  // function findSpace(column) {
  //   for (let i = 0; i < 6; i++) {
  //     if (column[i] !== 0) return i - 1;
  //   }
  //   return 5;
  // }

  // for (let i = 0; i < 7; i++) {
  //   if (handleWin(i, false)) {
  //     console.log("ganar");
  //     return i;
  //   }
  // }

  // for (let i = 0; i < 7; i++) {
  //   if (handleWin(i, true)) {
  //     console.log("defender insta win");
  //     return i;
  //   }
  // }
  
  // for (let i = 0; i < 7; i++) {
  //   if (handleThree(i, true)) {
  //     console.log("defender fila de tres");
  //     return i;
  //   }
  // }

  const minimaxChoose = bestMove(table);
  if (minimaxChoose !== "n") {
    alert("minimax");
    return minimaxChoose;
  }


  // for (let i = 0; i < 7; i++) {
  //   if (handleThree(i, false)) {
  //     console.log("formar fila de tres");
  //     return i;
  //   }
  // }

  console.log("ramdon");
  return noRegalarWin();
}


