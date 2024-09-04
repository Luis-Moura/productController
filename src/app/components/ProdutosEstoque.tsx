import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getDatabase } from "@/src/database/database";

export interface Product {
    id: number;
    descricao: string;
    quantidade: number;
}

interface ProdutosEstoqueProps {
    products: Product[];
    removeProduct: (id: number) => Promise<void>;
    updateProductAdd: (id: number) => Promise<void>;
    updateProductRemove: (id: number) => Promise<void>;
}

export default function ProdutosEstoque({
    products,
    removeProduct,
    updateProductAdd,
    updateProductRemove,
}: ProdutosEstoqueProps) {
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
                                onPress={async () => {
                                    await updateProductAdd(product.id);
                                }}
                            >
                                <Ionicons
                                    style={styles.icons}
                                    name="add-circle"
                                />
                            </Pressable>
                            <Pressable
                                onPress={async () => {
                                    if (product.quantidade > 1) {
                                        await updateProductRemove(product.id);
                                    } else {
                                        await removeProduct(product.id);
                                    }
                                }}
                            >
                                <Ionicons
                                    style={styles.icons}
                                    name="remove-circle"
                                />
                            </Pressable>
                        </View>
                    </View>
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
        elevation: 7, // Adiciona sombra para efeito de profundidade em Android
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
        fontWeight: "500",
    },
    icons: {
        color: "#47204A",
        fontSize: 35,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
