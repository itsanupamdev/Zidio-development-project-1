import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const defaultChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Gross Revenue ($K)",
      data: [65, 78, 90, 81, 96, 115, 130, 128, 142, 160, 175, 192],
      backgroundColor: "rgba(99, 102, 241, 0.7)",
      borderColor: "rgba(99, 102, 241, 1)",
      borderWidth: 2,
    },
    {
      label: "Net Profit ($K)",
      data: [28, 35, 42, 38, 48, 59, 68, 65, 74, 85, 94, 108],
      backgroundColor: "rgba(16, 185, 129, 0.7)",
      borderColor: "rgba(16, 185, 129, 1)",
      borderWidth: 2,
    }
  ]
};

const defaultAnalysisHistory = [
  {
    _id: "demo-analysis-1",
    fileId: { _id: "demo-file-1", originalName: "Q4_Global_Revenue_Report.xlsx" },
    chartType: "bar",
    sheetName: "Revenue Summary",
    xAxis: "Month",
    yAxis: "Gross Revenue ($)",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    _id: "demo-analysis-2",
    fileId: { _id: "demo-file-2", originalName: "SaaS_Cohort_Retention_2026.xlsx" },
    chartType: "line",
    sheetName: "Monthly Active Users",
    xAxis: "Month",
    yAxis: "Active Users",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    _id: "demo-analysis-3",
    fileId: { _id: "demo-file-3", originalName: "Product_Inventory_Analytics.xlsx" },
    chartType: "pie",
    sheetName: "Stock Levels",
    xAxis: "Category",
    yAxis: "Units in Stock",
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  }
];

export const generateChartData = createAsyncThunk(
  "analytics/generateChartData",
  async ({ chartType, xAxis, yAxis }) => {
    toast.success(`Generated interactive ${chartType.toUpperCase()} visualization for ${xAxis} vs ${yAxis}`);
    return {
      chartData: {
        labels: ["Q1 Baseline", "Q2 Growth", "Q3 Acceleration", "Q4 Peak"],
        datasets: [
          {
            label: `${yAxis} by ${xAxis}`,
            data: [420, 680, 890, 1140],
            backgroundColor: ["rgba(99, 102, 241, 0.7)", "rgba(56, 189, 248, 0.7)", "rgba(34, 197, 94, 0.7)", "rgba(244, 63, 94, 0.7)"],
            borderColor: ["#6366f1", "#38bdf8", "#22c55e", "#f43f5e"],
            borderWidth: 2,
          }
        ]
      }
    };
  }
);

export const fetchAnalysisHistory = createAsyncThunk("analytics/fetchAnalysisHistory", async () => {
  return defaultAnalysisHistory;
});

export const generateInsights = createAsyncThunk("analytics/generateInsights", async () => {
  return {
    summary: "Consistent month-over-month revenue growth of 18.4%. Top contributing segment is Enterprise Cloud.",
    keyMetrics: [
      { label: "Compound Growth Rate", value: "+24.2%" },
      { label: "Data Quality Score", value: "99.4%" },
      { label: "Outliers Detected", value: "0 Anomalies" }
    ]
  };
});

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    chartData: defaultChartData,
    analysisHistory: defaultAnalysisHistory,
    insights: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearChartData: (state) => {
      state.chartData = defaultChartData;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateChartData.fulfilled, (state, action) => {
        state.chartData = action.payload.chartData;
        state.loading = false;
      })
      .addCase(fetchAnalysisHistory.fulfilled, (state, action) => {
        state.analysisHistory = action.payload;
        state.loading = false;
      })
      .addCase(generateInsights.fulfilled, (state, action) => {
        state.insights = action.payload;
        state.loading = false;
      });
  },
});

export const { clearChartData, clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
