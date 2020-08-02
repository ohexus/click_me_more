import { createContext } from 'react';
import { TimerActionTypes, TimerState } from './types';

export const initialTimerState: TimerState = {
  total: 10,
  current: 10,
};

export const timerReducer = (state: TimerState, action: TimerActionTypes) => {
  switch (action.type) {
    case 'increaseTotal':
      return { ...state, total: state.total + 1 };
    case 'decreaseTotal':
      return { ...state, total: state.total - 1 };
    case 'setTotal':
      return { ...state, total: action.count };
    case 'increaseCurrent':
      return { ...state, current: state.current + 1 };
    case 'decreaseCurrent':
      return { ...state, current: state.current - 1 };
    case 'setCurrent':
      return { ...state, current: action.count };
    case 'increaseAll':
      return { total: state.total + 1, current: state.total + 1 };
    case 'decreaseAll':
      return { total: state.total - 1, current: state.total - 1 };
    case 'setAll':
      return { total: action.count, current: action.count };
    default:
      throw new Error('Unexpected action');
  }
};

export const TimerContext = createContext<{
  timerState: typeof initialTimerState;
  dispatchTimer: (action: TimerActionTypes) => void;
}>({
  timerState: initialTimerState,
  dispatchTimer: () => {},
});
