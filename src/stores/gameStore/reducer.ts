import { createContext } from 'react';
import { GameActionTypes, GameState } from './types';

export const initialGameState: GameState = {
  status: false,
};

export const gameReducer = (state: GameState, action: GameActionTypes) => {
  switch (action.type) {
    case 'start':
      return { status: true };
    case 'stop':
      return { status: false };
    default:
      throw new Error('Unexpected action');
  }
};

export const GameContext = createContext<{
  gameState: typeof initialGameState;
  dispatchGame: (action: GameActionTypes) => void;
}>({
  gameState: initialGameState,
  dispatchGame: () => {},
});
