import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Dimensions } from "react-native";
import { Relatorios } from "./pages/Relatorios";
import { Estoque } from "./pages/Estoque";
import { Transacoes } from "./pages/Transacoes";
import { Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get("window");

export default function Index() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: "#fff",
                    },
                    tabBarActiveTintColor: "#47204A",
                    tabBarInactiveTintColor: "#999",
                }}
            >
                <Tab.Screen
                    name="Estoque"
                    component={Estoque}
                    options={{
                        headerStyle: {
                            backgroundColor: "#47204A",
                            height: height * 0.12,
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 22,
                        },
                        tabBarIcon: ({ size, color }) => (
                            <Entypo name="archive" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Transacoes"
                    component={Transacoes}
                    options={{
                        headerStyle: {
                            backgroundColor: "#47204A",
                            height: height * 0.12,
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 22,
                        },
                        tabBarIcon: ({ size, color }) => (
                            <Entypo name="credit" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Relatorios"
                    component={Relatorios}
                    options={{
                        headerStyle: {
                            backgroundColor: "#47204A",
                            height: height * 0.12,
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 22,
                        },
                        tabBarIcon: ({ size, color }) => (
                            <Entypo
                                name="bar-graph"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
