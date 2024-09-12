import { Product } from "@/src//models/Product";
import { getDatabase } from "../database";

export const createTable = async () => {
    const database = await getDatabase();

    await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS estoque (
        id INTEGER PRIMARY KEY NOT NULL, 
        quantidade SMALLINT NOT NULL DEFAULT 0, 
        descricao varchar(100));
    `);
};

export const getProducts = async () => {
    const database = await getDatabase();

    return await database.getAllAsync<Product>("SELECT * FROM estoque");
};

export const addProductStatement = async () => {
    const database = await getDatabase();

    const statement = await database.prepareAsync(
        "INSERT INTO estoque (descricao, quantidade) VALUES ($descricao, 0)",
    );

    return statement;
};

export const deleteProductStatemente = async () => {
    const database = await getDatabase();

    const statement = await database.prepareAsync(
        "DELETE FROM estoque WHERE id = $id",
    );

    return statement;
};

export const updateProductAddStatement = async () => {
    const database = await getDatabase();

    const statement = await database.prepareAsync(
        "UPDATE estoque SET quantidade = quantidade + 1 WHERE id = $id",
    );

    return statement;
};

export const updateProductRemoveStatement = async () => {
    const database = await getDatabase();

    const statement = await database.prepareAsync(
        "UPDATE estoque SET quantidade = quantidade - 1 WHERE id = $id",
    );

    return statement;
};
