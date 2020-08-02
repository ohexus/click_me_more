export type ClicksCountActionTypes =
  | { type: 'increase' }
  | { type: 'decrease' }
  | { type: 'reset' }
  | { type: 'set'; count: number };

export interface ClicksCountState {
  count: number;
}
