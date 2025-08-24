import Editor from "@monaco-editor/react";
import { useMemo, useRef, useState } from "react";

export default function ResponseViewer({ response, statusLabel = "Procesado" }) {
  const [pretty, setPretty] = useState(true);
  const editorRef = useRef(null);

  const text = useMemo(() => {
    const raw = typeof response === "string" ? response : JSON.stringify(response ?? null);
    if (!pretty) return raw;
    try { return JSON.stringify(JSON.parse(raw), null, 2); } catch { return raw; }
  }, [response, pretty]);

  const copy = async () => { try { await navigator.clipboard.writeText(text); } catch {} };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-2 flex items-center gap-2">
        <span className="px-2 py-1 text-xs rounded border border-white/10 bg-white/5 text-zinc-300">
          {statusLabel}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setPretty((v) => !v)}
            className="text-xs px-2 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/10"
            title="Alternar pretty/raw"
          >
            {pretty ? "Raw" : "Pretty"}
          </button>
          <button
            onClick={copy}
            className="text-xs px-2 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/10"
            title="Copiar JSON"
          >
            Copiar
          </button>
        </div>
      </div>

      {/* 👇 Este contenedor se estira y le da altura al Monaco */}
      <div className="flex-1 min-h-0 border border-white/5 rounded-lg overflow-hidden bg-[#0B0C10]">
        <Editor
          className="h-full w-full"
          height="100%"
          width="100%"
          defaultLanguage="json"
          theme="vs-dark"
          value={text}
          onMount={(editor) => (editorRef.current = editor)}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            wordWrap: "on",
            folding: true,
            bracketPairColorization: { enabled: true },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}