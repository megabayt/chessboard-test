import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

const boardWidth = 160;
const boardHeight = boardWidth;
const cellCount = 8;
const cellWidth = boardWidth / cellCount;
const cellHeight = boardHeight / cellCount;
const totalCellsCount = cellCount * cellCount;
const cells = [...new Array(totalCellsCount)].map((_, index) => {
  const row = Math.floor(index / cellCount + 1);
  if (row % 2 === 0) {
    return index % 2 === 0 ? '#000' : '#fff';
  }
  return index % 2 === 0 ? '#fff' : '#000';
});

export const ChessBoard = () => (
  <Wrapper>
    {cells.map((color, index) => (
      <Cell color={color} key={index}>

      </Cell>
    ))}
  </Wrapper>
);

const Wrapper = styled(View)`
  width: ${boardWidth}px;
  height: ${boardHeight}px;
  display: flex;
  flex-wrap: wrap;
`;
const Cell = styled(View)`
  width: ${cellWidth}px;
  height: ${cellHeight}px;
  
  border-width: 1px;
  background-color: ${(props) => props.color};
`;
