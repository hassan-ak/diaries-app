// Imports
// Mirage Imports
import { Server, Model, Factory, Response, belongsTo, hasMany } from "miragejs";
// Functions inports for routing
import user from "./routes/user";
import * as diary from './routes/diary';

// Function to catch error in case of Error Response
export const handleErrors = (error: any, message = "An error ocurred") => {
    return new Response(400, undefined, {
        data: {
            message,
            isError: true,
        },
    });
};

// Setup Mock server to use data in the app
export const setupServer = (env?: string): Server => {
    return new Server({
        environment: env ?? "production",

        // models to define properties of different data to be stored in the database on mock server
        // .extend() adds different properties to the perticular data. while many/belongs relations are defined here
        models: {
            entry: Model.extend({
                diary: belongsTo(),
            }),
            diary: Model.extend({
                entry: hasMany(),
                user: belongsTo(),
            }),
            user: Model.extend({
                diary: hasMany(),
            }),
        },

        // Create blueprint of the user data to be stored factoreis is used yo do so
        factories: {
            user: Factory.extend({
                username: "test",
                password: "password",
                email: "test@email.com",
            }),
        },

        // seeding data with the mirage server
        seeds: (server): any => {
            server.create("user");
        },

        // Handle request here urlPrefix is dummy Api
        routes(): void {
            // Base Url
            this.urlPrefix = "https://diaries.app";

            // Url for signup and login
            this.post("/auth/login", user.login);
            this.post("/auth/signup", user.signup);

            // Url to get diaries and entries
            this.get('/diaries/:id', diary.getDiaries);
            this.get('/diaries/entries/:id', diary.getEntries);

            // Url to create diaries and entries
            this.post('/diaries/', diary.create);
            this.post('/diaries/entry/:id', diary.addEntry);

            // Url to update diaries and entries
            this.put('/diaries/:id', diary.updateDiary);
            this.put('/diaries/entry/:id', diary.updateEntry);
        },
    });
};