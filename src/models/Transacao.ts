export interface Transacao {
    id: number;
    tipo: "entrada" | "saida";
    descricao: string;
    valor: number;
}
