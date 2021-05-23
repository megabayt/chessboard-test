import {
  add,
  getBishopMoves,
  getCellColor,
  getIndexFromRowColumn,
  getKingMoves,
  getPawnMoves,
  getQueenMoves,
  getRookMoves,
  getRowColumnFromIndex,
  sub,
} from "../helpers";
import { ChessFiguresMap } from "../types";

test("function to get cell's color", () => {
  const data = [
    "white", "black", "white", "black", "white", "black", "white", "black",
    "black", "white", "black", "white", "black", "white", "black", "white",
    "white", "black", "white", "black", "white", "black", "white", "black",
    "black", "white", "black", "white", "black", "white", "black", "white",
    "white", "black", "white", "black", "white", "black", "white", "black",
    "black", "white", "black", "white", "black", "white", "black", "white",
    "white", "black", "white", "black", "white", "black", "white", "black",
    "black", "white", "black", "white", "black", "white", "black", "white"];
  data.forEach((color, index) => {
    expect(getCellColor(index)).toBe(color);
  });
});

describe("Calculate row and column from flat array's index", () => {
  it('should return right row and column for test data', () => {
    expect(getRowColumnFromIndex(10)).toEqual({ row: 1, column: 2 });
    expect(getRowColumnFromIndex(57)).toEqual({ row: 7, column: 1 });
    expect(getRowColumnFromIndex(45)).toEqual({ row: 5, column: 5 });
    expect(getRowColumnFromIndex(34)).toEqual({ row: 4, column: 2 });
  });
  it('should fail if invalid input', () => {
    expect(() => getRowColumnFromIndex(NaN)).toThrow();
    expect(() => getRowColumnFromIndex(-5)).toThrow();
    expect(() => getRowColumnFromIndex(999)).toThrow();
  })
});

describe("Calculate flat array's index from row and column", () => {
  it('should return right row and column for test data', () => {
    expect(getIndexFromRowColumn(1, 2)).toBe(10);
    expect(getIndexFromRowColumn(7, 1)).toBe(57);
    expect(getIndexFromRowColumn(5, 5)).toBe(45);
    expect(getIndexFromRowColumn(4, 2)).toBe(34);
  });
  it('should fail if invalid input', () => {
    expect(() => getIndexFromRowColumn(NaN, NaN)).toThrow();
    expect(() => getIndexFromRowColumn(5, NaN)).toThrow();
    expect(() => getIndexFromRowColumn(NaN, 5)).toThrow();
    expect(() => getIndexFromRowColumn(-5, 5)).toThrow();
    expect(() => getIndexFromRowColumn(-34, -46)).toThrow();
    expect(() => getIndexFromRowColumn(999, 999)).toThrow();
  })
});

test("addition", () => {
  for (let i = 0; i < 5; i++) {
    const a = Math.random() * 100;
    const b = Math.random() * 100;
    expect(add(a, b)).toBe(a + b);
  }
});

test("subtraction", () => {
  for (let i = 0; i < 5; i++) {
    const a = Math.random() * 100;
    const b = Math.random() * 100;
    expect(sub(a, b)).toBe(a - b);
  }
});

describe('Pawn available moves', () => {
  it("should go forward for two steps if it's first turn", () => {
    expect(
      getPawnMoves(
        {
          8: {
            type: 'pawn',
            color: 'black',
            id: 1,
          }
        } as ChessFiguresMap,
        8,
      )
    ).toEqual([16, 24]);
    expect(
      getPawnMoves(
        {
          49: {
            type: 'pawn',
            color: 'white',
            id: 1,
          }
        } as ChessFiguresMap,
        49,
      ).sort()
    ).toEqual([33, 41]);
  });
  it("should go forward only for one step if it isn't first turn", () => {
    expect(
      getPawnMoves(
        {
          16: {
            type: 'pawn',
            color: 'black',
            id: 1,
          }
        } as ChessFiguresMap,
        16,
      )
    ).toEqual([24]);
    expect(
      getPawnMoves(
        {
          41: {
            type: 'pawn',
            color: 'white',
            id: 1,
          }
        } as ChessFiguresMap,
        41,
      )
    ).toEqual([33]);

  });
});

describe('Rook available moves', () => {
  it('should go vertical and horizontal', () => {
    expect(
      getRookMoves(
        {
          36: {
            type: 'rook',
            color: 'black',
            id: 1,
          }
        } as ChessFiguresMap,
        36,
      ).sort(),
    ).toEqual([12, 20, 28, 32, 33, 34, 35, 37, 38, 39, 4, 44, 52, 60]);
  });
});

describe('Bishop available moves', () => {
  it('should go vertical and horizontal', () => {
    expect(
      getBishopMoves(
        {
          36: {
            type: 'bishop',
            color: 'black',
            id: 1,
          }
        } as ChessFiguresMap,
        36,
      ).sort(),
    ).toEqual([0, 15, 18, 22, 27, 29, 43, 45, 50, 54, 57, 63, 9]);
  });
});

describe('King available moves', () => {
  it('should go vertical and horizontal', () => {
    expect(
      getKingMoves(
        {
          36: {
            type: 'king',
            color: 'black',
            id: 1,
          }
        } as ChessFiguresMap,
        36,
      ).sort(),
    ).toEqual([27, 28, 29, 35, 37, 43, 44, 45]);
  });
});

describe('Queen available moves', () => {
  it('should go vertical and horizontal', () => {
    expect(
      getQueenMoves(
        {
          36: {
            type: 'queen',
            color: 'black',
            id: 1,
          }
        } as ChessFiguresMap,
        36,
      ).sort(),
    ).toEqual([0, 12, 15, 18, 20, 22, 27, 28, 29, 32, 33, 34, 35, 37, 38, 39, 4, 43, 44, 45, 50, 52, 54, 57, 60, 63, 9]);
  });
});

