import { createAction, props } from '@ngrx/store';

export const search = createAction(
  '[Search] Query',
  props<{ query: string }>()
);
export const searchSuccess = createAction(
  '[Search] Success',
  props<{ query: string; results: any[] }>()
);
export const searchFailure = createAction(
  '[Search] Failure',
  props<{ error: string }>()
);
export const addPastQuery = createAction(
  '[Search] Save Past Query',
  props<{ query: string }>()
);

export const usePastQuery = createAction(
  '[Search] Use Past Query',
  props<{ query: string }>()
);
