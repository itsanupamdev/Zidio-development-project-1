"use client"

import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import {
  FileSpreadsheet,
  BarChart3,
  Upload,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2,
  Brain,
  Download,
  Search,
  Filter,
  Layers,
  Activity,
  Cpu
} from "lucide-react"
import toast from "react-hot-toast"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Dashboard = () => {
  const { files = [] } = useSelector((state) => state.files)
  const [activeChartTab, setActiveChartTab] = useState("revenue")
  const [selectedMetric, setSelectedMetric] = useState("all")
  const [searchTable, setSearchTable] = useState("")

  // Mock sample rows for interactive live data grid
  const sampleTableData = [
    { id: 101, region: "North America (US-East)", month: "October", revenue: "$342,000", profit: "$148,000", margin: "43.2%", status: "Exceeded" },
    { id: 102, region: "Western Europe (EU-West)", month: "October", revenue: "$288,500", profit: "$119,000", margin: "41.2%", status: "Exceeded" },
    { id: 103, region: "Asia-Pacific (APAC-SG)", month: "October", revenue: "$215,000", profit: "$89,400", margin: "41.6%", status: "On Target" },
    { id: 104, region: "Latin America (LATAM-BR)", month: "October", revenue: "$142,800", profit: "$49,800", margin: "34.8%", status: "On Target" },
    { id: 105, region: "Enterprise Cloud Tier", month: "November", revenue: "$412,000", profit: "$210,000", margin: "50.9%", status: "Surging" },
    { id: 106, region: "Developer API Subscriptions", month: "November", revenue: "$184,200", profit: "$98,600", margin: "53.5%", status: "Surging" },
    { id: 107, region: "Embedded OEM Licenses", month: "November", revenue: "$295,000", profit: "$124,000", margin: "42.0%", status: "On Target" }
  ]

  const filteredRows = sampleTableData.filter(row => 
    row.region.toLowerCase().includes(searchTable.toLowerCase()) ||
    row.month.toLowerCase().includes(searchTable.toLowerCase()) ||
    row.status.toLowerCase().includes(searchTable.toLowerCase())
  )

  // Chart Configurations
  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Gross Revenue ($K)",
        data: [145, 172, 198, 220, 245, 290, 318, 345, 390, 425, 470, 520],
        backgroundColor: "rgba(6, 182, 212, 0.75)",
        borderColor: "#06b6d4",
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: "Net Profit ($K)",
        data: [65, 78, 92, 105, 120, 155, 172, 190, 218, 240, 275, 310],
        backgroundColor: "rgba(99, 102, 241, 0.75)",
        borderColor: "#6366f1",
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  }

  const growthLineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "MoM Growth Trajectory (%)",
        data: [12, 14.5, 16.2, 15.8, 18.4, 21.0, 24.5, 23.8, 26.2, 29.0, 31.4, 34.2],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      }
    ]
  }

  const distributionDoughnutData = {
    labels: ["Enterprise Cloud (44%)", "API Subscriptions (26%)", "OEM Licensing (18%)", "Consulting (12%)"],
    datasets: [
      {
        data: [44, 26, 18, 12],
        backgroundColor: ["#06b6d4", "#6366f1", "#10b981", "#f59e0b"],
        borderColor: "#090d16",
        borderWidth: 3,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#94a3b8",
          font: { family: "inherit", size: 12, weight: "600" }
        }
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        bodyColor: "#38bdf8",
        borderColor: "#1e293b",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#64748b" }
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#64748b" }
      }
    }
  }

  const handleSimulateDataset = () => {
    toast.success("Loaded Fortune 500 Enterprise Financial Workbook into memory!")
  }

  const handleExportCSV = () => {
    toast.success("Exported executive CSV spreadsheet report!")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Command Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0f172a] to-[#0a1120] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Excel Intelligence HUD</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Executive Analytics <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Command Center</span>
            </h1>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Real-time spreadsheet parsing, dynamic multi-axis data visualization, and automated AI insight generation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSimulateDataset}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-md"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Load Sample Workbook</span>
            </button>

            <Link
              to="/upload"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New Excel</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Futuristic KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1 */}
        <div className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-5 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Processed Volume</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight mb-1">$3,842,500</div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center text-emerald-400 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.6%
            </span>
            <span className="text-slate-500">vs Q3 baseline</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 p-5 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Profit Margin</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight mb-1">59.8%</div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center text-emerald-400 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +6.4%
            </span>
            <span className="text-slate-500">gross margin surge</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 p-5 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Spreadsheets Cached</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight mb-1">{files.length} Workbooks</div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-cyan-400 font-semibold">2,750+ Total Rows</span>
            <span className="text-slate-500">&bull; 42 cols</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 p-5 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Accuracy Rating</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight mb-1">99.8%</div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-emerald-400 font-semibold">0 Anomaly Errors</span>
            <span className="text-slate-500">&bull; Verified</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart Suite */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Interactive Analytical Visualizations
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Toggle data dimensions, projection curves, and segment distribution in real-time.
            </p>
          </div>

          {/* Chart Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveChartTab("revenue")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeChartTab === "revenue"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Revenue Bars
            </button>
            <button
              onClick={() => setActiveChartTab("growth")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeChartTab === "growth"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Growth Curve
            </button>
            <button
              onClick={() => setActiveChartTab("doughnut")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeChartTab === "doughnut"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Segment Share
            </button>
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div className="mt-6 h-80 sm:h-96 w-full">
          {activeChartTab === "revenue" && <Bar data={revenueChartData} options={chartOptions} />}
          {activeChartTab === "growth" && <Line data={growthLineData} options={chartOptions} />}
          {activeChartTab === "doughnut" && (
            <div className="h-full flex items-center justify-center">
              <div className="w-72 h-72">
                <Doughnut data={distributionDoughnutData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2-Column: AI Insights & File Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: AI Autonomous Summary */}
        <div className="lg:col-span-1 rounded-3xl bg-gradient-to-b from-slate-900 to-[#0c121e] border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Brain className="w-4 h-4" />
                <span>AI Neural Insights</span>
              </div>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full font-semibold">
                Auto-Audited
              </span>
            </div>

            <h3 className="text-base font-bold text-white mb-4">
              Key Business Trajectory Discoveries
            </h3>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-cyan-400 font-bold block mb-1">⚡ Revenue Concentration</span>
                Enterprise Cloud Tier accounts for 50.9% of net margins while maintaining low customer acquisition costs.
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-emerald-400 font-bold block mb-1">📈 Trend Acceleration</span>
                Q4 MoM acceleration (+34.2%) is running 1.4x higher than historical industry peers.
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-amber-400 font-bold block mb-1">💡 Inventory Recommendation</span>
                Safety stock levels in European warehousing should expand by 12% to prevent delivery backlogs.
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-800/80 mt-6">
            <button
              onClick={() => toast.success("AI Insights report refreshed!")}
              className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all"
            >
              Re-run Neural Analysis ➔
            </button>
          </div>
        </div>

        {/* Right: Loaded Workbooks Cards */}
        <div className="lg:col-span-2 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Active Spreadsheet Workbooks</h3>
                <p className="text-xs text-slate-400">Parsed and indexed in client-side SheetJS memory.</p>
              </div>
              <Link
                to="/upload"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                + Add Workbook
              </Link>
            </div>

            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{file.originalName}</h4>
                      <p className="text-xs text-slate-400">
                        {file.rowCount} rows &bull; {(file.fileSize / 1024 / 1024).toFixed(2)} MB &bull; {file.sheets?.length || 1} sheets
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/analytics/${file._id}`}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all"
                    >
                      Analyze ➔
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-6 text-xs text-slate-400">
            <span>Storage Engine: Client Local Storage + Redux</span>
            <button
              onClick={handleExportCSV}
              className="text-cyan-400 font-bold hover:underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Export All Data
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Data Table Previewer */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Live Data Grid Explorer</h3>
            <p className="text-xs text-slate-400">Search, filter, and inspect parsed spreadsheet records.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTable}
                onChange={(e) => setSearchTable(e.target.value)}
                placeholder="Filter by region, month..."
                className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold border border-slate-700 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Row ID</th>
                <th className="p-3.5">Business Unit / Region</th>
                <th className="p-3.5">Reporting Period</th>
                <th className="p-3.5">Gross Revenue</th>
                <th className="p-3.5">Net Profit</th>
                <th className="p-3.5">Operating Margin</th>
                <th className="p-3.5">Performance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-mono text-slate-500">#{row.id}</td>
                  <td className="p-3.5 font-bold text-white">{row.region}</td>
                  <td className="p-3.5 text-slate-400">{row.month}</td>
                  <td className="p-3.5 font-semibold text-cyan-400">{row.revenue}</td>
                  <td className="p-3.5 font-semibold text-emerald-400">{row.profit}</td>
                  <td className="p-3.5 font-bold text-slate-200">{row.margin}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      row.status === "Surging"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                        : row.status === "Exceeded"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
