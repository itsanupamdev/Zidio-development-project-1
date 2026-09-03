"use client"

import React, { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDropzone } from "react-dropzone"
import { uploadFile } from "../store/slices/fileSlice"
import { Upload, FileSpreadsheet, CheckCircle, Sparkles, Zap, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

const EnhancedFileUpload = () => {
  const dispatch = useDispatch()
  const { files = [] } = useSelector((state) => state.files)
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        const formData = new FormData()
        formData.append("excelFile", file)

        dispatch(uploadFile(formData))
        toast.success(`Analyzed and indexed ${file.name} successfully!`)
      }
    },
    [dispatch]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"]
    }
  })

  const handleSampleUpload = () => {
    const mockFormData = new FormData()
    mockFormData.append("excelFile", new File(["sample"], "Enterprise_Financial_Model_2026.xlsx"))
    dispatch(uploadFile(mockFormData))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Command Center
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Spreadsheet Ingestion &amp; Parsing Studio
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Drop your workbook to auto-generate Chart.js visual models and run AI audits.
          </p>
        </div>

        <button
          onClick={handleSampleUpload}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
        >
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Quick Sample Dataset</span>
        </button>
      </div>

      {/* Futuristic Dropzone */}
      <div
        {...getRootProps()}
        className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center transition-all duration-300 ${
          isDragActive
            ? "border-cyan-400 bg-cyan-500/10 shadow-2xl shadow-cyan-500/20"
            : "border-slate-800 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-900/90"
        }`}
      >
        <input {...getInputProps()} />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 mx-auto mb-5 shadow-xl shadow-cyan-500/20">
          <div className="w-full h-full bg-[#0b0f19] rounded-[14px] flex items-center justify-center">
            <Upload className="w-7 h-7 text-cyan-400 animate-bounce" />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2">
          {isDragActive ? "Drop spreadsheet to parse instantly!" : "Drag & Drop your Excel workbook here"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
          Supports <code className="text-cyan-400 font-mono">.xlsx</code>, <code className="text-cyan-400 font-mono">.xls</code>, and <code className="text-cyan-400 font-mono">.csv</code> files up to 50MB with multi-sheet support.
        </p>

        <button
          type="button"
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all"
        >
          Browse Local Files
        </button>
      </div>

      {/* Recently Parsed Files */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8">
        <h3 className="text-base font-bold text-white mb-4">Ingested Workbooks ({files.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((f) => (
            <div
              key={f._id}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{f.originalName}</h4>
                  <p className="text-xs text-slate-400">
                    {f.rowCount} rows &bull; {(f.fileSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <Link
                to={`/analytics/${f._id}`}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/20 transition-all"
              >
                Inspect ➔
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EnhancedFileUpload
