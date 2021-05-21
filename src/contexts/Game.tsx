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

const figures: Array<ChessFigureObject> = [];
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
    figures.push({
      type,
      color,
      stroke,
      index: totalIndex,
    });
  }
});

type GameAction = ReturnType<typeof chooseFigureAction | typeof moveFigureAction>;
interface GameState {
  cells: Array<ChessColor>;
  figures: Array<ChessFigureObject>;
  selectedFigureIndex: number | null;
  dispatch: Dispatch<GameAction>;
}

const defaultValue: GameState = {
  cells,
  figures,
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

const gameReducer: Reducer<GameState, GameAction> = (state, action) => {
  switch (action.type) {
    case 'CHOOSE_FIGURE':
      return { ...state, selectedFigureIndex: action.payload };
    case 'MOVE_FIGURE':
      return {
        ...state,
        selectedFigureIndex: null,
        figures: state.figures.map(item => {
          if (item.index !== state.selectedFigureIndex) {
            return item;
          }
          return {
            ...item,
            index: action.payload,
            stroke: state.cells[action.payload] === 'white' ? 'black' : 'white',
          };
        }),
      };
    default:
      return state;
  }
};

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
