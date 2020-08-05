export type GameActionTypes =
  | { type: 'start' }
  | { type: 'stop' }
  | { type: 'decreaseDelayCount' };

export interface GameState {
  status: boolean;
  isFirstGame: boolean;
  delay: {
    status: boolean;
    count: number;
  };
}
