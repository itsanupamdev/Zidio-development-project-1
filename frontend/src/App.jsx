"use client"

import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
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
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid #1e293b",
            fontSize: "13px",
            fontWeight: "600"
          }
        }}
      />

      {/* Top Futuristic Ribbon */}
      <div className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white text-xs text-center py-2 px-4 font-semibold flex items-center justify-center gap-2 shadow-md">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
        <span>ExcelPulse Intelligence &bull; High-Performance Spreadsheet Parsing &amp; Interactive Analytics Command Center</span>
      </div>

      <Navbar />

      <main className="flex-1 pb-16">
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

      {/* Futuristic Command Center Footer */}
      <footer className="border-t border-slate-800/80 py-6 bg-[#060910] text-center text-xs text-slate-500">
        <p>&copy; 2026 ExcelPulse Analytics Platform. Architected with React 19, Chart.js, SheetJS, &amp; Tailwind CSS by <a href="https://github.com/itsanupamdev" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-semibold">Anupam Saxena</a>.</p>
      </footer>
    </div>
  )
}

export default App
