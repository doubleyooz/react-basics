"use client";

import { useEffect, useMemo, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import type { ContractData } from "@/types/contract";
import { defaultData } from "@/lib/defaults";
import { buildContract } from "@/lib/contract";

const STORAGE_KEY = "contrato-locacao:v1";

type Result = { kind: "ok"; url: string; name: string } | { kind: "err"; msg: string } | null;

function Field({
  label, value, onChange, type = "text", full, area,
}: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; full?: boolean; area?: boolean;
}) {
  return (
    <label className={full ? "full" : undefined}>
      {label}
      {area ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export default function Page() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<ContractData>(defaultData);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result>(null);

  // Load / persist form in the browser
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...defaultData, ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data, loaded]);

  const blocks = useMemo(() => buildContract(data), [data]);

  // Small immutable setters
  const setLocador = (k: keyof ContractData["locador"], v: string) =>
    setData((d) => ({ ...d, locador: { ...d.locador, [k]: v } }));
  const setLocatario = (k: keyof ContractData["locatario"], v: string) =>
    setData((d) => ({ ...d, locatario: { ...d.locatario, [k]: v } }));
  const setImovel = (k: keyof ContractData["imovel"], v: string) =>
    setData((d) => ({ ...d, imovel: { ...d.imovel, [k]: v } }));
  const setPrazo = (k: keyof ContractData["prazo"], v: string) =>
    setData((d) => ({ ...d, prazo: { ...d.prazo, [k]: k === "meses" ? Number(v) : v } }));
  const setFin = (k: keyof ContractData["financeiro"], v: string) =>
    setData((d) => ({
      ...d,
      financeiro: { ...d.financeiro, [k]: k === "indice" ? v : Number(v) },
    }));
  const setAss = (k: keyof ContractData["assinatura"], v: string) =>
    setData((d) => ({ ...d, assinatura: { ...d.assinatura, [k]: v } }));

  async function generate() {
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erro desconhecido");
      setResult({ kind: "ok", url: json.url, name: json.name });
    } catch (e) {
      setResult({ kind: "err", msg: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    if (confirm("Restaurar os dados de exemplo? Suas alterações serão perdidas.")) {
      setData(defaultData);
    }
  }

  return (
    <>
      <header className="topbar">
        <h1>Contrato de Locação Residencial</h1>
        <div className="actions">
          <button onClick={reset}>Restaurar exemplo</button>
          {status === "authenticated" ? (
            <>
              <span className="muted">{session.user?.email}</span>
              <button onClick={() => signOut()}>Sair</button>
              <button className="primary" onClick={generate} disabled={busy}>
                {busy ? "Gerando…" : "Gerar Google Doc"}
              </button>
            </>
          ) : (
            <button className="primary" onClick={() => signIn("google")} disabled={status === "loading"}>
              Entrar com Google
            </button>
          )}
        </div>
      </header>

      {result?.kind === "ok" && (
        <p className="notice ok" style={{ marginTop: 16 }}>
          Documento criado: <a href={result.url} target="_blank" rel="noreferrer">{result.name}</a>
        </p>
      )}
      {result?.kind === "err" && (
        <p className="notice err" style={{ marginTop: 16 }}>{result.msg}</p>
      )}

      <main className="layout">
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>Locador(a)</legend>
            <div className="grid">
              <Field full label="Nome completo" value={data.locador.nome} onChange={(v) => setLocador("nome", v)} />
              <Field label="Nacionalidade" value={data.locador.nacionalidade} onChange={(v) => setLocador("nacionalidade", v)} />
              <Field label="Estado civil" value={data.locador.estadoCivil} onChange={(v) => setLocador("estadoCivil", v)} />
              <Field label="Profissão" value={data.locador.profissao} onChange={(v) => setLocador("profissao", v)} />
              <Field label="CPF" value={data.locador.cpf} onChange={(v) => setLocador("cpf", v)} />
              <Field label="Endereço" value={data.locador.endereco} onChange={(v) => setLocador("endereco", v)} />
              <Field label="Bairro (deixe vazio para omitir)" value={data.locador.bairro} onChange={(v) => setLocador("bairro", v)} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Locatário(a)</legend>
            <div className="grid">
              <Field full label="Nome completo" value={data.locatario.nome} onChange={(v) => setLocatario("nome", v)} />
              <Field label="Nacionalidade" value={data.locatario.nacionalidade} onChange={(v) => setLocatario("nacionalidade", v)} />
              <Field label="Estado civil" value={data.locatario.estadoCivil} onChange={(v) => setLocatario("estadoCivil", v)} />
              <Field label="Profissão" value={data.locatario.profissao} onChange={(v) => setLocatario("profissao", v)} />
              <Field label="CPF" value={data.locatario.cpf} onChange={(v) => setLocatario("cpf", v)} />
              <Field full label="Endereço" value={data.locatario.endereco} onChange={(v) => setLocatario("endereco", v)} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Imóvel</legend>
            <div className="grid">
              <Field full area label="Endereço completo" value={data.imovel.endereco} onChange={(v) => setImovel("endereco", v)} />
              <Field full area label="Composição (ex.: três quartos, dois banheiros…)" value={data.imovel.descricao} onChange={(v) => setImovel("descricao", v)} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Prazo</legend>
            <div className="grid">
              <Field label="Duração (meses)" type="number" value={data.prazo.meses} onChange={(v) => setPrazo("meses", v)} />
              <span />
              <Field label="Início" type="date" value={data.prazo.inicio} onChange={(v) => setPrazo("inicio", v)} />
              <Field label="Término" type="date" value={data.prazo.termino} onChange={(v) => setPrazo("termino", v)} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Valores e multas</legend>
            <div className="grid">
              <Field label="Aluguel mensal (R$)" type="number" value={data.financeiro.aluguel} onChange={(v) => setFin("aluguel", v)} />
              <Field label="Dia de vencimento" type="number" value={data.financeiro.diaVencimento} onChange={(v) => setFin("diaVencimento", v)} />
              <Field label="Multa por atraso (%)" type="number" value={data.financeiro.multaAtraso} onChange={(v) => setFin("multaAtraso", v)} />
              <Field label="Juros ao mês (%)" type="number" value={data.financeiro.jurosMes} onChange={(v) => setFin("jurosMes", v)} />
              <Field label="Índice de correção" value={data.financeiro.indice} onChange={(v) => setFin("indice", v)} />
              <Field label="Honorários (%)" type="number" value={data.financeiro.honorarios} onChange={(v) => setFin("honorarios", v)} />
              <Field label="Multa de rescisão (R$)" type="number" value={data.financeiro.multaRescisao} onChange={(v) => setFin("multaRescisao", v)} />
              <Field label="Janela da multa (% do prazo)" type="number" value={data.financeiro.prazoMinimoPercent} onChange={(v) => setFin("prazoMinimoPercent", v)} />
              <Field label="Multa diária por atraso na saída (R$)" type="number" value={data.financeiro.multaDiaria} onChange={(v) => setFin("multaDiaria", v)} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Foro e assinatura</legend>
            <div className="grid">
              <Field label="Foro (comarca)" value={data.foro} onChange={(v) => setData((d) => ({ ...d, foro: v }))} />
              <Field label="Nº de vias" value={data.assinatura.vias} onChange={(v) => setAss("vias", v)} />
              <Field label="Cidade" value={data.assinatura.cidade} onChange={(v) => setAss("cidade", v)} />
              <Field label="Dia" value={data.assinatura.dia} onChange={(v) => setAss("dia", v)} />
              <Field label="Mês" value={data.assinatura.mes} onChange={(v) => setAss("mes", v)} />
              <Field label="Ano" value={data.assinatura.ano} onChange={(v) => setAss("ano", v)} />
            </div>
          </fieldset>

          <p className="muted">Os dados ficam salvos apenas neste navegador.</p>
        </form>

        <article className="preview" aria-label="Pré-visualização do contrato">
          {blocks.map((x, i) => {
            if (x.t === "title") return <h1 key={i}>{x.text}</h1>;
            if (x.t === "clause") return <h2 key={i}>{x.text}</h2>;
            if (x.t === "item") return <p key={i} className="item">{x.text}</p>;
            if (x.t === "sig")
              return (
                <div key={i} className="sig">
                  <p>{x.label}</p>
                  <p className="line">______________________________<br />{x.name}</p>
                </div>
              );
            return <p key={i}>{x.text}</p>;
          })}
        </article>
      </main>
    </>
  );
}
