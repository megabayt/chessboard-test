import { gameReducer, initialFiguresMap, GameState, GameAction } from "../Game";

describe('initial figures map', () => {
  test('check order', () => {
    expect(Object.values(initialFiguresMap).map(item => item.type))
      .toEqual([
        "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook",
        "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
        "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
        "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]);
  });
});

describe('gameReducer', () => {
  test('CHOOSE_FIGURE action', () => {
    const initialState: GameState = {
      figures: initialFiguresMap,
      availableMoves: [],
      selectedFigureIndex: null,
      dispatch: () => { },
    }
    const action = {
      type: 'CHOOSE_FIGURE',
      payload: 10,
    }
    const newState: GameState = {
      ...initialState,
      selectedFigureIndex: 10,
      availableMoves: [18, 26],
    }
    expect(gameReducer(initialState, action)).toEqual(newState);
  });
  test('MOVE_FIGURE action', () => {
    const initialState: GameState = {
      figures: initialFiguresMap,
      availableMoves: [18, 26],
      selectedFigureIndex: 10,
      dispatch: () => { },
    }
    const action = {
      type: 'MOVE_FIGURE',
      payload: 18,
    }
    const newState: GameState = {
      ...initialState,
      selectedFigureIndex: null,
      availableMoves: [],
    }
    newState.figures[18] = {
      ...newState.figures[10],
    }
    delete newState.figures[10];
    expect(gameReducer(initialState, action)).toEqual(newState);
  });
  test('RESET_FIGURE action', () => {
    const initialState: GameState = {
      figures: initialFiguresMap,
      availableMoves: [18, 26],
      selectedFigureIndex: 10,
      dispatch: () => { },
    }
    const action: GameAction = {
      type: 'RESET_FIGURE',
      payload: null,
    }
    const newState: GameState = {
      ...initialState,
      selectedFigureIndex: null,
      availableMoves: [],
    }
    expect(gameReducer(initialState, action)).toEqual(newState);
  });
});
