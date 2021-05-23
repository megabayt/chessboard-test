import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import { cellHeight, cellWidth } from '../constants';
import { chooseFigureAction, GameContext } from '../contexts/Game';
import { getTopLeftFromIndex } from '../helpers';
import { ChessFigureObject } from '../types';
import { BishopImage } from './BishopImage';
import { KingImage } from './KingImage';
import { KnightImage } from './KnightImage';
import { QueenImage } from './QueenImage';
import { RookImage } from './RookImage';
import { PawnImage } from './PawnImage';

export const ChessPiece = ({
  type,
  color,
  index: figureIndex,
}: ChessFigureObject & { index: number }) => {
  // Init animation values
  let top = useRef(new Animated.Value(0)).current;
  let left = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // If figure index changed
    // Calculate new position
    const { top: _top, left: _left } = getTopLeftFromIndex(figureIndex);

    // Start animation
    Animated.timing(
      top,
      {
        useNativeDriver: false,
        toValue: _top,
        duration: 500,
      }
    ).start(() => {
      top = new Animated.Value(_top);
    });
    Animated.timing(
      left,
      {
        useNativeDriver: false,
        toValue: _left,
        duration: 500,
      }
    ).start(() => {
      left = new Animated.Value(_left);
    });
  }, [figureIndex]);

  const {
    // Get selected figure from context
    dispatch,
    selectedFigureIndex,
  } = useContext(GameContext);

  const handleClickFigure = useCallback(() => {
    // Store figureIndex as selected figure
    dispatch(chooseFigureAction(figureIndex));
  }, [dispatch, figureIndex]);

  const Figure = useMemo(() => {
    // use different component for different figure type
    switch (type) {
      case 'knight':
        return KnightImage;
      case 'bishop':
        return BishopImage;
      case 'rook':
        return RookImage;
      case 'queen':
        return QueenImage;
      case 'king':
        return KingImage;
      default:
      case 'pawn':
        return PawnImage;
    }
  }, [type]);

  return (
    <Wrapper
      // Change background for selected figure
      selected={figureIndex === selectedFigureIndex}
      style={{
        // Animation values
        top,
        left,
      }}
    >
      <TouchableOpacity onPress={handleClickFigure}>
        <Figure color={color} />
      </TouchableOpacity>
    </Wrapper>
  );
};

interface WrapperProps {
  selected?: boolean;
}
const Wrapper = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: ${cellWidth}px;
  height: ${cellHeight}px;
  backgroundColor: ${(props: WrapperProps) => props.selected ? '#607A8C' : 'transparent'};
`;