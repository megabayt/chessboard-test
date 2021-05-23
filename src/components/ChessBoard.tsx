import React, { useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import {
  boardHeight,
  boardWidth,
  cellHeight,
  cellWidth,
} from '../constants';
import { GameContext, resetFigureAction } from '../contexts/Game';
import { ChessPiece } from './ChessPiece';
import { AvailableMove } from './AvailableMove';

export const ChessBoard = () => {
  const {
    cells,
    figures,
    availableMoves,
    selectedFigureIndex,
    dispatch,
  } = useContext(GameContext);

  const handleClickCell = useCallback(() => {
    dispatch(resetFigureAction());
  }, [dispatch]);

  return (
    <>
      <Text>{selectedFigureIndex}</Text>
      <Wrapper>
        {cells.map((cellColor, index) => (
          <TouchableOpacity
            disabled={!selectedFigureIndex}
            onPress={handleClickCell}
            key={index}
          >
            <Cell color={cellColor}>
            </Cell>
          </TouchableOpacity>
        ))}
        {Object.keys(figures).map((index) => figures[index] && (
          <ChessPiece {...figures[index]} index={Number(index)} key={figures[index].id} />
        ))}
        {availableMoves.map((availableMove) => (
          <AvailableMove index={availableMove} key={availableMove} />
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
