export type TimerActionTypes =
  | { type: 'increaseTotal' }
  | { type: 'decreaseTotal' }
  | { type: 'setTotal'; count: number }
  | { type: 'increaseCurrent' }
  | { type: 'decreaseCurrent' }
  | { type: 'setCurrent'; count: number }
  | { type: 'increaseAll' }
  | { type: 'decreaseAll' }
  | { type: 'setAll'; count: number };

export interface TimerState {
  total: number;
  current: number;
}
