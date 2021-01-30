export enum ModificationKind {
    'Add' = 'Add', 'Update' = 'Update', 'Delete' = 'Delete'
}

export interface LogEntryModification {
    kind: ModificationKind;
    data?: string;
}
