import Editor from "@monaco-editor/react";
import { useMemo, useRef, useState } from "react";

export default function ResponseViewer({ response, statusLabel = "Procesado" }) {
  const [pretty, setPretty] = useState(true);
  const editorRef = useRef(null);

  const isHtml = Boolean(response && response.isHtml);
  const text = useMemo(() => {
    if (!response) return pretty ? "" : "";
    if (isHtml) return String(response.raw ?? "");
    const raw = typeof response?.raw === "string" ? response.raw : JSON.stringify(response?.raw ?? null);
    if (!pretty) return raw;
    try { return JSON.stringify(JSON.parse(raw), null, 2); } catch { return raw; }
  }, [response, pretty, isHtml]);

  const copy = async () => { try { await navigator.clipboard.writeText(text); } catch {} };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-2 flex items-center gap-2">
        <div className="ml-auto flex items-center gap-2">
          {!isHtml && (
            <button onClick={() => setPretty((v) => !v)} className="text-xs px-2 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/10" title="Alternar pretty/raw">
              {pretty ? "Raw" : "Pretty"}
            </button>
          )}
          <button onClick={copy} className="text-xs px-2 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/10" title="Copiar">
            Copiar
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0 border border-white/5 rounded-lg overflow-hidden bg-[#0B0C10]">
        {isHtml ? (
          <iframe title="html-preview" className="w-full h-full bg-white" sandbox="allow-forms allow-same-origin allow-scripts" srcDoc={text} />
        ) : (
          <Editor
            className="h-full w-full"
            height="100%"
            width="100%"
            defaultLanguage="json"
            theme="vs-dark"
            value={text}
            onMount={(editor) => (editorRef.current = editor)}
            options={{ readOnly: true, minimap: { enabled: false }, wordWrap: "on", folding: true, bracketPairColorization: { enabled: true }, scrollBeyondLastLine: false }}
          />
        )}
      </div>
    </div>
  );
}
