import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showErrorToast } from './showErrorAutoClose';
import { showSuccessToastRedirect } from './showSuccessAutoClose';
const api = process.env.API_URL;
export default function Login() {
    const navigator = useNavigate();
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    useEffect(()=>{
        const cachedToken = localStorage.getItem("token");
        if(cachedToken){
            const v = async () =>{
        const payload = {
          token:cachedToken
        }
        const res = await axios.post(`${api}/auth/verify`, payload);
        if(res){
          navigator('/dashboard');
        }
      }
      v();
        }
    }, [])
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(email === '' || password === ''){
            showErrorToast('No puedes dejar campos vacios!');
            return;
        }
        if(!email.includes('@') || !email.includes('.')){
            showErrorToast('Email invalido');
            return;
        }
        if(password.length < 6){
            showErrorToast('Clave invalida');
            return;
        }
        try{
            const payload = {
                email: email,
                password: password
            }
            const exito = await axios.post(`${api}/auth/login`, payload)
            if(exito){
                const token = exito.data.token;
                const tokenp = {
                    token: token
                }
                const valido = await axios.post(`${api}/auth/verify`, tokenp)
                if(valido){
                    localStorage.setItem("token", token);
                    showSuccessToastRedirect(navigator, '/dashboard', 'Log in exitoso! enviandote al cliente...');
                }
            }
        }catch(err){
            if(err){
                console.error(err);
                showErrorToast('Credenciales incorrectas');
            }
        }
    }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-[#F2EFE7] font-sans">
      {/* Subtle noise-like gradient background */}
      <div className="pointer-events-none fixed inset-0 [background:radial-gradient(900px_600px_at_50%_20%,rgba(242,239,231,0.06),transparent_70%),radial-gradient(700px_500px_at_50%_100%,rgba(242,239,231,0.04),transparent_70%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="mb-5 flex flex-col items-center gap-4">
            <div className="rounded-full bg-[#1A1A1A] shadow-[0_0_60px_-20px_rgba(242,239,231,0.15)] ">
                <img
                    src="/amnesia.png"
                    alt="Amnesia Logo"
                    className="w-40 h-40 select-none"
                    draggable={false}
                />
                </div>
            <h1 className="text-2xl font-semibold tracking-tight">Amnesia</h1>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl border border-[#F2EFE7]/10 bg-[#121212] p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1 block text-xs text-[#F2EFE7]/70">Correo</label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-[#F2EFE7]/10 bg-[#1A1A1A] px-3 py-2 text-sm text-[#F2EFE7] placeholder:text-[#F2EFE7]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-[#F2EFE7]/70">Contraseña</label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#F2EFE7]/10 bg-[#1A1A1A] px-3 py-2 text-sm text-[#F2EFE7] placeholder:text-[#F2EFE7]/40 focus:outline-none"
                />
              </div>

              

              <button
                type="submit"
                className="w-full rounded-xl bg-[#F2EFE7] py-2 text-sm font-medium text-black hover:bg-[#FAF9F5] transition"
              >
                Iniciar sesión
              </button>
             
            </form>
            <p className="mt-4 text-center text-sm text-[#F2EFE7]/70">
              ¿No tienes cuenta?{' '}
              <Link
                to="/register"
                className="text-[#F2EFE7] underline hover:text-[#FAF9F5]"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}