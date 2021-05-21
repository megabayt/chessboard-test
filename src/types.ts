export type ChessFigureType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
export type ChessColor = 'white' | 'black';
export interface ChessFigureImageProps {
  color: ChessColor;
  stroke: ChessColor;
}
export interface ChessFigureObject extends ChessFigureImageProps {
  index: number;
  type: ChessFigureType;
}