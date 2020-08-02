import { createContext } from 'react';
import { ClicksCountActionTypes, ClicksCountState } from './types';

export const initialClicksCountState: ClicksCountState = {
  count: 0,
};

export const clicksCountReducer = (
  state: ClicksCountState,
  action: ClicksCountActionTypes
) => {
  switch (action.type) {
    case 'increase':
      return { count: state.count + 1 };
    case 'decrease':
      return { count: state.count - 1 };
    case 'set':
      return { count: action.count };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('Unexpected action');
  }
};

export const ClicksCountContext = createContext<{
  clicksCountState: typeof initialClicksCountState;
  dispatchClicksCount: (action: ClicksCountActionTypes) => void;
}>({
  clicksCountState: initialClicksCountState,
  dispatchClicksCount: () => {},
});
