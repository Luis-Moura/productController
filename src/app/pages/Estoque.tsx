import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Keyboard,
} from "react-native";
import ProdutosEstoque from "../components/ProdutosEstoque";
import * as SQLite from "expo-sqlite";
import { getDatabase } from "@/src/database/database";
import {
    addProductStatement,
    createTable,
    deleteProductStatemente,
    getProducts,
    updateProductAddStatement,
    updateProductRemoveStatement,
} from "@/src/database/estoque/queries";
import { Product } from "@/src/models/Product";

export function Estoque() {
    const [products, setProducts] = useState<Product[]>([]);
    const [descricao, setDescricao] = useState("");
    const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

    useEffect(() => {
        async function setup() {
            try {
                const database = await getDatabase();
                setDb(database);

                await createTable();
                console.log("Tabela criada");

                const data = await getProducts();

                if (data && data.length > 0) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("Erro ao configurar o banco de dados:", error);
            }
        }

        setup();
    }, []);

    const addProduct = async (descricao: string) => {
        if (!db) {
            console.error("Banco de dados não inicializado");
            return;
        }

        try {
            const statement = await addProductStatement();
            console.log("Declaração SQL preparada");

            await statement.executeAsync({ $descricao: descricao });
            console.log("Produto adicionado");

            const updateProducts = await getProducts();

            if (updateProducts && updateProducts.length > 0) {
                setProducts(updateProducts);
            }

            Keyboard.dismiss();
            setDescricao("");
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    };

    const removeProduct = async (id: number) => {
        if (!db) {
            console.error("Banco de dados não inicializado");
            return;
        }

        try {
            const statement = await deleteProductStatemente();

            await statement.executeAsync({ $id: id });
            await statement.finalizeAsync();

            const updateProducts = await getProducts();

            setProducts(updateProducts);
        } catch (error) {
            console.error("Erro ao remover produto:", error);
        }
    };

    const updateProductAdd = async (id: number) => {
        if (!db) {
            console.error("Banco de dados não inicializado");
            return;
        }

        try {
            const statement = await updateProductAddStatement();

            await statement.executeAsync({ $id: id });

            await statement.finalizeAsync();

            const updateProducts = await getProducts();

            setProducts(updateProducts);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    const updateProductRemove = async (id: number) => {
        if (!db) {
            console.error("Banco de dados não inicializado");
            return;
        }

        try {
            const statement = await updateProductRemoveStatement();

            await statement.executeAsync({ $id: id });

            await statement.finalizeAsync();

            const updateProducts = await getProducts();

            setProducts(updateProducts);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputArea}>
                <TextInput
                    placeholderTextColor={"#FFF"}
                    placeholder="Digite o novo produto"
                    style={styles.textInput}
                    onChangeText={(text) => setDescricao(text)}
                    value={descricao}
                />
                <Pressable
                    style={styles.button}
                    onPress={async () => {
                        try {
                            await addProduct(descricao);
                        } catch (error) {
                            console.log("Erro ao adicionar produto:", error);
                        }
                    }}
                >
                    <Text style={styles.textButton}>ADD</Text>
                </Pressable>
            </View>

            <View style={styles.productsArea}>
                <ProdutosEstoque
                    products={products}
                    removeProduct={removeProduct}
                    updateProductAdd={updateProductAdd}
                    updateProductRemove={updateProductRemove}
                />
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
