// Imports
// Mirage imports
import { Response, Request } from "miragejs";
// Server imports
import { handleErrors } from "../server";
// Imterfaces Imports
import { User } from "../../../interfaces/user.interface";
import { Diary } from "../../../interfaces/diary.interface";
import { Entry } from "../../../interfaces/entry.interface";
// dayjs imports
import dayjs from "dayjs";

// Create Diary function
export const create = (schema: any, req: Request): { user: User; diary: Diary } | Response => {
    // Try to create diary
    try {
        // Diary entries
        const { title, type, userId } = JSON.parse(req.requestBody) as Partial<Diary>;
        // check for user in the data base and handle error if no user exist
        const exUser = schema.users.findBy({ id: userId });
        if (!exUser) {
            return handleErrors(null, "No such user exists.");
        }
        // Curretn time and dat
        const now = dayjs().format();
        // create diary based on current user login
        const diary = exUser.createDiary({
            title,
            type,
            createdAt: now,
            updatedAt: now,
        });
        // Function returns
        return {
            user: {
                ...exUser.attrs,
            },
            diary: diary.attrs,
        };
        // catch error while creating diary
    } catch (error) {
        return handleErrors(error, "Failed to create Diary.");
    }
};

// Function to update existig diary
export const updateDiary = (schema: any, req: Request): Diary | Response => {
    // try updating diary
    try {
        //  find diary from existing diaries
        const diary = schema.diaries.find(req.params.id);
        // Data from body
        const data = JSON.parse(req.requestBody) as Partial<Diary>;
        // Current tiem and dat
        const now = dayjs().format();
        // update diary
        diary.update({
            ...data,
            updatedAt: now,
        });
        // return for updating diary
        return diary.attrs as Diary;
        // Cath error
    } catch (error) {
        return handleErrors(error, "Failed to update Diary.");
    }
};

// Function to get diaries in the app
export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
    // try and catch meyhod
    try {
        // user based on login
        const user = schema.users.find(req.params.id);
        // return diary based on user
        return user.diary as Diary[];
    } catch (error) {
        return handleErrors(error, "Could not get user diaries.");
    }
};

// Functionn to add new entry
export const addEntry = (schema: any, req: Request): { diary: Diary; entry: Entry } | Response => {
    // try and catch method
    try {
        // get diary based on user
        const diary = schema.diaries.find(req.params.id);
        // get content from user entry
        const { title, content } = JSON.parse(req.requestBody) as Partial<Entry>;
        // Current time and data
        const now = dayjs().format();
        // content of an entry to be added
        const entry = diary.createEntry({
            title,
            content,
            createdAt: now,
            updatedAt: now,
        });
        // update diary in the database
        diary.update({
            ...diary.attrs,
            updatedAt: now,
        });
        // function return
        return {
            diary: diary.attrs,
            entry: entry.attrs,
        };
    } catch (error) {
        return handleErrors(error, "Failed to save entry.");
    }
};

// function to update entry
export const updateEntry = (schema: any, req: Request): Entry | Response => {
    try {
        // entry from datbase based on id
        const entry = schema.entries.find(req.params.id);
        // data from body of the form from user
        const data = JSON.parse(req.requestBody) as Partial<Entry>;
        const now = dayjs().format();
        // update entry data
        entry.update({
            ...data,
            updatedAt: now,
        });
        return entry.attrs as Entry;
    } catch (error) {
        return handleErrors(error, "Failed to update entry.");
    }
};

// Get entries in the app
export const getEntries = (schema: any, req: Request): { entries: Entry[] } | Response => {
    try {
        const diary = schema.diaries.find(req.params.id);
        return diary.entry;
    } catch (error) {
        return handleErrors(error, "Failed to get Diary entries.");
    }
};