import { View, StyleSheet, Pressable, Text, Alert } from "react-native";
import { useState } from "react";
import { Transacao } from "@/src/models/Transacao";
import { useTransacoes } from "../context/TransacoesContext";

interface TransacoesProps {
    transacoes: Transacao[];
}

export default function TransacoesList({ transacoes }: TransacoesProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleToggleDescription = (id: number) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
    };

    const { deleteTransacao } = useTransacoes();

    return (
        <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
            {transacoes.map((transacao: Transacao) => (
                <View key={transacao.id} style={styles.container}>
                    <View style={styles.mainContent}>
                        <Text style={styles.textMainContent}>
                            {transacao.tipo} - {transacao.valor} R$
                        </Text>

                        <Pressable
                            style={styles.buttonMainContent}
                            onPress={async () => {
                                const alert = Alert.alert(
                                    "Remover Produto",
                                    "Tem certeza que deseja remover esse produto?",
                                    [
                                        {
                                            text: "Cancelar",
                                            style: "cancel",
                                        },
                                        {
                                            text: "OK",
                                            onPress: async () => {
                                                await deleteTransacao(
                                                    transacao.id,
                                                );
                                            },
                                        },
                                    ],
                                );
                                
                            }}
                        >
                            <Text style={styles.textMainContent}>Remover</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        style={styles.buttonMore}
                        onPress={() => handleToggleDescription(transacao.id)}
                    >
                        {expandedId === transacao.id ? (
                            <View style={styles.contentDescricao}>
                                <Text style={styles.textDescricao}>
                                    {transacao.descricao}
                                </Text>
                            </View>
                        ) : (
                            ""
                        )}
                        <Text style={styles.textMore}>
                            {expandedId === transacao.id
                                ? "Mostrar menos"
                                : "Mostrar mais"}
                        </Text>
                    </Pressable>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        alignItems: "center",
    },

    scrollStyle: {
        flex: 1,
        alignItems: "center",
    },

    mainContent: {
        backgroundColor: "black",
        marginTop: 35,
        width: "95%",
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },

    textMainContent: {
        color: "white",
        fontSize: 20,
        marginLeft: 5,
    },

    buttonMainContent: {
        backgroundColor: "#47204A",
        padding: 10,
        borderRadius: 8,
    },

    buttonMore: {
        width: "95%",
        backgroundColor: "#FFF",
        padding: 10,
        alignItems: "center",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },

    textMore: {
        fontSize: 20,
    },

    contentDescricao: {
        width: "100%",
    },

    textDescricao: {
        fontSize: 22,
        color: "#47204A",
        marginBottom: 20,
        textDecorationLine: "underline",
    },
});
