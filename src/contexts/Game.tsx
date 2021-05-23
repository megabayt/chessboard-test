import React, { createContext, Dispatch, Reducer, useMemo, useReducer } from 'react';
import {
  cellCount,
  totalCellsCount,
} from '../constants';
import { ChessColor, ChessFigureObject } from '../types';

const cells: Array<ChessColor> = [...new Array(totalCellsCount)].map((_, totalIndex) => {
  const row = Math.floor(totalIndex / cellCount);
  const index = totalIndex % cellCount;

  if (row % 2 === 0) {
    return index % 2 === 0 ? 'white' : 'black';
  }
  return index % 2 === 0 ? 'black' : 'white';
});

const figures: {
  [key: number]: ChessFigureObject
} = {};
let figureId = 1;
cells.forEach((cellColor, totalIndex) => {
  const row = Math.floor(totalIndex / cellCount);
  const index = totalIndex % cellCount;

  let type, color, stroke;

  if (row === 1 || row === 6) {
    type = 'pawn';
  }
  if (row === 0 || row === 7) {
    if (index === 0 || index === 7) {
      type = 'rook';
    }
    if (index === 1 || index === 6) {
      type = 'knight';
    }
    if (index === 2 || index === 5) {
      type = 'bishop';
    }
    if (index === 3) {
      type = 'queen';
    }
    if (index === 4) {
      type = 'king';
    }
  }
  if (row === 0 || row === 1 || row === 6 || row === 7) {
    color = row === 0 || row === 1 ? 'black' : 'white';
    stroke = cellColor === 'white' ? 'black' : 'white';
  }

  if (type) {
    figures[totalIndex] = {
      id: figureId++,
      type,
      color,
      stroke,
    };
  }
});

type GameAction = ReturnType<
  typeof chooseFigureAction
  | typeof moveFigureAction
  | typeof resetFigureAction
>;
interface GameState {
  cells: Array<ChessColor>;
  figures: { [key: number]: ChessFigureObject };
  availableMoves: Array<number>;
  selectedFigureIndex: number | null;
  dispatch: Dispatch<GameAction>;
}

const defaultValue: GameState = {
  cells,
  figures,
  availableMoves: [],
  selectedFigureIndex: null,
  dispatch: () => { },
}

export const GameContext = createContext<GameState>(defaultValue);

export const chooseFigureAction = (index: number) => ({
  type: 'CHOOSE_FIGURE',
  payload: index,
});
export const moveFigureAction = (index: number) => ({
  type: 'MOVE_FIGURE',
  payload: index,
});
export const resetFigureAction = () => ({
  type: 'RESET_FIGURE',
  payload: null,
});

