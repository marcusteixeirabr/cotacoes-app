import { formatarBRL } from "./moeda";

describe("formatarBRL", () => {
  // o Intl usa espaço não separável entre R$ e o número para não quebrar a linha; é o comportamento desejado
  const NBSP = "\u00a0";

  test("formata valor com milhar e centavos", () => {
    expect(formatarBRL(1234.5)).toBe(`R$${NBSP}1.234,50`);
  });

  test("formata valor zero", () => {
    expect(formatarBRL(0)).toBe(`R$${NBSP}0,00`);
  });

  test("vários separadores de milhar", () => {
    expect(formatarBRL(1000000)).toBe(`R$${NBSP}1.000.000,00`);
  });

  test("soma clássica de ponto flutuante", () => {
    expect(formatarBRL(0.1 + 0.2)).toBe(`R$${NBSP}0,30`);
  });

  test("número negativo", () => {
    expect(formatarBRL(-5)).toBe(`-R$${NBSP}5,00`);
  });

  test("arredondamento de meio centavo para cima", () => {
    expect(formatarBRL(1.005)).toBe(`R$${NBSP}1,01`);
  });

  test("arredondamento de meio centavo para baixo", () => {
    expect(formatarBRL(1.004)).toBe(`R$${NBSP}1,00`);
  });
});
