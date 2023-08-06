export type WorktimeInput = {
    id?: string;
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
    lastEditor: string,
}

export type FilterType = {
    userId: string;
    year: number;
    month: number;
}

export type WorktimeStats = {
    totalWorkTimeMonthly: number;
    plannedWorkTimeMonthly: number;
}
