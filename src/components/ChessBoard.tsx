import React, { useCallback, useContext } from 'react';
import { View, TouchableOpacity, ViewProps } from 'react-native';
import styled from 'styled-components';
import {
  boardHeight,
  boardWidth,
  cellHeight,
  cellWidth,
  totalCellsCount,
} from '../constants';
import { GameContext, resetFigureAction } from '../contexts/Game';
import { ChessPiece } from './ChessPiece';
import { AvailableMove } from './AvailableMove';
import { getCellColor } from '../helpers';
import { ChessColor } from '../types';

export const ChessBoard = () => {
  const {
    // Get everything from context
    figures,
    availableMoves,
    selectedFigureIndex,
    dispatch,
  } = useContext(GameContext);

  const handleClickCell = useCallback(() => {
    // If clicked on unavailable move - reset selected figure
    dispatch(resetFigureAction());
  }, [dispatch]);

  return (
    <Wrapper>
      {/* Render cells */}
      {cells.map((_, index) => (
        <TouchableOpacity
          disabled={!selectedFigureIndex}
          onPress={handleClickCell}
          key={index}
        >
          <Cell color={getCellColor(index)}>
          </Cell>
        </TouchableOpacity>
      ))}
      {/* Render figures */}
      {Object.keys(figures).map((key) => {
        const index = Number(key); // Cast key to number(typescript bug?)
        return (
          <ChessPiece {...figures[index]} index={Number(index)} key={figures[index].id} />
        );
      })}
      {/* Render available moves (if any) */}
      {availableMoves.map((availableMove) => (
        <AvailableMove index={availableMove} key={availableMove} />
      ))}
    </Wrapper>
  );
}

const cells = [...new Array(totalCellsCount)];

const Wrapper = styled(View)`
  width: ${boardWidth}px;
  height: ${boardHeight}px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
`;
interface CellProps {
  color?: ChessColor;
}
const Cell: React.FC<ViewProps & CellProps> = styled(View)`
  width: ${cellWidth}px;
  height: ${cellHeight}px;
  
  background-color: ${(props: CellProps) => props.color === 'white' ? '#daba91' : '#b87644'};
`;
