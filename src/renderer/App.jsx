import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/login'
import Register from './Components/register'
import Dashboard from './Components/views/dashboard'
export default function App() {
  return (
    <div className="min-h-screen text-white">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  )
}
