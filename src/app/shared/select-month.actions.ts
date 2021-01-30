import {createAction, props} from '@ngrx/store';

export const setSelectedMonth = createAction('[Select Month Component] Set Selected Month', props<{ year: number, month: number }>());
