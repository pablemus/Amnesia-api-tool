import Editor from '@monaco-editor/react'
import { useMemo, useState } from 'react'

export default function BodyEditor({ value, onChange }) {
  const [error, setError] = useState(null)

  const options = useMemo(() => ({
    minimap: { enabled: false },
    automaticLayout: true,
    fontSize: 14,
    wordWrap: 'on',
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 2
  }), [])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-2 flex items-center gap-2">
        <span className={`px-2 py-1 text-xs rounded border ${
          error
            ? 'border-rose-500/20 text-rose-300 bg-rose-500/10'
            : 'border-emerald-500/20 text-emerald-300 bg-emerald-500/10'
        }`}>
          {error ? `JSON inválido` : 'JSON válido'}
        </span>
      </div>
      <div className="flex-1 min-h-0 border border-white/5 rounded-lg overflow-hidden bg-[#0B0C10]">
        <Editor
          height="100%"
          defaultLanguage="json"
          theme="vs-dark"
          value={value}
          onChange={(v) => {
            onChange(v ?? '')
            try { JSON.parse(v ?? ''); setError(null) } catch { setError('Formato incorrecto') }
          }}
          options={options}
        />
      </div>
    </div>
  )
}
