export function checkWin(table) {
    // Verificar horizontal
    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 3; col++) {
            if (table[row] && table[row][col] !== undefined && // Comprobaciones añadidas
                table[row][col] !== 0 &&
                table[row][col] === table[row][col + 1] &&
                table[row][col] === table[row][col + 2] &&
                table[row][col] === table[row][col + 3]) {
                return table[row][col]
            }
        }
    }
    


    // Verificar vertical
    for (let col = 0; col < 6; col++) {
        for (let row = 0; row < 4; row++) {
            if (table[row] && table[row][col] !== undefined &&
                table[row][col] !== 0 &&
                table[row][col] === table[row + 1][col] &&
                table[row][col] === table[row + 2][col] &&
                table[row][col] === table[row + 3][col]) {
                return table[row][col]
            }
        }
    }

    // Verificar diagonal (de izquierda a derecha)
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            if (table[row] && table[row][col] !== undefined &&
                table[row][col] !== 0 &&
                table[row][col] === table[row + 1][col + 1] &&
                table[row][col] === table[row + 2][col + 2] &&
                table[row][col] === table[row + 3][col + 3]) {
                    return table[row][col]
            }
        }
    }

    // Verificar diagonal (de derecha a izquierda)
    for (let row = 0; row < 4; row++) {
        for (let col = 3; col < 6; col++) {
            if (table[row] && table[row][col] !== undefined &&
                table[row][col] !== 0 &&
                table[row][col] === table[row + 1][col - 1] &&
                table[row][col] === table[row + 2][col - 2] &&
                table[row][col] === table[row + 3][col - 3]) {
                    return table[row][col]
            }
        }
    }

    return 0;
}









//      ########################################################################






export function checkThree(table) {

    // Verificar horizontal
    try {
        for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 3; col++) { // Cambiado de 5 a 4
            if (table[row][col] !== 0 &&
                table[row][col] === table[row][col + 1] &&
                table[row][col] === table[row][col + 2] &&
                table[row][col-1] == 0) {
                return   {winnerThree: table[row][col], row_col_three:  [[row, col],[row, col+1],[row, col+2]]};
           }
        }
    }

    // Verificar vertical
    for (let col = 0; col < 6; col++) {
        for (let row = 0; row < 4; row++) {
            if (table[row][col] !== 0 &&
                table[row][col] === table[row + 1][col] &&
                table[row][col] === table[row + 2][col] &&
                (table[row+3][col] == 0 || table[row-1][col] == 0)) {
                return {winnerThree: table[row][col], row_col_three:  [[row, col],[row+1, col],[row+2, col]]};
              }
        }
    }

    // Verificar diagonal (de izquierda a derecha)
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            if (table[row][col] !== 0 &&
                table[row][col] === table[row + 1][col + 1] &&
                table[row][col] === table[row + 2][col + 2] &&
                table[row+3][col+3] == 0) {
                return {winnerThree: table[row][col], row_col_three:  [[row, col],[row+1, col+1],[row+2, col+2]]};
            }
        }
    }
    // console.log(table[row][col])
    // console.log(table[row + 1][col - 1])
    // console.log(table[row + 2][col - 2])
    // console.log(table[row+3][col-3])

    // console.log(row)
    // console.log(col)
    // console.log(row+1)
    // console.log(col-1)
    // console.log(row+2)
    // console.log(col-2)
    // console.log(row+3)
    // console.log(col-3)

    // Verificar diagonal (de derecha a izquierda)
    for (let row = 0; row < 4; row++) {
        for (let col = 3; col < 6; col++) {
            if (table[row][col] !== 0 &&
                table[row][col] === table[row + 1][col - 1] &&
                table[row][col] === table[row + 2][col - 2] &&
                table[row+3][col-3] == 0) {


                return {winnerThree: table[row][col], row_col_three:  [[row, col],[row+1, col-1],[row+2, col-2]]};
            }
        }
    }}

    catch{
        return {winnerOne: 0, row_col_one: null};
    }
    return {winnerOne: 0, row_col_one: null};
}


//      ########################################################################





export function checkTwo(table) {
    // Verificar horizontal
    try{
        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 6; col++) {
                if (col < 5 && table[row][col] !== 0 &&
                    table[row][col] === table[row][col + 1] &&
                    table[row][col-1] == 0 &&
                    table[row][col-2] == 0) {
                    return {winnerTwo : table[row][col], row_col_two: [[row, col],[row,col+1]]};
                }
            }
        }
    
        // Verificar vertical
        for (let col = 0; col < 6; col++) {
            for (let row = 0; row < 4; row++) {
                if (table[row][col] !== 0 &&
                    table[row][col] === table[row + 1][col] &&
                    ((table[row+2][0] == 0 && table[row+3][0] == 0 ) || (table[row-1][0] == 0 && table[row-2][0])) ) {
                    return {winnerTwo : table[row][col], row_col_two: [[row, col],[row+1,col]]};
                }
            }
        }
    
        // Verificar diagonal (de izquierda a derecha)
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 3; col++) {
                if (table[row][col] !== 0 &&
                    table[row][col] === table[row + 1][col + 1] &&
                    table[row+2][col+2] == 0 &&
                    table[row+3][col+3] == 0){
                    return {winnerTwo : table[row][col], row_col_two: [[row, col],[row+1,col+1]]};
                }
            }
        }
    
        // Verificar diagonal (de derecha a izquierda)
        for (let row = 0; row < 4; row++) {
            for (let col = 4; col > 2; col--) {
                if (table[row][col] !== 0 &&
                    table[row][col] === table[row + 1][col - 1] &&
                    table[row+2][col-2] == 0 &&
                    table[row+3][col-3] == 0) {
                    return {winnerTwo : table[row][col], row_col_two: [[row, col],[row+1,col-1]]};
                }
            }
        }
    }

    catch{
        return {winnerOne: 0, row_col_one: null};
    }

    return {winnerOne: 0, row_col_one: null};
}


//      ########################################################################






    
