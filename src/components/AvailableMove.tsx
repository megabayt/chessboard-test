import React, { useCallback, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { cellCount, cellHeight, cellWidth } from '../constants';
import { GameContext, moveFigureAction } from '../contexts/Game';

export const AvailableMove = ({
  index,
}: {
  index: number;
}) => {
  const row = Math.floor(index / cellCount);
  const column = index % cellCount;

  const top = cellHeight * row;
  const left = cellWidth * column;

  const {
    dispatch,
    figures,
  } = useContext(GameContext);

  const handleClickCell = useCallback((index) => () => {
    // TODO: check enemy and eat
    // if (figures[index]) {
    // dispatch(eatEnemy(index));
    // }
    dispatch(moveFigureAction(index));
  }, [dispatch]);

  if (figures[index]) {
    // TODO: draw red cell around rival?
    return null;
  }

  return (
    <Wrapper
      onPress={handleClickCell(index)}
      key={index}
      top={top}
      left={left}
    >
      <Circle />
    </Wrapper>
  );
}

const circleWidth = 8;
const circleHeight = 8;

const Wrapper = styled(TouchableOpacity)`
  position: absolute;
  width: ${cellWidth}px;
  height: ${cellHeight}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;
const Circle = styled(View)`
  position: absolute;
  width: ${circleWidth}px;
  height: ${circleHeight}px;
  top: ${((cellHeight - circleHeight) / 2)}px;
  left: ${((cellWidth - circleWidth) / 2)}px;
  border-radius: ${circleHeight / 2}px;
  border: 1px solid green;
  background: green;
  z-index: 1;
`;
