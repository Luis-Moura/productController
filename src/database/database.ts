import * as SQLite from "expo-sqlite";

export const getDatabase = async () => {
    return await SQLite.openDatabaseAsync("controle.db");
};
