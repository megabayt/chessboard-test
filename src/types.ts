export type ChessFigureType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
export type ChessColor = 'white' | 'black';
export interface ChessFigureImageProps {
  color: ChessColor;
}
export interface ChessFigureObject extends ChessFigureImageProps {
  id: number;
  type: ChessFigureType;
}
export type ChessFiguresMap = {
  [key: number]: ChessFigureObject;
}
