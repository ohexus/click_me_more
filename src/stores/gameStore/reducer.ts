import { createContext } from 'react';
import { GameActionTypes, GameState } from './types';

export const initialGameState: GameState = {
  status: false,
  isFirstGame: true,
  delay: {
    status: false,
    count: 0,
  },
};

export const gameReducer = (state: GameState, action: GameActionTypes) => {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        delay: {
          status: true,
          count: 3,
        },
      } as GameState;

    case 'stop':
      return {
        ...state,
        status: false,
        delay: {
          status: false,
          count: 0,
        },
      } as GameState;

    case 'decreaseDelayCount':
      const newDelayValue = state.delay.count - 1;

      return {
        status: newDelayValue < 0,
        isFirstGame: false,
        delay: {
          status: newDelayValue >= 0,
          count: newDelayValue >= -1 ? newDelayValue : -1,
        },
      } as GameState;

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
