export type WorktimeInput = {
    userId: string | null;
    startDate: string | null;
    finishDate: string | null;
    lastEditorId: string | null;
}

export type WorktimeRecord = {
    id: string,
    userId: string,
    startDate: string,
    finishDate: string,
    isAutoCreated: boolean,
    lastEditor: string,
}
