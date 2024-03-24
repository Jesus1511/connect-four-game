import { checkWin, checkThree, checkTwo } from "./checkWin.js"

export function iaSelection (table){

  function createTable (row, rival){
    const newTable = JSON.parse(JSON.stringify(table));
    const celda = findSpace(newTable[row])
    if(celda < 0){
      return false
    }
    rival ? newTable[row][celda] = 1 : newTable[row][celda] = 2
    return newTable
  }

  function createTableCustom (row, rival, tables){
    const newTable = JSON.parse(JSON.stringify(tables));
    const celda = findSpace(newTable[row])
    if(celda < 0){
      return false
    }
    rival ? newTable[row][celda] = 1 : newTable[row][celda] = 2
    return newTable
  }

// ###############################################################

  function handleFour (row, rival){
    const newTable = createTable(row, rival)
    if(!newTable){
      return false
    }
    if (checkWin(newTable) == 1){
      if(rival){
        return true
      } else {return false}
    }
    else if (checkWin(newTable) == 2){
      if(!rival){
        return true
      } else {return false}
    }
    return false
  }

// ###############################################################

  function handleThree (row, rival){
    const {winnerTwo, row_col_two} = checkTwo(table)
    const newTable = createTable(row, rival)
    if(!newTable){
      return false
    }
    const {winnerThree, row_col_three} = checkThree(newTable)

    for(let x = 0; x < 7; x++){

      const looseTable = createTableCustom(x,true, newTable)
      if(checkWin(looseTable) == 1){
        return false
      } else {
        for(let i = 0; i < 3; i++){
          if(row_col_two !== undefined && row_col_three !== undefined){
            if(
              JSON.stringify(row_col_two[0]) == JSON.stringify(row_col_three[i]) ||
              JSON.stringify(row_col_two[1]) == JSON.stringify(row_col_three[i])
            ){
              if(winnerThree == 1){
                  if(rival){
                    return true
                  } else {return false}}
              else if (winnerTwo == 2){
                if(rival){
                  return false
                } else {return true}}
              }
            }
          }
        }
      }
      }





// ##############################################################

function randomPlay() {
  const randomNumber = Math.random();
  const thresholds = [0.4, 0.55, 0.7, 0.8, 0.9, 0.95]; // Umbrales ajustados para reflejar las nuevas probabilidades
  const percentages = [3, 2, 4, 0, 6, 5]; // Se agrega el número 1 con el porcentaje deseado
  for (let i = 0; i < thresholds.length; i++) {
    if (randomNumber <= thresholds[i]) {
      return percentages[i];
    } 
  }
  return 1; // Porcentaje restante
}


function noRegalarWin() {
  const result = randomPlay()
  const newTable = createTable(result, false)
  if(!newTable){
    return 
  }
  for(let i = 0; i < 7; i++){
    const looseTable = createTableCustom(i, true, newTable)
    if(checkWin(looseTable) == 1){
      noRegalarWin()
      return
    }
  } 
  return result
}

// #############################################################

function findSpace(column) {
  for (let i = 0; i < 6; i++) {
    if (column[i] !== 0) {
      return i-1;
    } else if(i === 6 && column[i] === 0) {
      return 6;
    }
  }
  return 5
}

// ###############################################################

    for(let i = 0; i < 7; i++) {
        if(handleFour(i,false)){
          return i
        } else {""}
    }


    for(let i = 0; i < 7; i++) {
      if(handleFour(i,true)){
        return i
      } else {""}
  }

  for(let i = 0; i < 7; i++) {
    if(handleThree(i,true)){
      return i
    } else {""}
}

for(let i = 0; i < 7; i++) {
  if(handleThree(i,false)){
    return i
  } else {""}
}

  // alert("not find, buscando como el rival puede hacer un tres en fila")
return noRegalarWin()

}
  // buscando rows centrales tirando a en el centro







