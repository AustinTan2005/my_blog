// Chapter type
export interface Chapter {
    chapter: number;
    title: string;
    date: string;
}

// Book chapters record
export const bookChapters: Record<string, Chapter[]> = {
    "1": [
        {chapter: 1, title: "Darkness and Light", date: "20/6/2025"},
        {chapter: 2, title: "Where it all begins", date: "21/6/2025"},
    ],
    "2": [
        {chapter: 1, title: "Rise Again", date: "25/6/2025"},
    ],
};