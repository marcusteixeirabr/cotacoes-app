const formatadorDataHora = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

export default function formatarDataHora(data: Date): string {
  return formatadorDataHora.format(data);
}
