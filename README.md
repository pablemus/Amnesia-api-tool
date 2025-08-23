
# Amnesia – API Tool ligera

![Electron](https://img.shields.io/badge/Electron-20232A?style=for-the-badge&logo=electron&logoColor=61DAFB)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

Una app de escritorio minimalista inspirada en **Postman** e **Insomnia**. Construida con **Electron**, **React**, **Axios**, **React Router** y **SweetAlert2**. Pensada para ser simple, rápida, sin andarse con vueltas. El backend corre aparte (no está en este repositorio).

---

## 🚀 ¿Qué hace?

- **App de escritorio multiplataforma** (Windows/macOS/Linux) con Electron.
- UI declarativa con React y navegación limpia gracias a React Router.
- Comunicación HTTP con el backend usando Axios.
- Login y registro con alertas bonitas de SweetAlert2.
- No incluye backend — solo frontend/desktop. Backend se conecta via API.

---

## 📂 Estructura del proyecto

```
Amnesia-api-tool/
│
├── public/              # Archivos estáticos (index.html, assets)
├── src/
│   ├── components/       # Botones, formularios, headers…
│   ├── pages/            # Login, Register, Dashboard, RequestBuilder…
│   ├── hooks/            # Por ejemplo, useApi, useAuth…
│   ├── App.jsx           # Rutas y layout principal
│   └── main.jsx          # Punto de entrada React (+ bootstrap)
├── electron/
│   ├── main.js           # Código principal de Electron
│   └── preload.js        # Si usas contextBridge, etc.
├── .env                  # Variables del entorno (ej. VITE_API_BASE_URL)
└── package.json
```

---

## ⚙️ Instalación & ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/pablemus/Amnesia-api-tool.git
cd Amnesia-api-tool
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run dev
```

### 3. Ejecutar con Electron
```bash
npm run electron:dev
```

### 4. Crear compilación para distribución
```bash
npm run build
npm run electron:build
```

---

## 🔑 Variables de entorno
Crea un archivo `.env` con:
```
VITE_API_BASE_URL=https://tu-backend-api.com
```

---

## 📌 Estado actual
✅ Login funcionando  
✅ Registro funcional  
✅ Peticiones HTTP (GET, POST) con Axios  
✅ Alertas de éxito/error con SweetAlert2  
✅ Navegación fluida con React Router  

🔜 Guardar colecciones localmente  
🔜 Importar/exportar entornos  
🔜 Interfaz avanzada para visualizar responses  

---

## 📸 Screenshots
*(Agrega aquí tus capturas para mostrar la UI)*  

---

## 🤝 Contribución
Sugerencias y PRs son bienvenidos. Si vas a contribuir, respeta las convenciones del proyecto y sigue las mejores prácticas.

---

### 📜 Licencia
Este proyecto está bajo licencia **MIT**.
