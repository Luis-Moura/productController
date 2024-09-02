import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import ProdutosEstoque from "../components/ProdutosEstoque";

export interface product {
    id: number;
    quantidade: number;
    descricao: string;
    preco: number;
}

export function Estoque() {
    const [products, setProducts] = useState<product[]>([
        { id: 1, quantidade: 10, descricao: "polpa de acerola", preco: 6 },
        { id: 2, quantidade: 10, descricao: "polpa de acerola", preco: 6 },
        { id: 3, quantidade: 10, descricao: "polpa de acerola", preco: 6 },
        { id: 4, quantidade: 10, descricao: "polpa de acerola", preco: 6 },
        { id: 5, quantidade: 10, descricao: "polpa de acerola", preco: 6 },
        { id: 6, quantidade: 10, descricao: "polpa de acerola", preco: 6 },
        { id: 7, quantidade: 10, descricao: "polpa de acerola", preco: 6 },
        { id: 8, quantidade: 10, descricao: "polpa de acerola", preco: 6 },
        { id: 9, quantidade: 11, descricao: "polpa de acerola", preco: 6 },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.inputArea}>
                <TextInput
                    placeholderTextColor={"#FFF"}
                    placeholder="Digite o novo produto"
                    style={styles.textInput}
                />
                <Pressable style={styles.button}>
                    <Text style={styles.textButton}>ADD</Text>
                </Pressable>
            </View>

            <View style={styles.productsArea}>
                <ProdutosEstoque products={products} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#F5F5F5", // Adicionado para visualização
    },
    inputArea: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
        flexDirection: "row",
    },
    textInput: {
        width: "70%",
        backgroundColor: "#47204A",
        color: "#FFF",
        padding: 12,
        borderRadius: 14,
        fontSize: 20,
    },
    button: {
        backgroundColor: "#47204A",
        padding: 15,
        borderRadius: 14,
        marginLeft: 10,
    },
    textButton: {
        color: "#FFF",
        fontSize: 20,
    },
    productsArea: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
