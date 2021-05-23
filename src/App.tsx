import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { ChessBoard } from './components/ChessBoard';
import { GameProvider } from './contexts/Game';

export default function App() {
  return (
    <GameProvider>
      <Wrapper>
        <ChessBoard />
      </Wrapper>
    </GameProvider>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
