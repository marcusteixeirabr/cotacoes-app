import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { buscarCotacoes, converterResposta } from "./src/api/awesome";
import { TelaCotacoes } from "./src/telas/TelaCotacoes";

export default function App() {
  return (
    <View style={styles.container}>
      <TelaCotacoes carregar={buscarCotacoes} />
      <StatusBar style="auto" />
      <View style={styles.rodape}>
        <Text style={styles.textoRodape}>cotacoes-app © 2026 by @MS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  rodape: {
    backgroundColor: "#1b5e20",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute", // Prende no fundo da tela
    bottom: 0,
    left: 0,
    right: 0,
  },
  textoRodape: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
