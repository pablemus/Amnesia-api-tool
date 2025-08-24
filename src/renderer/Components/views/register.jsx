import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showErrorToast } from '../utils/showErrorAutoClose';
import { showSuccessToastRedirect } from '../utils/showSuccessAutoClose';
import logo from './assets/amnesia.png';

const api = process.env.API_URL;

export default function Register() {
    const navigator = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(email === '' || username === '' || password === ''){
            showErrorToast('No puedes dejar campos vacios!');
            return;
        }
         if(password.length < 6){
            showErrorToast('Tu clave debe tener al menos 6 caracteres!');
            return;
        }
        if(username.length < 3){
            showErrorToast('Tu usuario debe tener al menos 3 caracteres!');
            return;
        }
        if(!email.includes('@') || !email.includes('.')){
            showErrorToast('Correo invalido!');
            return;
        }
        try{
            const payload = {
                username: username,
                email: email,
                password: password
            }
            const exito = await axios.post(`${api}/auth/register`, payload);
            if(exito){
                showSuccessToastRedirect(navigator, '/login', 'Te has registrado con exito! enviandote al log in...')
            }
        } catch(err){
            console.error(err);
            showErrorToast('Credenciales incorrectas');
        }
    }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-[#F2EFE7] font-sans">
      {/* Subtle noise-like gradient background */}
      <div className="pointer-events-none fixed inset-0 [background:radial-gradient(900px_600px_at_50%_20%,rgba(242,239,231,0.06),transparent_70%),radial-gradient(700px_500px_at_50%_100%,rgba(242,239,231,0.04),transparent_70%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="mb-2 flex flex-col items-center gap-4">
            <div className=" rounded-full bg-[#1A1A1A] shadow-[0_0_60px_-20px_rgba(242,239,231,0.15)] ">
                <img
                    src={logo}
                    alt="Amnesia Logo"
                    className="w-40 h-40 select-none"
                    draggable={false}
                />
                </div>
            <h1 className="text-2xl font-semibold tracking-tight">Crea tu cuenta</h1>
          </div>

          {/* Register Card */}
          <div className="rounded-3xl border border-[#F2EFE7]/10 bg-[#121212] p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">

              {/* Usuario */}
              <div>
                <label className="mb-1 block text-xs text-[#F2EFE7]/70">Nombre de usuario</label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}  
                  data-hook="username"
                  type="text"
                  placeholder="amnesia_dev"
                  className="w-full rounded-xl border border-[#F2EFE7]/10 bg-[#1A1A1A] px-3 py-2 text-sm text-[#F2EFE7] placeholder:text-[#F2EFE7]/40 focus:outline-none"
                />
              </div>

              {/* Correo */}
              <div>
                <label className="mb-1 block text-xs text-[#F2EFE7]/70">Correo</label>
                <input
                value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}  
                  data-hook="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-[#F2EFE7]/10 bg-[#1A1A1A] px-3 py-2 text-sm text-[#F2EFE7] placeholder:text-[#F2EFE7]/40 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-xs text-[#F2EFE7]/70">Contraseña</label>
                <div className="relative">
                  <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}  
                    data-hook="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#F2EFE7]/10 bg-[#1A1A1A] px-3 py-2 text-sm text-[#F2EFE7] placeholder:text-[#F2EFE7]/40 focus:outline-none"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-[#F2EFE7]/50 select-none">👁️</span>
                </div>
                <p className="mt-1 text-[11px] text-[#F2EFE7]/50">Mínimo 6 caracteres. Usa letras y números.</p>
              </div>

             

              {/* Submit */}
              <button
                data-hook="submit"
                type="submit"
                className="w-full rounded-xl bg-[#F2EFE7] py-2 text-sm font-medium text-black transition hover:bg-[#FAF9F5]"
              >
                Crear cuenta
              </button>

             


              {/* Link to login */}
              <p className="text-center text-xs text-[#F2EFE7]/70">
                ¿Ya tienes cuenta?{' '}
                <Link
                  to="/login"
                  className="underline hover:opacity-90 text-[#F2EFE7]"
                >
                  Inicia sesión
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
