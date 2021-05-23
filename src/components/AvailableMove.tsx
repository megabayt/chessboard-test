import React, { useCallback, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { cellHeight, cellWidth } from '../constants';
import { GameContext, moveFigureAction } from '../contexts/Game';
import { getTopLeftFromIndex } from '../helpers';

export const AvailableMove = ({
  index,
}: {
  index: number;
}) => {
  // Get absolute position for available cell from index
  const { top, left } = getTopLeftFromIndex(index);

  const {
    dispatch,
    figures,
  } = useContext(GameContext);

  const handleClickCell = useCallback((index) => () => {
    // TODO: check enemy and eat
    // if (figures[index]) {
    // dispatch(eatEnemy(index));
    // }

    // Move figure to available cell
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

interface WrapperProps {
  top: number;
  left: number;
}
const Wrapper = styled(TouchableOpacity)`
  position: absolute;
  width: ${cellWidth}px;
  height: ${cellHeight}px;
  top: ${(props: WrapperProps) => props.top}px;
  left: ${(props: WrapperProps) => props.left}px;
`;
const Circle = styled(View)`
  position: absolute;
  width: ${circleWidth}px;
  height: ${circleHeight}px;
  top: ${((cellHeight - circleHeight) / 2)}px;
  left: ${((cellWidth - circleWidth) / 2)}px;
  border-radius: ${circleHeight / 2}px;
  background: #607A8C;
  z-index: 1;
`;
