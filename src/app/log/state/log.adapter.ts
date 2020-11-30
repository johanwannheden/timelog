import {LogEntry} from './log.entry';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export const logAdapter: EntityAdapter<LogEntry> = createEntityAdapter<LogEntry>({
    selectId: model => model.date
});
export interface LogEntryState extends EntityState<LogEntry> {
    ids: string[];
}
export const initialState = logAdapter.getInitialState();
