import React, { createContext, useContext, useState, useEffect } from "react";
import {
    getTransacoes,
    addTransacoes,
    createTable,
    removeTransacoes,
} from "@/src/database/transacoes/queries";
import { Transacao } from "@/src/models/Transacao";
import { TransacoesContextProps } from "@/src/models/TransacoesContextProps";

const TransacoesContext = createContext<TransacoesContextProps | undefined>(
    undefined,
);

export const useTransacoes = () => {
    const context = useContext(TransacoesContext);
    if (!context) {
        throw new Error(
            "useTransacoes must be used within a TransacoesProvider",
        );
    }
    return context;
};

export const TransacoesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    useEffect(() => {
        const setup = async () => {
            await createTable();
            const data = await getTransacoes();
            setTransacoes(data);
        };
        setup();
    }, []);

    const addNovaTransacao = async (
        tipo: string,
        descricao: string,
        valor: number,
    ) => {
        try {
            const statement = await addTransacoes();

            await statement.executeAsync({
                $tipo: tipo,
                $descricao: descricao,
                $valor: valor,
            });

            await statement.finalizeAsync();

            const updatedTransacoes = await getTransacoes();

            setTransacoes(updatedTransacoes);
        } catch (error) {
            console.error("Erro ao adicionar transação:", error);
        }
    };

    const deleteTransacao = async (id: number) => {
        try {
            const statement = await removeTransacoes();

            statement.executeAsync({
                $id: id,
            });

            await statement.finalizeAsync()

            const updatedTransacoes = await getTransacoes();

            setTransacoes(updatedTransacoes);
        } catch (error) {
            console.error("Erro ao remover transação:", error);
        }
    };

    return (
        <TransacoesContext.Provider value={{ transacoes, addNovaTransacao, deleteTransacao }}>
            {children}
        </TransacoesContext.Provider>
    );
};
