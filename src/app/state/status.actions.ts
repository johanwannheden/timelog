import {createAction, props} from '@ngrx/store';

export const setInitialSelectedMonth = createAction(
    '[Status Effects] Set Initial Selected Month',
    props<{ year: number, month: number }>()
);

export const setCurrentUserId = createAction(
    '[Status Effects] Set Current User ID',
    props<{ data: string }>()
);
