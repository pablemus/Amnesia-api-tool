const METHODS_WITH_BODY = new Set(['POST','PUT','PATCH','DELETE']);

function normalizeBody(body){
  if (body == null) return undefined;         // ⬅️ undefined = no data
  if (typeof body === 'string'){
    const t = body.trim();
    if (!t) return undefined;                 // ⬅️ vacío => no data
    try { return JSON.parse(t); } catch { return body; }
  }
  return body;
}

export async function rginz(method, endpoint, body = null, options = {}) {
  const m = String(method || '').toUpperCase();
  if (!m) return { ok:false, status:0, data:'NO_METHOD', headers:{} };
  if (!endpoint) return { ok:false, status:0, data:'NO_URL', headers:{} };

  // solo calculamos payload si el método soporta body
  const payload = METHODS_WITH_BODY.has(m) ? normalizeBody(body) : undefined;

  // si no hay payload, NO mandes Content-Type
  const baseHeaders = payload !== undefined
    ? { 'Content-Type': 'application/json; charset=utf-8' }
    : {};
  const headers = { ...baseHeaders, ...(options.headers || {}) };

  try {
    const res = await window.amnesia.request(m, endpoint, payload, headers, {
      timeout: options.timeout,
      insecure: options.insecure === true
    });
    return res;
  } catch (err) {
    console.error('[rginz] IPC error:', err);
    return { ok:false, status:0, data:'IPC_ERROR', headers:{}, error:{ message:String(err) } };
  }
}

export default rginz;
