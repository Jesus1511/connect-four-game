import { checkWin } from '../ia/checkWin.js';

export function bestMove(board) {
    const { validMoves, validIndexs } = getValidMoves(board, true);
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < validMoves.length; i++) {
        let newBoard = validMoves[i];
        const score = minimax(newBoard, false, 0, -Infinity, Infinity);
        if (score > bestScore) {
            bestScore = score;
            move = validIndexs[i];
        }
        if (score == "n") {
            return "n"
        }
    }

    return move;
}

function minimax(board, isMaximizing, depth, alpha, beta) {
    const winner = checkWin(board);
    if (winner !== 0) {
        return winner == 2 ? 1 : -1;
    }

    if (depth >= 20) {  // Limitar la profundidad a 8 para evitar exceso de cálculo
        return 'n';
    }

    const { validMoves } = getValidMoves(board, isMaximizing);
    if (validMoves.length === 0) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < validMoves.length; i++) {
            let newBoard = validMoves[i];
            const score = minimax(newBoard, false, depth + 1, alpha, beta);
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
                break;
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < validMoves.length; i++) {
            let newBoard = validMoves[i];
            const score = minimax(newBoard, true, depth + 1, alpha, beta);
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, score);
            if (beta <= alpha) {
                break;
            }
        }
        return bestScore;
    }
}



function getValidMoves(board, isMaximizing) {
    let validMoves = [];
    let validIndexs = [];

    for (let i = 0; i < board.length; i++) {
        const column = board[i];
        const j = findSpace(column);
        if (j !== -1) {
            const newBoard = board.map(row => row.slice());
            newBoard[i][j] = isMaximizing ? 2 : 1;
            validMoves.push(newBoard);
            validIndexs.push(i);
        }
    }
    return { validMoves, validIndexs };
}

function findSpace(column) {
    for (let i = column.length - 1; i >= 0; i--) {
        if (column[i] === 0) {
            return i;
        }
    }
    return -1;
}
