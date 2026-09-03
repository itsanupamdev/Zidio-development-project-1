"use client"

import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Toaster } from "react-hot-toast"
import { checkAuth } from "./store/slices/authSlice"

// Components
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import EnhancedFileUpload from "./pages/EnhancedFileUpload"
import Analytics from "./pages/Analytics"
import Profile from "./pages/Profile"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />

      {/* Demo Notification Ribbon */}
      <div className="bg-indigo-600 text-white text-xs text-center py-2 px-4 font-medium flex items-center justify-center gap-2 shadow-sm">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Excel Analytics Platform &bull; Live Client-Side Demo Mode (Interactive Dashboards, File Parsing &amp; Charts Enabled)</span>
      </div>

      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<EnhancedFileUpload />} />
          <Route path="/analytics/:fileId" element={<Analytics />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
