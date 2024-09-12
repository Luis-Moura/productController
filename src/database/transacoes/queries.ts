import { getDatabase } from "../database";
import { Transacao } from "@/src/models/Transacao";

export const createTable = async () => {
    const database = await getDatabase();

    await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS transacoes (
        id INTEGER PRIMARY KEY NOT NULL, 
        tipo VARCHAR(10) NOT NULL, 
        descricao TEXT NOT NULL,
        valor INTEGER NOT NULL);
    `);
};

export const getTransacoes = async () => {
    const database = await getDatabase();

    return await database.getAllAsync<Transacao>("SELECT * FROM transacoes");
};

export const addTransacoes = async () => {
    const database = await getDatabase();

    const statement = await database.prepareAsync(
        "INSERT INTO transacoes (tipo, descricao, valor) VALUES ($tipo, $descricao, $valor)",
    );

    return statement;
};

export const removeTransacoes = async () => {
    const database = await getDatabase();

    const statement = await database.prepareAsync(
        "DELETE FROM transacoes WHERE id = $id",
    );

    return statement;
};
