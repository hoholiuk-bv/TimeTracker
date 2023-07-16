export type WorktimeInput = {
    userId: string | null;
    startDate: string | null;
    finishDate: string | null;
    isAutoCreated: boolean | null;
    lastEditorId: string | null;
}

export type Worktime = {
    id: string;
    userId: string;
    startDate: string;
    finishDate: string;
    isAutoCreated: boolean;
    lastEditorId: string;
}