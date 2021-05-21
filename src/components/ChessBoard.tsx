import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import {
  boardHeight,
  boardWidth,
  cellCount,
  cellHeight,
  cellWidth,
  totalCellsCount,
} from '../constants';
import { ChessColor, ChessFigureType } from '../types';
import { ChessPiece } from './ChessPiece';


interface CellObject {
  color: ChessColor;
  figure?: ChessFigureType;
  figureColor?: ChessColor;
  figureStroke?: ChessColor;
}

const cells: Array<CellObject> = [...new Array(totalCellsCount)].map((_, totalIndex) => {
  const row = Math.floor(totalIndex / cellCount);
  const index = totalIndex % cellCount;

  const cellObj: CellObject = {
    color: 'white'
  };

  if (row % 2 === 0) {
    cellObj.color = index % 2 === 0 ? 'white' : 'black';
  } else {
    cellObj.color = index % 2 === 0 ? 'black' : 'white';
  }

  if (row === 1 || row === 6) {
    cellObj.figure = 'pawn';
  }
  if (row === 0 || row === 7) {
    if (index === 0 || index === 7) {
      cellObj.figure = 'rook';
    }
    if (index === 1 || index === 6) {
      cellObj.figure = 'knight';
    }
    if (index === 2 || index === 5) {
      cellObj.figure = 'bishop';
    }
    if (index === 3) {
      cellObj.figure = 'queen';
    }
    if (index === 4) {
      cellObj.figure = 'king';
    }
  }
  if (row === 0 || row === 1 || row === 6 || row === 7) {
    cellObj.figureColor = row === 0 || row === 1 ? 'black' : 'white';
    cellObj.figureStroke = cellObj.color === 'white' ? 'black' : 'white';
  }

  return cellObj;
});

export const ChessBoard = () => {
  return (
    <Wrapper>
      {cells.map((cell, index) => (
        <Cell color={cell.color} key={index}>
          {cell.figure ? (
            <ChessPiece
              type={cell.figure}
              color={cell.figureColor}
              stroke={cell.figureStroke}
            />
          ) : null}
        </Cell>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  width: ${boardWidth}px;
  height: ${boardHeight}px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
const Cell = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${cellWidth}px;
  height: ${cellHeight}px;
  
  border-width: 1px;
  background-color: ${(props) => props.color};
`;
