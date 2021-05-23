import React, { createContext, Dispatch, Reducer, useMemo, useReducer } from 'react';
import { totalCellsCount } from '../constants';
import { getAvailableMoves, getRowColumnFromIndex } from '../helpers';
import { ChessFiguresMap, ChessFigureType } from '../types';

// Create empty map where key is figure's position (index) 
// on board and value is figure object
export const initialFiguresMap: ChessFiguresMap = {};
// Id for React's mandatory key prop
let figureId = 1;
[...new Array(totalCellsCount)].forEach((_, index) => {
  const { row, column } = getRowColumnFromIndex(index);

  let type: ChessFigureType;

  // Fill up map with initial figures position
  if (row === 1 || row === 6) {
    type = 'pawn';
  } else if (row === 0 || row === 7) {
    if (column === 0 || column === 7) {
      type = 'rook';
    } else if (column === 1 || column === 6) {
      type = 'knight';
    } else if (column === 2 || column === 5) {
      type = 'bishop';
    } else if (column === 3) {
      type = 'queen';
    } else if (column === 4) {
      type = 'king';
    }
  }
  if (type) {
    initialFiguresMap[index] = {
      id: figureId++,
      type,
      // Get color from figure's row
      color: row === 0 || row === 1 ? 'black' : 'white',
    };
  }
});

export type GameAction = ReturnType<
  typeof chooseFigureAction
  | typeof moveFigureAction
  | typeof resetFigureAction
>;
export interface GameState {
  // Actual figures state (postion and color)
  figures: ChessFiguresMap;
  // Available moves for selected figure
  availableMoves: Array<number>;
  selectedFigureIndex: number | null;
  dispatch: Dispatch<GameAction>;
}

// Initial game state
const defaultValue: GameState = {
  figures: initialFiguresMap,
  availableMoves: [],
  selectedFigureIndex: null,
  dispatch: () => { },
}

export const GameContext = createContext<GameState>(defaultValue);

// Action to choose figure
export const chooseFigureAction = (index: number) => ({
  type: 'CHOOSE_FIGURE',
  payload: index,
});
// Action to move figure
export const moveFigureAction = (index: number) => ({
  type: 'MOVE_FIGURE',
  payload: index,
});
// Action to reset figure selection
export const resetFigureAction = () => ({
  type: 'RESET_FIGURE',
  payload: null as null,
});

// Reducer for all actions
export const gameReducer: Reducer<GameState, GameAction> = (state, action) => {
  switch (action.type) {
    case 'CHOOSE_FIGURE':
      return {
        ...state,
        // Set selected figure index
        selectedFigureIndex: action.payload,
        // And calculate available moves for it
        availableMoves: getAvailableMoves(state.figures, action.payload),
      };
    case 'MOVE_FIGURE':
      return {
        ...state,
        // Reset selected figure
        selectedFigureIndex: null,
        // And available moves
        availableMoves: [],
        figures: {
          // Cycle through all figures
          ...Object.keys(state.figures).reduce((acc, index) => {
            const key = Number(index); // Cast key to number(typescript bug?)
            // if current key is selected figureIndex
            if (key === state.selectedFigureIndex) {
              return {
                ...acc,
                // change it's position (change it's key)
                [action.payload]: {
                  ...state.figures[state.selectedFigureIndex],
                }
              };
            }
            // Other items stays same
            return {
              ...acc,
              [key]: state.figures[key],
            };
          }, {}),
        }
      };
    case 'RESET_FIGURE':
      // Just reset selected figure index and available moves
      return {
        ...state,
        selectedFigureIndex: null,
        availableMoves: [],
      }
    default:
      return state;
  }
};

// For convenience create GameProvider component
export const GameProvider = ({
  children,
}: {
  children?: React.ReactChild;
}) => {
  // set up reducer
  const [gameState, dispatch] = useReducer(gameReducer, defaultValue);

  const value = useMemo(() => {
    return {
      ...gameState,
      dispatch, // Pass dispatch to value to get it from context
    }
  }, [gameState]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