const gameReducer: Reducer<GameState, GameAction> = (state, action) => {
  switch (action.type) {
    case 'CHOOSE_FIGURE':
      return {
        ...state,
        selectedFigureIndex: action.payload,
        availableMoves: getAvailableMoves(state.figures, action.payload),
      };
    case 'MOVE_FIGURE':
      return {
        ...state,
        selectedFigureIndex: null,
        availableMoves: [],
        figures: {
          ...Object.keys(state.figures).reduce((acc, key) => {
            if (Number(key) === state.selectedFigureIndex) {
              return {
                ...acc,
                [action.payload]: {
                  ...state.figures[state.selectedFigureIndex],
                  stroke: state.cells[action.payload] === 'white' ? 'black' : 'white',
                }
              };
            }
            return {
              ...acc,
              [key]: state.figures[key],
            };
          }, {}),
        }
      };
    case 'RESET_FIGURE':
      return {
        ...state,
        selectedFigureIndex: null,
        availableMoves: [],
      }
    default:
      return state;
  }
};
const getAvailableMoves = (...args: [{ [key: number]: ChessFigureObject }, number]): Array<number> => {
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
const add = (a: number, b: number) => a + b;
const sub = (a: number, b: number) => a - b;

const getPawnMoves = (figures: { [key: number]: ChessFigureObject }, figureIndex: number): Array<number> => {
  const figure = figures[figureIndex];
  const row = Math.floor(figureIndex / cellCount);
  const op = figure.color === 'black' ? add : sub;
  if (row === 1 || row === 6) {
    return [op(figureIndex, 8), op(figureIndex, 16)];
  }
  return [op(figureIndex, 8)];
}

const getRookMoves = (figures: { [key: number]: ChessFigureObject }, figureIndex: number, oneMove?: boolean): Array<number> => {
  const moves = [];
  let nextIndex = figureIndex - 8;
  const currentRow = Math.floor(figureIndex / cellCount);
  while (true) {
    const nextFigure = figures[nextIndex];
    if (nextFigure || nextIndex < 0 || nextIndex > 63) {
      break;
    }
    moves.push(nextIndex);
    if (oneMove) {
      break;
    }
    nextIndex -= 8;
  }
  nextIndex = figureIndex + 8;
  while (true) {
    const nextFigure = figures[nextIndex];
    if (nextFigure || nextIndex < 0 || nextIndex > 64) {
      break;
    }
    moves.push(nextIndex);
    if (oneMove) {
      break;
    }
    nextIndex += 8;
  }
  nextIndex = figureIndex - 1;
  while (true) {
    const nextFigure = figures[nextIndex];
    const row = Math.floor(nextIndex / cellCount);
    if (nextFigure || row !== currentRow) {
      break;
    }
    moves.push(nextIndex);
    if (oneMove) {
      break;
    }
    nextIndex -= 1;
  }
  nextIndex = figureIndex + 1;
  while (true) {
    const nextFigure = figures[nextIndex];
    const row = Math.floor(nextIndex / cellCount);
    if (nextFigure || row !== currentRow) {
      break;
    }
    moves.push(nextIndex);
    if (oneMove) {
      break;
    }
    nextIndex += 1;
  }

  return moves;
}

const getKnightMoves = (figures: { [key: number]: ChessFigureObject }, figureIndex: number): Array<number> => {
  const moves = [
    figureIndex - 17,
    figureIndex - 15,
    figureIndex - 10,
    figureIndex - 6,
    figureIndex + 6,
    figureIndex + 10,
    figureIndex + 15,
    figureIndex + 17,
  ]
  return moves.filter((nextIndex) => {
    return !figures[nextIndex] && nextIndex > 0 && nextIndex < 64;
  });
}

const getBishopMoves = (figures: { [key: number]: ChessFigureObject }, figureIndex: number, oneMove?: boolean): Array<number> => {
  const moves = [];
  let nextIndex: number;
  const column = figureIndex % cellCount;
  if (column !== 7) {
    nextIndex = figureIndex - 7;
    while (true) {
      debugger;
      const nextFigure = figures[nextIndex];
      const row = Math.floor(nextIndex / cellCount);

      if (nextFigure || nextIndex < 0 || nextIndex > 63) {
        break;
      }
      moves.push(nextIndex);
      nextIndex -= 7;
      const nextRow = Math.floor(nextIndex / cellCount);
      if (oneMove || row === nextRow) {
        break;
      }
    }
    nextIndex = figureIndex + 9;
    while (true) {
      const nextFigure = figures[nextIndex];
      const row = Math.floor(nextIndex / cellCount);

      if (nextFigure || nextIndex < 0 || nextIndex > 63) {
        break;
      }
      moves.push(nextIndex);
      nextIndex += 9;
      const nextRow = Math.floor(nextIndex / cellCount);
      if (oneMove || row === nextRow) {
        break;
      }
    }
  }
  if (column !== 0) {
    nextIndex = figureIndex - 9;
    while (true) {
      const nextFigure = figures[nextIndex];
      const row = Math.floor(nextIndex / cellCount);

      if (nextFigure || nextIndex < 0 || nextIndex > 63) {
        break;
      }
      moves.push(nextIndex);
      nextIndex -= 9;
      const nextRow = Math.floor(nextIndex / cellCount);
      if (oneMove || row === nextRow) {
        break;
      }
    }
    nextIndex = figureIndex + 7;
    while (true) {
      const nextFigure = figures[nextIndex];
      const row = Math.floor(nextIndex / cellCount);

      if (nextFigure || nextIndex < 0 || nextIndex > 63) {
        break;
      }
      moves.push(nextIndex);
      nextIndex += 7;
      const nextRow = Math.floor(nextIndex / cellCount);
      if (oneMove || row === nextRow) {
        break;
      }
    }
  }
  return moves;
}

const getKingMoves = (...args: [{ [key: number]: ChessFigureObject }, number]): Array<number> => {
  return [
    ...getBishopMoves(...args, true),
    ...getRookMoves(...args, true),
  ]
}

const getQueenMoves = (...args: [{ [key: number]: ChessFigureObject }, number]): Array<number> => {
  return [
    ...getBishopMoves(...args),
    ...getRookMoves(...args),
  ];
}

export const GameProvider = ({
  children,
}: {
  children?: React.ReactChild;
}) => {
  const [gameState, dispatch] = useReducer(gameReducer, defaultValue);

  const value = useMemo(() => {
    return {
      ...gameState,
      dispatch,
    }
  }, [gameState]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
