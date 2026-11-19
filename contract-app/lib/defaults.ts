import type { ContractData } from "@/types/contract";

const today = new Date();
const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

export const defaultData: ContractData = {
  locador: {
    nome: "Honorius Ferreira de Souza",
    nacionalidade: "brasileiro",
    estadoCivil: "viúvo",
    profissao: "comerciante",
    cpf: "648.013.220-34",
    endereco: "Bento Andrade s/n",
    bairro: "Umburanas",
  },
  locatario: {
    nome: "Gerdeson de Melo Figueiredo",
    nacionalidade: "brasileiro",
    estadoCivil: "casado",
    profissao: "atendente",
    cpf: "887.799.140-20",
    endereco: "Ferreira Manoel S/N",
  },
  imovel: {
    endereco:
      "Rua Ferreira Manoel, nº 281, 1º andar, apartamento 105, Bairro Paraguay, Areial/PB, CEP 58135-000",
    descricao:
      "três quartos, dois banheiros, uma sala de estar, uma cozinha e uma área de serviço",
  },
  prazo: { meses: 4, inicio: "2025-08-28", termino: "2025-12-28" },
  financeiro: {
    aluguel: 500,
    diaVencimento: 28,
    multaAtraso: 2,
    jurosMes: 1,
    indice: "IPCA",
    honorarios: 10,
    multaRescisao: 100,
    prazoMinimoPercent: 20,
    multaDiaria: 50,
  },
  foro: "Areia/PB",
  assinatura: {
    cidade: "Esperança",
    dia: String(today.getDate()),
    mes: meses[today.getMonth()],
    ano: String(today.getFullYear()),
    vias: "2 (duas)",
  },
};
