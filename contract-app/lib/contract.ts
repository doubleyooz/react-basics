import type { Block, ContractData } from "@/types/contract";

/* ---------- helpers ---------- */

const UN = ["zero","um","dois","três","quatro","cinco","seis","sete","oito","nove","dez","onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove"];
const DZ = ["","","vinte","trinta","quarenta","cinquenta","sessenta","setenta","oitenta","noventa"];
const CT = ["","cento","duzentos","trezentos","quatrocentos","quinhentos","seiscentos","setecentos","oitocentos","novecentos"];

function ate999(n: number): string {
  if (n === 100) return "cem";
  const parts: string[] = [];
  const c = Math.floor(n / 100);
  const r = n % 100;
  if (c) parts.push(CT[c]);
  if (r > 0) {
    if (r < 20) parts.push(UN[r]);
    else {
      const d = Math.floor(r / 10);
      const u = r % 10;
      parts.push(u ? `${DZ[d]} e ${UN[u]}` : DZ[d]);
    }
  }
  return parts.join(" e ");
}

export function inteiroExtenso(n: number): string {
  if (n === 0) return "zero";
  if (n > 999999) return String(n);
  const m = Math.floor(n / 1000);
  const r = n % 1000;
  let s = "";
  if (m) s = m === 1 ? "mil" : `${ate999(m)} mil`;
  if (r) s += (s ? (r < 100 || r % 100 === 0 ? " e " : " ") : "") + ate999(r);
  return s;
}


export function reaisExtenso(v: number): string {
  if (!Number.isFinite(v) || v < 0) {
    throw new RangeError("Invalid monetary value");
  }

  const totalCentavos = Math.round(v * 100);
  const int = Math.floor(totalCentavos / 100);
  const cents = totalCentavos % 100;

  let s = "";

  if (int > 0 || cents === 0) {
    s = `${inteiroExtenso(int)} ${int === 1 ? "real" : "reais"}`;
  }

  if (cents > 0) {
    const c = `${inteiroExtenso(cents)} ${
      cents === 1 ? "centavo" : "centavos"
    }`;

    s = s ? `${s} e ${c}` : c;
  }

  return s;
}


