import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { buildContract, contractToHtml } from "@/lib/contract";
import type { ContractData } from "@/types/contract";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const accessToken = token?.accessToken as string | undefined;
  const expiresAt = token?.expiresAt as number | undefined;

  if (!accessToken || (expiresAt && expiresAt * 1000 < Date.now())) {
    return NextResponse.json(
      { error: "Sessão do Google ausente ou expirada. Entre com o Google novamente." },
      { status: 401 }
    );
  }

  let data: ContractData;
  try {
    data = (await req.json()) as ContractData;
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const html = contractToHtml(buildContract(data));
  const name = `Contrato de Locação – ${data.locatario.nome} – ${new Date().toLocaleDateString("pt-BR")}`;

  // Drive multipart upload: HTML in, Google Doc out (Drive converts it).
  const boundary = "contract_boundary_" + Math.random().toString(36).slice(2);
  const metadata = JSON.stringify({
    name,
    mimeType: "application/vnd.google-apps.document",
  });
  const body =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n` +
    `--${boundary}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${html}\r\n` +
    `--${boundary}--`;

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: `Google retornou erro ${res.status}: ${text}` },
      { status: 502 }
    );
  }

  const file = (await res.json()) as { id: string; name: string; webViewLink?: string };
  return NextResponse.json({
    id: file.id,
    name: file.name,
    url: file.webViewLink ?? `https://docs.google.com/document/d/${file.id}/edit`,
  });
}
