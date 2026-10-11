import { RespostaAwesome, converterItem, converterResposta } from "./awesome";
import ultimaCotacao from "./__fixtures__/ultima_cotacao.json";

describe("converterItem", () => {
  const dolar: RespostaAwesome = {
    code: "USD",
    name: "Dólar Americano/Real Brasileiro",
    bid: "5.0167",
    timestamp: "1791495022",
  };

  const bitcoin: RespostaAwesome = {
    ...dolar,
    code: "BTC",
    name: "Bitcoin",
  };

  test("converte uma moeda e preenche o codigo", () => {
    expect(converterItem(dolar).codigo).toBe("USD");
  });

  test("converte o bid de texto em número", () => {
    expect(converterItem(dolar).valor).toBe(5.0167);
  });

  test("converte o timestamp em data", () => {
    expect(converterItem(dolar).atualizadoEm).toEqual(
      new Date("2026-10-08T18:30:22-03:00"),
    );
  });

  test("extrai nome da moeda separado por barra", () => {
    expect(converterItem(dolar).nome).toBe("Dólar Americano");
  });

  test("extrai nome da moeda sem barra", () => {
    expect(converterItem(bitcoin).nome).toBe("Bitcoin");
  });

  test.each(["abc", "", " ", "0", "-5", "Infinity"])(
    "rejeita cotação inválida: %p",
    (bid) => {
      const item: RespostaAwesome = {
        ...dolar,
        bid,
      };
      expect(() => converterItem(item)).toThrow(
        `O bid "${bid}" não é uma cotação válida.`,
      );
    },
  );
});

describe("converterResposta", () => {
  test("converte resposta completa em array de cotações", () => {
    const cotacoes = converterResposta(ultimaCotacao);
    expect(cotacoes).toHaveLength(3);
    expect(cotacoes.map((c) => c.codigo)).toEqual(["USD", "EUR", "BTC"]);
  });
});
