import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTransacoes } from "@/src/app/context/TransacoesContext";
import TransacoesList from "../components/TransacoesList";

export function Relatorios() {
    const { transacoes } = useTransacoes();

    const saldo = transacoes.reduce((acc, transacao) => {
        return transacao.tipo === "entrada"
            ? acc + transacao.valor
            : acc - transacao.valor;
    }, 0);

    return (
        <View style={styles.container}>
            <View style={styles.saldoContainer}>
                <Text style={styles.saldoText}>Saldo: R$ {saldo} </Text>
            </View>
            <ScrollView style={{ width: "100%", flex: 1 }}>
                <TransacoesList transacoes={transacoes} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    saldoContainer: {
        width: "90%",
        backgroundColor: "#47204A",
        padding: 24,
        marginTop: 16,
        borderRadius: 16,
    },

    saldoText: {
        color: "#FFF",
        fontSize: 25,
    },
});
