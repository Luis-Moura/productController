import { Transacao } from "./Transacao";

export interface TransacoesContextProps {
    transacoes: Transacao[];
    addNovaTransacao: (
        tipo: string,
        descricao: string,
        valor: number,
    ) => Promise<void>;

    deleteTransacao: (id: number) => Promise<void>;
}
