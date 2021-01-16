// Defined data type for entry of diary

export interface Entry {
    id?: string;
    title: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
    diaryId?: string;
  }