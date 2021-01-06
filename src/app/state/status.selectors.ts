import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as moment from 'moment';

export interface StatusState {
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