export function brl(v: number): string {
  return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function dataBR(iso: string): string {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
}

function money(v: number) {
  return `${brl(v)} (${reaisExtenso(v)})`;
}

function fracao(parte: number, total: number): string {
  if (!total) return "";
  const r = parte / total;
  const map: [number, string][] = [
    [1 / 2, "metade"], [1 / 3, "um terço"], [1 / 4, "um quarto"],
    [1 / 5, "um quinto"], [1 / 10, "um décimo"], [1 / 20, "um vigésimo"],
  ];
  const hit = map.find(([f]) => Math.abs(f - r) < 1e-9);
  return hit ? `, equivalente a ${hit[1]} do aluguel mensal` : "";
}

/* ---------- template ---------- */

export function buildContract(d: ContractData): Block[] {
  const L = d.locador;
  const T = d.locatario;
  const f = d.financeiro;
  const A = "LOCADOR(A)";
  const B = "LOCATÁRIO(A)";
  const aluguel = money(f.aluguel);
  const venc = f.diaVencimento;

  const b: Block[] = [];
  const title = (text: string) => b.push({ t: "title", text });
  const clause = (text: string) => b.push({ t: "clause", text });
  const p = (text: string) => b.push({ t: "p", text });
  const item = (text: string) => b.push({ t: "item", text });

  title("CONTRATO DE LOCAÇÃO RESIDENCIAL");
  p("Pelo presente instrumento particular de locação, de um lado,");
  p(`${A}: ${L.nome}, ${L.nacionalidade}, ${L.estadoCivil}, ${L.profissao}, portador(a) do CPF nº ${L.cpf}, residente e domiciliado(a) à ${L.endereco}${L.bairro ? ` no bairro das ${L.bairro}` : ""}, doravante denominado(a) simplesmente ${A};`);
  p("E, de outro lado,");
  p(`${B}: ${T.nome}, ${T.nacionalidade}, ${T.estadoCivil}, ${T.profissao}, portador(a) do CPF nº ${T.cpf}, residente e domiciliado(a) à ${T.endereco}, doravante denominado(a) simplesmente ${B};`);
  p("Têm entre si justo e contratado o presente contrato de locação residencial, que se regerá pelas cláusulas e condições abaixo descritas:");

  clause("CLÁUSULA PRIMEIRA – DO OBJETO DO CONTRATO");
  p(`1.1. O ${A} dá em locação ao ${B} o imóvel residencial localizado na ${d.imovel.endereco}, composto por ${d.imovel.descricao}, doravante denominado IMÓVEL.`);
  p(`1.2. O IMÓVEL será utilizado exclusivamente para fins residenciais, sendo vedado ao ${B} alterar sua destinação sem prévia autorização por escrito do ${A}.`);

  clause("CLÁUSULA SEGUNDA – DO PRAZO E DA RENOVAÇÃO");
  p(`2.1. O prazo da locação será de ${d.prazo.meses} meses,
    com início em ${dataBR(d.prazo.inicio)} e término em
    ${dataBR(d.prazo.termino)}. A extinção e eventual
    prorrogação da locação observarão o disposto nos
    artigos 46 e 47 da Lei nº 8.245/1991, conforme a
    duração do contrato, independentemente de disposição
    contratual em contrário.`);  

  p(`2.2. Nas locações ajustadas por prazo inferior a
    30 (trinta) meses, findo o prazo estabelecido,
    a locação será automaticamente prorrogada por
    prazo indeterminado, somente podendo o imóvel
    ser retomado nas hipóteses previstas no artigo 47
    da Lei nº 8.245/1991.`);

  clause("CLÁUSULA TERCEIRA – DO VALOR DO ALUGUEL E ENCARGOS");
  p(`3.1. O valor do aluguel mensal será de ${aluguel}, a ser pago pelo ${B} até o dia ${venc} de cada mês, exclusivamente por meio de dinheiro físico, Pix ou transferência bancária. Qualquer outra forma de pagamento deverá ser previamente acordada por escrito entre o ${A} e o ${B}.`);
  
  p(`3.2. O valor do aluguel será reajustado anualmente,
    a cada período de 12 (doze) meses, contado do início
    da locação, pela variação acumulada do Índice Nacional
    de Preços ao Consumidor Amplo (IPCA), divulgado pelo
    Instituto Brasileiro de Geografia e Estatística (IBGE),
    ou por outro índice oficial que venha a substituí-lo.`);

  p(`3.3. O reajuste previsto na cláusula anterior será
    aplicável independentemente de eventual prorrogação
    do contrato por prazo indeterminado, observada a
    periodicidade mínima estabelecida pela legislação
    vigente.`);

  p(`3.4. As partes poderão, mediante acordo escrito,
    estabelecer novo valor para o aluguel, inclusive para
    adequá-lo aos valores praticados pelo mercado, nos
    termos do artigo 18 da Lei nº 8.245/1991. Na ausência
    de acordo, qualquer das partes poderá solicitar a
    revisão judicial do aluguel, observados os requisitos
    do artigo 19 da mesma lei.`);

  p(`3.5. Além do aluguel mensal,
     o ${B} será integralmente responsável pelo pagamento das despesas de consumo de água e energia elétrica referentes ao IMÓVEL durante todo o período em que permanecer na posse ou utilização deste,
      ainda que as respectivas contas,
       faturas ou cadastros junto às concessionárias estejam em nome do ${A}.
      O ${B} obriga-se a reembolsar o ${A} pelos valores correspondentes às referidas despesas,
       mediante apresentação das respectivas faturas,
        comprovantes ou demonstrativos de consumo,
         no prazo de 5 (cinco) dias corridos contados do recebimento,
          ou até a data de vencimento da respectiva conta,
           caso esta ocorra posteriormente.
            O ${B} deverá encaminhar ao ${A} os comprovantes de pagamento das referidas despesas imediatamente após a quitação,
            por meio eletrônico ou outro meio acordado entre as partes.`);

           
  p(`3.6. O não pagamento ou reembolso, pelo ${B},

     das despesas de água e energia elétrica nos prazos estipulados neste contrato constituirá infração contratual e inadimplemento de encargo da locação,
      sujeitando o ${B} às penalidades moratórias previstas neste instrumento,
       bem como poderá ensejar a rescisão da locação e o ajuizamento de ação de despejo por falta de pagamento dos encargos locatícios, nos termos dos artigos 9º,
       inciso III, e 23, incisos I e VIII, da Lei nº 8.245/1991, sem prejuízo da cobrança dos valores devidos, 
    observados os procedimentos legais aplicáveis.`);

  p(`3.7. Em caso de atraso no pagamento do aluguel ou no reembolso de quaisquer encargos e despesas de consumo de responsabilidade do ${B},
     incluindo água e energia elétrica,
     incidirá multa moratória de ${f.multaAtraso}% sobre o valor vencido e não pago,
      acrescida de juros de mora de ${f.jurosMes}% ao mês,
       calculados proporcionalmente aos dias de atraso,
        e correção monetária pelo índice ${f.indice},
         desde o vencimento até a efetiva quitação.`);
  p(`3.8. Em caso de inadimplemento do aluguel ou de quaisquer encargos da locação,
     incluindo o não reembolso das despesas de água e energia elétrica,
      o ${A} poderá adotar medidas extrajudiciais e judiciais cabíveis para cobrança dos valores devidos e,
       quando legalmente aplicável,
        para rescisão do contrato e retomada do IMÓVEL mediante ação de despejo por falta de pagamento, podendo os pedidos de rescisão da locação e cobrança dos débitos ser cumulados, nos termos da legislação vigente.
         O ${B} responderá pelos encargos moratórios previstos neste contrato e pelas despesas de cobrança e honorários advocatícios quando legalmente cabíveis ou fixados judicialmente, observados os limites legais.`);

  clause("CLÁUSULA QUARTA – DAS OBRIGAÇÕES ADICIONAIS DE CUMPRIMENTO CONTRATUAL");
  p(`4.1. Para fins de análise cadastral e avaliação da capacidade financeira
    para cumprimento das obrigações assumidas neste contrato, o ${B}
    deverá apresentar ao ${A}, até a assinatura deste instrumento,
    comprovante de renda ou outro documento idôneo que demonstre sua
    capacidade de arcar com o aluguel e os encargos da locação.`);

  p(`4.2. O ${B} deverá comunicar por escrito ao ${A}, no prazo de
    5 (cinco) dias, qualquer alteração em seus dados de contato,
    endereço ou demais informações necessárias à comunicação entre
    as partes durante a vigência do contrato.`);

  p(`4.3. A alteração da situação profissional ou financeira do ${B},
    por si só, não constituirá infração contratual nem motivo autônomo
    para rescisão da locação, permanecendo, contudo, exigíveis todas
    as obrigações de pagamento previstas neste contrato.`);

  p(`4.4. O descumprimento das obrigações de pagamento, conservação
    do imóvel e demais deveres contratuais será tratado conforme as
    disposições específicas deste instrumento e a legislação vigente.`);

  clause("CLÁUSULA QUINTA – DAS OBRIGAÇÕES DO LOCATÁRIO(A)");
  p(`5.1. O ${B} obriga-se a:`);
  item("a) Pagar pontualmente o aluguel e encargos;");
  item("b) Zelar pela conservação do imóvel, responsabilizando-se por eventuais danos causados por si ou por coabitantes;");
  item(`c) Não realizar alterações no imóvel sem autorização prévia e por escrito do ${A};`);
  item("d) Devolver o imóvel ao término do contrato no mesmo estado em que o recebeu, salvo desgaste natural pelo uso;");
  item(`e) Permitir vistorias pelo ${A} ou representante, mediante agendamento prévio.`);

  clause("CLÁUSULA SEXTA – DAS OBRIGAÇÕES DO LOCADOR(A)");
  p(`6.1. O ${A} obriga-se a:`);
  item("a) Entregar o imóvel em condições de uso para o fim a que se destina;");
  item("b) Garantir o uso pacífico do imóvel durante o prazo da locação;");
  item(`c) Fornecer recibos dos pagamentos efetuados pelo ${B}.`);

  clause("CLÁUSULA SÉTIMA – DA INCLUSÃO DE NOVOS INQUILINOS");
  p(`7.1. A inclusão de novos inquilinos no imóvel, ou seja, pessoas que não estavam presentes no momento da assinatura deste contrato, como cônjuge, familiares, amigos ou outros, somente será permitida mediante autorização prévia e por escrito do ${A}.`);
  p(`7.2. Para a inclusão de novos inquilinos, o ${B} deverá notificar o ${A} por escrito, fornecendo informações completas sobre as pessoas que passarão a residir no imóvel, incluindo nome completo, CPF e, se solicitado, comprovantes de identificação, comprovante de renda ou outros documentos exigidos pelo ${A}.`);
  p(`7.3. O ${A} reserva-se o direito de aprovar ou recusar a inclusão de novos inquilinos, sem necessidade de justificativa. A inclusão de novos inquilinos sem autorização prévia constitui infração contratual, sujeitando o ${B} à rescisão imediata do contrato e às penalidades previstas na Cláusula Nona.`);
  p(`7.4. O ${B} permanecerá integralmente responsável por todas as obrigações contratuais, incluindo o pagamento do aluguel, encargos e conservação do imóvel, independentemente da presença de novos inquilinos.`);
  p(`7.5. Nos termos do artigo 13 da Lei nº 8.245/1991, é expressamente vedada a sublocação, total ou parcial, do imóvel, salvo com autorização expressa e por escrito do ${A}. A inclusão de novos inquilinos autorizada não será considerada sublocação, desde que o ${B} continue residindo no imóvel e responsável pelo contrato.`);

  clause("CLÁUSULA OITAVA – DAS REGRAS DE CONVIVÊNCIA");
  p(`8.1. O ${B} compromete-se a respeitar as normas de convivência com os demais locatários, condôminos ou vizinhos, observando as regras do prédio, se aplicável, e as disposições legais, em especial o artigo 1.336 do Código Civil Brasileiro, que estabelece os deveres dos condôminos.`);
  p(`8.2. É vedado ao ${B} e aos novos inquilinos, quando aplicável:`);
  item("a) Perturbar o sossego, a saúde ou a segurança dos vizinhos, por meio de barulhos excessivos, festas ou outras atividades que violem as normas de convivência ou os horários de silêncio estipulados pelo prédio ou pela legislação municipal;");
  item("b) Utilizar o imóvel para atividades ilícitas ou que contravenham à ordem pública;");
  item("c) Desrespeitar as normas de utilização das áreas comuns do prédio, quando aplicável.");
  p(`8.3. O descumprimento das regras de convivência poderá acarretar advertências por parte do ${A} ou da administração do prédio, e, em caso de reincidência, a rescisão contratual, conforme previsto na Cláusula Nona, sem prejuízo de eventuais sanções legais ou multas aplicadas pelo prédio.`);

  clause("CLÁUSULA NONA – DA RESCISÃO");
  p(`9.1. Durante o prazo determinado da locação,
     o ${A} não poderá reaver o imóvel,
      salvo nas hipóteses previstas na legislação vigente.
       O ${B} poderá devolver o imóvel antecipadamente,
        mediante comunicação por escrito ao ${A} e pagamento da multa rescisória prevista neste contrato, calculada proporcionalmente ao período restante da locação,
         ressalvadas as hipóteses legais de dispensa.`);
 
  p(`9.2. Após a prorrogação da locação por prazo indeterminado,
     o ${B} poderá encerrá-la mediante aviso por escrito ao ${A} com antecedência mínima de 30 (trinta) dias.
      Na ausência do aviso prévio,
       o ${A} poderá exigir o equivalente a 1 (um) mês de aluguel e encargos vigentes,
        nos termos da legislação aplicável.`);
  p(`9.3. O contrato poderá ser rescindido nas hipóteses de mútuo acordo entre as partes,
     infração legal ou contratual,
      falta de pagamento do aluguel ou demais encargos da locação,
       ou demais hipóteses previstas na Lei nº 8.245/1991, sem prejuízo das notificações,
        medidas judiciais e demais procedimentos legalmente exigidos.`);
  p(`9.4. Encerrado o prazo contratual,
     a retomada do imóvel pelo ${A} observará o disposto nos artigos 46 e 47 da Lei nº 8.245/1991,
      conforme a duração originalmente pactuada.
       Nos contratos com prazo igual ou superior a 30 (trinta) meses,
        aplicam-se as regras do artigo 46; nos contratos com prazo inferior a 30 (trinta) meses,
         aplicam-se as restrições e hipóteses de retomada previstas no artigo 47.`);
  p(`9.5. Caso o ${B} permaneça no imóvel após o término da locação e não o restitua quando legalmente exigível,
     ficará sujeito ao pagamento dos aluguéis e encargos correspondentes ao período de ocupação,
      bem como às demais consequências legais cabíveis, inclusive ação de despejo,
       sem prejuízo da apuração de eventuais perdas e danos.`);

  clause("CLÁUSULA DÉCIMA – DA VISTORIA");
  p("10.1. As partes realizarão vistoria inicial e final do imóvel, registradas em laudo assinado por ambas, que detalhará o estado de conservação do imóvel e seus pertences.");
  p(`10.2. A vistoria final será realizada no momento da entrega do imóvel, com a presença do ${B} ou de seu representante, para verificar eventuais danos causados ao imóvel ou a seus pertences,
     exceto aqueles decorrentes de desgaste natural pelo uso.`);
  p(`10.3. Caso sejam constatados danos ao imóvel ou pendências financeiras de responsabilidade do ${B},
     incluindo contas de água, energia elétrica,
     gás ou demais encargos de sua responsabilidade,
      o ${B} deverá efetuar o pagamento dos valores devidos ou reparar os danos constatados, 
    no prazo de 5 (cinco) dias corridos contados do recebimento da respectiva notificação e comprovação, sem prejuízo da cobrança judicial ou extrajudicial dos valores devidos e demais medidas legais cabíveis.`);

  clause("CLÁUSULA DÉCIMA PRIMEIRA – DISPOSIÇÕES GERAIS");
  p("11.1. Este contrato será regido pela Lei nº 8.245/1991 (Lei do Inquilinato) e, no que for omisso, pelo Código Civil Brasileiro.");
  p(`11.2. Fica eleito o foro da comarca de ${d.foro} para dirimir quaisquer dúvidas ou litígios decorrentes deste contrato, com renúncia a qualquer outro, por mais privilegiado que seja.`);
  p(`E, por estarem assim justos e contratados, assinam o presente instrumento em ${d.assinatura.vias} vias de igual teor e forma.`);
  p(`Local e Data: ${d.assinatura.cidade}, ${d.assinatura.dia} de ${d.assinatura.mes} de ${d.assinatura.ano}.`);
  p("Assinaturas:");
  b.push({ t: "sig", label: `${A}:`, name: L.nome });
  b.push({ t: "sig", label: `${B}:`, name: T.nome });
  return b;
}

/* ---------- HTML for Google Docs conversion ---------- */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function contractToHtml(blocks: Block[]): string {
  const body = blocks
    .map((x) => {
      switch (x.t) {
        case "title":
          return `<h1 style="text-align:center;font-size:16pt">${esc(x.text)}</h1>`;
        case "clause":
          return `<h2 style="font-size:12pt;margin-top:18pt">${esc(x.text)}</h2>`;
        case "item":
          return `<p style="margin-left:36pt;text-align:justify">${esc(x.text)}</p>`;
        case "sig":
          return `<p style="margin-top:28pt">${esc(x.label)}</p><p>______________________________<br/>${esc(x.name)}</p>`;
        default:
          return `<p style="text-align:justify">${esc(x.text)}</p>`;
      }
    })
    .join("\n");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>body{font-family:'Times New Roman',serif;font-size:12pt;line-height:1.4}</style></head><body>${body}</body></html>`;
}
