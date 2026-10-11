import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Cotacao } from "../dominio/cotacao";
import formatarBRL from "../utils/moeda";
import formatarDataHora from "../utils/data";
import { useEffect, useState } from "react";

type Estado =
  | { tipo: "carregando" }
  | { tipo: "erro"; mensagem: string }
  | { tipo: "pronto"; cotacoes: Cotacao[] };

type Props = { carregar: () => Promise<Cotacao[]> };

export function TelaCotacoes({ carregar }: Props) {
  const [estado, setEstado] = useState<Estado>({ tipo: "carregando" });

  async function atualizar() {
    setEstado({ tipo: "carregando" });
    try {
      const cotacoes = await carregar();
      setEstado({ tipo: "pronto", cotacoes });
    } catch (e) {
      const mensagem = e instanceof Error ? e.message : String(e);
      setEstado({ tipo: "erro", mensagem });
    }
  }

  useEffect(() => {
    atualizar();
  }, []);

  if (estado.tipo === "carregando") {
    return (
      <View style={styles.containerCentralizado}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.textoCarregando}>Buscando cotações...</Text>
      </View>
    );
  }

  if (estado.tipo === "erro") {
    return (
      <View style={styles.containerCentralizado}>
        <Text style={styles.textoErro}>{estado.mensagem}</Text>
        {/* Botão de tentar novamente estilizado */}
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressionado,
          ]}
          onPress={atualizar}
        >
          <Text style={styles.textoBotao}>Tentar de novo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Cotações em Reais</Text>
      </View>
      {estado.cotacoes.map((cotacao) => (
        <View key={cotacao.codigo} style={styles.cartao}>
          <Text style={styles.nome}>{cotacao.nome}</Text>
          <Text style={styles.valor}>{formatarBRL(cotacao.valor)}</Text>
          <Text style={styles.data}>
            {formatarDataHora(cotacao.atualizadoEm)}
          </Text>
        </View>
      ))}
      <Pressable
        style={({ pressed }) => [
          styles.botaoPequeno,
          pressed && styles.botaoPressionado,
        ]}
        onPress={atualizar}
      >
        <Text style={styles.textoBotaoPequeno}>Atualizar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    paddingTop: 100, // Espaço extra para não cobrir a barra de status do celular
  },
  containerCentralizado: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  cartao: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  valor: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: 4,
  },
  data: {
    fontSize: 12,
    color: "#666",
  },
  textoCarregando: {
    marginTop: 12,
    color: "#666",
    fontSize: 16,
  },
  textoErro: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "500",
  },
  // Estilização dos Botões
  botao: {
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 180,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  botaoPequeno: {
    backgroundColor: "#e8f5e9", // Verde bem clarinho de fundo
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#2e7d32",
  },
  botaoPressionado: {
    opacity: 0.7, // Efeito visual de clique nativo do Pressable
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textoBotaoPequeno: {
    color: "#2e7d32",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
});
