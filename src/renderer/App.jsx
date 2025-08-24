import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/views/dashboard'
import Login from './Components/views/login'
import Register from './Components/views/register'
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
