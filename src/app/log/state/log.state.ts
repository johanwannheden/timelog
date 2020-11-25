import {LogEntryState} from './log-entry.state';

export interface LogState {
    logEntries: { [id: string]: LogEntryState };
}
