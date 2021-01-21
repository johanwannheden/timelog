import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as moment from 'moment';

export interface StatusState {
    userId?: string;
    message?: string;
    year?: number;
    month?: number;
    loading: boolean;
}

export const selectStatusState = createFeatureSelector<StatusState>('status');

export const selectStatusMessage = createSelector(
    selectStatusState,
    (state: StatusState) => state.message
);

export const selectSelectedMonth = createSelector(
    selectStatusState,
    (state: StatusState) => ({
        year: state.year || moment().year(),
        month: state.month || moment().month()
    })
);

export const selectCurrentUserId = createSelector(
    selectStatusState,
    (state) => {
        return state.userId;
    }
);
