export type GameActionTypes =
  | { type: 'start' }
  | { type: 'stop' }

export interface GameState {
  status: boolean,
}