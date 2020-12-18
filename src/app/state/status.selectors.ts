import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {AppState} from '../app.reducer';

export interface StatusState {
    message: string;
}

export const selectStatusState = createFeatureSelector<StatusState>('status');

export const selectStatusMessage: MemoizedSelector<AppState, string> = createSelector(
    selectStatusState,
    (state: StatusState) => state.message
);
