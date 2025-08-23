export function CustomDropdown({ method, setMethod }) {
  const methods = [
    { label: "GET", value: "GET", hue: "from-emerald-400 to-teal-300" },
    { label: "POST", value: "POST", hue: "from-sky-400 to-indigo-300" },
    { label: "PUT", value: "PUT", hue: "from-amber-400 to-yellow-300" },
    { label: "DELETE", value: "DELETE", hue: "from-rose-400 to-pink-300" },
    { label: "PATCH", value: "PATCH", hue: "from-purple-400 to-fuchsia-300" },
  ];

  const current = methods.find(m => m.value === method) ?? methods[0];

  return (
    <div className="relative">
      <div className={`h-10 px-3 pr-8 rounded-lg bg-[#1A1D24] border border-white/10 flex items-center gap-2`}>
        <span className={`inline-block h-4 w-4 rounded-full bg-gradient-to-r ${current.hue}`} />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="appearance-none bg-transparent outline-none text-zinc-100 font-semibold cursor-pointer"
        >
          {methods.map(m => (
            <option key={m.value} value={m.value} className="bg-[#0F1115] text-zinc-100">
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" className="text-zinc-400"/>
      </svg>
    </div>
  );
}