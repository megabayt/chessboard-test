import React, { useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import {
  boardHeight,
  boardWidth,
  cellHeight,
  cellWidth,
} from '../constants';
import { GameContext, moveFigureAction } from '../contexts/Game';
import { ChessPiece } from './ChessPiece';
export const ChessBoard = () => {
  const {
    cells,
    figures,
    selectedFigureIndex,
    dispatch,
  } = useContext(GameContext);

  const handleClickCell = useCallback((index) => () => {
    dispatch(moveFigureAction(index));
  }, [dispatch]);

  return (
    <>
      <Text>{selectedFigureIndex}</Text>
      <Wrapper>
        {cells.map((cellColor, index) => (
          <TouchableOpacity
            disabled={!selectedFigureIndex}
            onPress={handleClickCell(index)}
            key={index}
          >
            <Cell color={cellColor}>
            </Cell>
          </TouchableOpacity>
        ))}
        {figures.map((figure, index) => (
          <ChessPiece {...figure} key={index} />
        ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled(View)`
  width: ${boardWidth}px;
  height: ${boardHeight}px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
`;
const Cell = styled(View)`
  width: ${cellWidth}px;
  height: ${cellHeight}px;
  
  border-width: 1px;
  background-color: ${(props) => props.color};
`;
