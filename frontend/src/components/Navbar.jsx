"use client"

import React from "react"
import { Link, useLocation } from "react-router-dom"
import { BarChart3, Upload, Home, Shield, Sparkles, Database, FileSpreadsheet } from "lucide-react"

const Navbar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-white">
                    Excel<span className="text-cyan-400">Pulse</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    AI Pro
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">Intelligent Spreadsheet Analytics</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive("/dashboard") || isActive("/")
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Command Center</span>
            </Link>

            <Link
              to="/upload"
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive("/upload")
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>Upload &amp; Parse</span>
            </Link>

            <Link
              to="/analytics/demo-file-1"
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive("/analytics/demo-file-1") || location.pathname.startsWith("/analytics")
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Deep Charts</span>
            </Link>
          </div>

          {/* User & Live Badge */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online Session</span>
            </div>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                AS
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200 leading-tight">Anupam Saxena</p>
                <p className="text-[10px] text-cyan-400 leading-tight">Lead Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
