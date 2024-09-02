import React from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Product {
    id: number;
    descricao: string;
    quantidade: number;
    preco: number;
}

export default function ProdutosEstoque({ products }: { products: Product[] }) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {products.map((product) => (
                <View key={product.id} style={styles.containerProduct}>
                    <View style={styles.contentProduct}>
                        <Text style={styles.productDescription}>
                            {product.quantidade} - {product.descricao}
                        </Text>
                        <View style={styles.iconContainer}>
                            <Pressable
                                onPress={() =>
                                    console.log("Adicionar produto", product.id)
                                }
                            >
                                <Ionicons
                                    style={styles.icons}
                                    name="add-circle"
                                />
                            </Pressable>
                            <Pressable
                                onPress={() =>
                                    console.log("Remover produto", product.id)
                                }
                            >
                                <Ionicons
                                    style={styles.icons}
                                    name="remove-circle"
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.separator} />
                    <Text style={styles.productPrice}>
                        Preço do produto: R${product.preco.toFixed(2)}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    containerProduct: {
        width: "93%",
        padding: 16,
        marginVertical: 15,
        backgroundColor: "white",
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // Adiciona sombra para efeito de profundidade em Android
    },
    contentProduct: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    productDescription: {
        color: "#47204A",
        fontSize: 26,
        fontWeight: "bold",
    },
    icons: {
        color: "#47204A",
        fontSize: 35,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 10,
    },
    productPrice: {
        fontSize: 20,
        color: "#47204A",
    },
});
