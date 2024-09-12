import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Keyboard,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTransacoes } from "@/src/app/context/TransacoesContext";

export function Transacoes() {
    const [tipo, setTipo] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [valor, setValor] = useState<string>("");

    const { addNovaTransacao } = useTransacoes();

    const handleAddTransacao = async () => {
        if (tipo && descricao && valor && !isNaN(Number(valor))) {
            await addNovaTransacao(tipo, descricao, Number(valor));
            Keyboard.dismiss();
            setTipo("");
            setDescricao("");
            setValor("");
        } else {
            Alert.alert(
                "ERRO",
                "os campos não podem estar vazios ou conter valores inválidos",
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View>
                    <Text style={styles.title}>Adicione aqui suas</Text>
                    <Text style={styles.title}>transações</Text>
                </View>

                <View style={styles.contentInputs}>
                    <View style={styles.contentPicker}>
                        <Picker
                            selectedValue={tipo}
                            onValueChange={(itemValue) => setTipo(itemValue)}
                            style={{ color: "#FFF" }}
                        >
                            <Picker.Item label="Entrada" value="entrada" />
                            <Picker.Item label="Saída" value="saida" />
                        </Picker>
                    </View>

                    <TextInput
                        selectionColor={"#47204A"}
                        style={styles.inputs}
                        value={descricao}
                        onChangeText={(descricao) => setDescricao(descricao)}
                        placeholder="Adicione uma breve descrição"
                    />
                    <TextInput
                        selectionColor={"#47204A"}
                        style={styles.inputs}
                        value={valor}
                        keyboardType="decimal-pad"
                        onChangeText={(valor) => setValor(valor)}
                        placeholder="Digite o valor da transação"
                    />
                </View>

                <Pressable style={styles.button} onPress={handleAddTransacao}>
                    <Text style={styles.textButton}>Adicionar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    containerMain: {
        width: "90%",
        backgroundColor: "#FFF",
        borderRadius: 15,
        padding: 30,
        gap: 30,
        elevation: 7,
    },

    title: {
        color: "#47204A",
        fontSize: 40,
    },

    contentInputs: {
        gap: 30,
    },

    inputs: {
        width: "90%",
        color: "#47204A",
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#47204A",
    },

    contentPicker: {
        backgroundColor: "grey",
        width: "95%",
        color: "#FFF",
        borderRadius: 8,
        overflow: "hidden",
        elevation: 10,
    },

    button: {
        width: "97%",
        backgroundColor: "#47204A",
        borderRadius: 15,
        marginTop: 20,
    },

    textButton: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 25,
        padding: 15,
    },
});
