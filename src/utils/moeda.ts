const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function formatarBRL(valor: number): string {
  return formatadorMoeda.format(valor);
}
