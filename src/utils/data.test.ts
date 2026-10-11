import formatarDataHora from "./data";

describe("formatarDataHora", () => {
  const dataBrasilia = new Date("2026-10-08T18:30:22-03:00");

  const dataUTC = new Date("2026-10-09T01:30:00Z");

  test("formata data e hora de Brasília", () => {
    expect(formatarDataHora(dataBrasilia)).toBe("08/10/2026, 18:30");
  });

  test("formata data e hora do fuso UTC com mudança de data", () => {
    expect(formatarDataHora(dataUTC)).toBe("08/10/2026, 22:30");
  });
});
