import { Cotacao } from "../dominio/cotacao";

export type RespostaAwesome = {
  code: string;
  name: string;
  bid: string;
  timestamp: string;
};

export type MoedaRespostaAwesome = Record<string, RespostaAwesome>;

const awesomeURL =
  "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL";

const agenteID =
  "cotacoes-app/1.0 (+https://github.com/marcusteixeirabr/cotacoes-app)";

export async function buscarCotacoes(): Promise<Cotacao[]> {
  const resposta = await fetch(awesomeURL, {
    headers: { "User-Agent": agenteID },
  });

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`);
  }

  const cotacoes: MoedaRespostaAwesome = await resposta.json();

  return converterResposta(cotacoes);
}

export function converterItem(item: RespostaAwesome): Cotacao {
  const valor = Number(item.bid);

  if (!Number.isFinite(valor) || valor <= 0) {
    throw new Error(`O bid "${item.bid}" não é uma cotação válida.`);
  }

  return {
    codigo: item.code,
    nome: item.name.split("/")[0],
    valor,
    atualizadoEm: new Date(Number(item.timestamp) * 1000),
  };
}

export function converterResposta(resposta: MoedaRespostaAwesome): Cotacao[] {
  return Object.values(resposta).map(converterItem);
}
