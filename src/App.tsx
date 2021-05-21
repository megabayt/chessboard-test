import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ChessBoard } from './components/ChessBoard';
import { GameProvider } from './contexts/Game';

export default function App() {
  return (
    <GameProvider>
      <View style={styles.container}>
        <ChessBoard />
      </View>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
