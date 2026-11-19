export interface Person {
  nome: string;
  nacionalidade: string;
  estadoCivil: string;
  profissao: string;
  cpf: string;
  endereco: string;
}

export interface ContractData {
  locador: Person & { bairro: string };
  locatario: Person;
  imovel: {
    endereco: string; // "Rua Nascimento Manoel, nº 281, 1º andar, apartamento 105, Bairro Umburanas, Esperança/PB, CEP 58135-000"
    descricao: string; // "três quartos, dois banheiros, ..."
  };
  prazo: {
    meses: number;
    inicio: string; // yyyy-mm-dd
    termino: string; // yyyy-mm-dd
  };
  financeiro: {
    aluguel: number;
    diaVencimento: number;
    multaAtraso: number; // %
    jurosMes: number; // %
    indice: string; // IPCA
    honorarios: number; // %
    multaRescisao: number; // R$
    prazoMinimoPercent: number; // % of the term in which tenant termination is fined
    multaDiaria: number; // R$
  };
  foro: string; // "Areia/PB"
  assinatura: {
    cidade: string;
    dia: string;
    mes: string;
    ano: string;
    vias: string;
  };
}

export type Block =
  | { t: "title"; text: string }
  | { t: "clause"; text: string }
  | { t: "p"; text: string }
  | { t: "item"; text: string }
  | { t: "sig"; label: string; name: string };
