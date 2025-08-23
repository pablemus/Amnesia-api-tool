import axios from 'axios';
import { LogOut } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BodyEditor from '../BodyRequestComponent';
import { CustomDropdown } from "../CustomDropdown";
import ResponseViewer from "../ResponseViewer";
import { rginz } from "../engine";
const api = process.env.API_URL;
export default function Dashboard() {
  const [endpoint, setEndpoint] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [resStatus, setResStatus] = useState('Inactivo');
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  useEffect(()=>{
    const cachedToken = localStorage.getItem("token");
    if(cachedToken){
      const v = async () =>{
        const payload = {
          token:cachedToken
        }
        const res = await axios.post(`${api}/auth/verify`, payload);
        if(!res){
          navigator('/login')
        }
      }
      v();
    } else{
      navigator('/login');
    }
  }, [])
  const handleRequest = async () => {
    try {
      setLoading(true);
      setResStatus("Procesando…");
      const res = await rginz(method, endpoint, body);
      setResponse(res);
      setResStatus(typeof res?.status === 'number' ? res.status : "Procesado");

      // Guarda lo último usado después de enviar
    } catch (err) {
      setResponse({
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data
      });
      setResStatus(err?.response?.status ?? "Error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const statusStyle = useMemo(() => {
    const base = "px-2 py-1 text-xs rounded border font-medium";
    if (typeof resStatus === "number") {
      if (resStatus >= 200 && resStatus < 300) return `${base} border-emerald-500/20 text-emerald-300 bg-emerald-500/10`;
      if (resStatus >= 400) return `${base} border-rose-500/20 text-rose-300 bg-rose-500/10`;
      return `${base} border-zinc-500/20 text-zinc-300 bg-zinc-500/10`;
    }
    if (/procesando/i.test(String(resStatus))) return `${base} border-amber-500/20 text-amber-300 bg-amber-500/10`;
    if (resStatus === "Procesado") return `${base} border-emerald-500/20 text-emerald-300 bg-emerald-500/10`;
    return `${base} border-zinc-600/30 text-zinc-300 bg-zinc-600/10`;
  }, [resStatus]);

  const handleLogout = async () =>{
    const token = localStorage.getItem("token");
    if(token){
      localStorage.removeItem("token");
      navigator('/login');
    }
  }

  return (
    <main className="h-screen w-full bg-[#0B0C10] text-zinc-200 overflow-hidden flex flex-col">
      {/* Top bar */}
      <header className="flex items-center gap-3 p-3 border-b border-white/5 bg-[#0F1115]">
        <CustomDropdown method={method} setMethod={setMethod} />
        <input
          className="flex-1 min-w-0 h-10 bg-[#1A1D24] border border-white/10 text-zinc-100 rounded-lg px-3 outline-none placeholder-zinc-500 focus:border-[#8B5CF6]"
          placeholder="https://api.mydomain.com/api/users"
          value={endpoint}
          type="text"
          onChange={(e) => setEndpoint(e.target.value)}
        />
        <button
          onClick={handleRequest}
          disabled={!endpoint || !method || loading}
          className="h-10 px-4 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed
                     bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-black font-semibold
                     shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:opacity-95 transition"
        >
          {loading ? 'Sending…' : 'Send'}
        </button>
        <button
      onClick={handleLogout}
      className="
        flex items-center gap-2
        px-5 py-2 rounded-xl font-medium
        bg-[#1A1A1A] text-[#F2EFE7]
        border border-[#2A2A2A]
        shadow-[0_4px_12px_rgba(0,0,0,0.4)]
        transition-all duration-300
        hover:bg-[#2A2A2A] hover:shadow-[0_6px_20px_rgba(0,0,0,0.6)]
        active:scale-95
      "
    >
      <LogOut size={18} strokeWidth={2} />
      Log out
    </button>
      </header>

      {/* Workspace */}
      <div className="grid grid-cols-2 gap-3 p-3 flex-1 min-h-0">
        {/* Left panel */}
        <section className="min-w-0 rounded-xl border border-white/5 bg-[#0F1115] shadow-sm flex flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-white/5 flex items-center gap-4 text-sm">
            <span className="text-[#A78BFA] font-medium">Body</span>
            <span className="text-zinc-500">Params</span>
            <span className="text-zinc-500">Auth</span>
            <span className="text-zinc-500">Headers</span>
            <span className="text-zinc-500">Scripts</span>
            <span className="text-zinc-500">Docs</span>
          </div>
          <div className="flex-1 min-h-0 p-3 flex flex-col">
            <BodyEditor value={body} onChange={(v) => { setBody(v); }} />
          </div>
        </section>

        {/* Right panel */}
        <section className="min-w-0 rounded-xl border border-white/5 bg-[#0F1115] shadow-sm flex flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-white/5 flex items-center gap-4 text-sm">
            <span className="text-[#A78BFA] font-medium">Preview</span>
            <span className="text-zinc-500">Headers</span>
            <span className="text-zinc-500">Cookies</span>
            <span className="text-zinc-500">Tests</span>
            <span className="text-zinc-500">Mock</span>
            <span className="text-zinc-500">Console</span>
            <span className="ml-auto">{String(resStatus ?? "Sin respuesta")}</span>
            <span className={statusStyle} />
          </div>
          <div className="flex-1 min-h-0 p-3 flex flex-col">
            <ResponseViewer response={response} statusLabel={String(resStatus ?? "Inactivo")} />
          </div>
        </section>
      </div>
    </main>
  );
}