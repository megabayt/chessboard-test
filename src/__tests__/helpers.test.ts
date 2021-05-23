import { add, getCellColor, getIndexFromRowColumn, getPawnMoves, getRowColumnFromIndex, getTopLeftFromIndex, sub } from "../helpers";
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

// Get available moves for selected figure

// getPawnMoves
describe('Pawn available moves', () => {
  it("should go forward for two steps if it's first turn", () => {
    expect(
      getPawnMoves(
        {
          8: {

          }
        } as ChessFiguresMap,
        10,
      )
    ).toBe([10, 20]);
  });
});

// getRookMoves

// getKnightMoves

// getBishopMoves

// getKingMoves

// getQueenMoves
