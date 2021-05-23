import { cellCount, cellHeight, cellWidth, pieceHeight, pieceWidth, totalCellsCount } from "./constants";
import { ChessColor, ChessFiguresMap } from "./types";

// get cell color from it's index
export const getCellColor = (index: number): ChessColor => {
  const { row, column } = getRowColumnFromIndex(index);

  if (row % 2 === 0) {
    return column % 2 === 0 ? 'white' : 'black';
  }
  return column % 2 === 0 ? 'black' : 'white';
};

// Calculate row and column from flat array's index
export const getRowColumnFromIndex = (index: number) => {
  if (Number.isNaN(index) || index < 0 || index >= totalCellsCount) {
    throw new Error('out of bounds');
  }
  return {
    row: Math.floor(index / cellCount),
    column: index % cellCount,
  };
}

// Calculate flat array's index from row and column
export const getIndexFromRowColumn = (row: number, column: number) => {
  if (Number.isNaN(row)
    || Number.isNaN(column)
    || row < 0
    || column < 0
    || column >= cellCount
    || column >= cellCount
  ) {
    throw new Error('out of bounds');
  }
  return row * cellCount + column;
}

export const getTopLeftFromIndex = (index: number) => {
  const { row, column } = getRowColumnFromIndex(index);

  return {
    top: cellHeight * row,
    left: cellWidth * column,
  };
}

// Sum of elements helper function
export const add = (a: number, b: number) => a + b;
// Subtraction of elements helper function
export const sub = (a: number, b: number) => a - b;

// Get available moves for selected figure
export const getAvailableMoves = (...args: [ChessFiguresMap, number]): Array<number> => {
  const [figures, figureIndex] = args;
  const figure = figures[figureIndex];
  switch (figure.type) {
    case 'pawn':
      return getPawnMoves(...args);
    case 'rook':
      return getRookMoves(...args);
    case 'knight':
      return getKnightMoves(...args);
    case 'bishop':
      return getBishopMoves(...args);
    case 'king':
      return getKingMoves(...args);
    case 'queen':
      return getQueenMoves(...args);
    default:
      return [];
  }
}

type Direction = 'up'
  | 'up-right'
  | 'right'
  | 'down-right'
  | 'down'
  | 'down-left'
  | 'left'
  | 'up-left';

const getIndexForDirection = (
  direction: Direction,
  index: number,
) => {
  const { row, column } = getRowColumnFromIndex(index);

  // get next index for this direction and check "out of bounds" (goes to default case)
  switch (true) {
    case direction === 'up' && row - 1 >= 0:
      return getIndexFromRowColumn(row - 1, column);

    case direction === 'up-right' && row - 1 >= 0 && column + 1 < cellCount:
      return getIndexFromRowColumn(row - 1, column + 1);

    case direction === 'right' && column + 1 < cellCount:
      return getIndexFromRowColumn(row, column + 1);

    case direction === 'down-right' && row + 1 < cellCount && column + 1 < cellCount:
      return getIndexFromRowColumn(row + 1, column + 1);

    case direction === 'down' && row + 1 < cellCount:
      return getIndexFromRowColumn(row + 1, column);

    case direction === 'down-left' && row + 1 < cellCount && column - 1 >= 0:
      return getIndexFromRowColumn(row + 1, column - 1);

    case direction === 'left' && column - 1 >= 0:
      return getIndexFromRowColumn(row, column - 1);

    case direction === 'up-left' && row - 1 >= 0 && column - 1 >= 0:
      return getIndexFromRowColumn(row - 1, column - 1);

    default:
      return -1;
  }
}

const checkDirection = (
  direction: Direction,
  figures: ChessFiguresMap,
  figureIndex: number,
  oneMove?: boolean
): Array<number> => {
  const moves = [];
  let nextIndex = getIndexForDirection(direction, figureIndex);
  // Cycle through desired direction
  while (true) {
    const nextFigure = figures[nextIndex];
    // Check if figure exists on this cell
    if (nextFigure || nextIndex === -1) {
      break;
    }
    // Add current index to "available moves" array
    moves.push(nextIndex);
    // Go to next cell in this direction
    nextIndex = getIndexForDirection(direction, nextIndex);

    // For king check only one move
    if (oneMove) {
      break;
    }
  }
  return moves;
}

export const getPawnMoves = (figures: ChessFiguresMap, figureIndex: number): Array<number> => {
  const figure = figures[figureIndex];
  const { row, column } = getRowColumnFromIndex(figureIndex);
  const op = figure.color === 'black' ? add : sub;
  // If it's pawn's first step allow 2 steps forward
  if (row === 1 || row === 6) {
    return [
      getIndexFromRowColumn(op(row, 1), column),
      getIndexFromRowColumn(op(row, 2), column),
    ];
  }
  // If not only one step
  return [getIndexFromRowColumn(op(row, 1), column)];
}

export const getRookMoves = (...args: [ChessFiguresMap, number]): Array<number> => {
  // Check vertical and horizontal directions
  return [
    ...checkDirection('up', ...args),
    ...checkDirection('right', ...args),
    ...checkDirection('down', ...args),
    ...checkDirection('left', ...args),
  ];
}

export const getKnightMoves = (figures: ChessFiguresMap, figureIndex: number): Array<number> => {
  const { row, column } = getRowColumnFromIndex(figureIndex);
  // Check knight moves
  const moves = [
    getIndexFromRowColumn(row - 2, column + 1),
    getIndexFromRowColumn(row - 1, column + 2),
    getIndexFromRowColumn(row + 1, column + 2),
    getIndexFromRowColumn(row + 2, column + 1),
    getIndexFromRowColumn(row + 1, column - 2),
    getIndexFromRowColumn(row + 2, column - 1),
    getIndexFromRowColumn(row - 2, column - 1),
    getIndexFromRowColumn(row - 1, column - 2),
  ];
  return moves.filter((nextIndex) => {
    return !figures[nextIndex] && nextIndex > 0 && nextIndex < totalCellsCount;
  });
}

export const getBishopMoves = (...args: [ChessFiguresMap, number]): Array<number> => {
  // Check diagonal directions
  return [
    ...checkDirection('up-right', ...args),
    ...checkDirection('down-right', ...args),
    ...checkDirection('down-left', ...args),
    ...checkDirection('up-left', ...args),
  ];
}

export const getKingMoves = (...args: [ChessFiguresMap, number]): Array<number> => {
  // Check vertical, horizontal and diagonal directions (only one step)
  return [
    ...checkDirection('up', ...args, true),
    ...checkDirection('right', ...args, true),
    ...checkDirection('down', ...args, true),
    ...checkDirection('left', ...args, true),
    ...checkDirection('up-right', ...args, true),
    ...checkDirection('down-right', ...args, true),
    ...checkDirection('down-left', ...args, true),
    ...checkDirection('up-left', ...args, true),
  ]
}

export const getQueenMoves = (...args: [ChessFiguresMap, number]): Array<number> => {
  // Check vertical, horizontal and diagonal directions
  return [
    ...checkDirection('up', ...args),
    ...checkDirection('right', ...args),
    ...checkDirection('down', ...args),
    ...checkDirection('left', ...args),
    ...checkDirection('up-right', ...args),
    ...checkDirection('down-right', ...args),
    ...checkDirection('down-left', ...args),
    ...checkDirection('up-left', ...args),
  ];
}
