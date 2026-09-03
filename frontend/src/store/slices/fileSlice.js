import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

export const demoFiles = [
  {
    _id: "demo-file-1",
    filename: "Q4_Global_Revenue_Report.xlsx",
    originalName: "Q4_Global_Revenue_Report.xlsx",
    fileSize: 2450000,
    sheets: [
      {
        name: "Revenue Summary",
        columns: ["Month", "Gross Revenue ($)", "Net Profit ($)", "Customer Count", "Growth Rate (%)"],
        rowCount: 120
      },
      {
        name: "Regional Metrics",
        columns: ["Region", "Sales Units", "Marketing Spend ($)", "ROI (%)"],
        rowCount: 45
      }
    ],
    rowCount: 165,
    columnCount: 9,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: "demo-file-2",
    filename: "SaaS_Cohort_Retention_2026.xlsx",
    originalName: "SaaS_Cohort_Retention_2026.xlsx",
    fileSize: 1850000,
    sheets: [
      {
        name: "Monthly Active Users",
        columns: ["Month", "Active Users", "Churn Rate (%)", "ARR ($)"],
        rowCount: 90
      }
    ],
    rowCount: 90,
    columnCount: 4,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    _id: "demo-file-3",
    filename: "Product_Inventory_Analytics.xlsx",
    originalName: "Product_Inventory_Analytics.xlsx",
    fileSize: 980000,
    sheets: [
      {
        name: "Stock Levels",
        columns: ["Category", "Units in Stock", "Restock Cost ($)", "Unit Profit ($)"],
        rowCount: 60
      }
    ],
    rowCount: 60,
    columnCount: 4,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
  }
];

export const uploadFile = createAsyncThunk("files/uploadFile", async (formData) => {
  const file = formData.get("excelFile");
  const newFile = {
    _id: "user-upload-" + Date.now(),
    filename: file ? file.name : "Uploaded_Workbook.xlsx",
    originalName: file ? file.name : "Uploaded_Workbook.xlsx",
    fileSize: file ? file.size : 1200000,
    sheets: [
      {
        name: "Sheet1",
        columns: ["Category", "Sales", "Profit", "Volume"],
        rowCount: 80
      }
    ],
    rowCount: 80,
    columnCount: 4,
    createdAt: new Date().toISOString(),
  };
  toast.success("Excel file successfully analyzed & added to dashboard!");
  return { file: newFile };
});

export const fetchUserFiles = createAsyncThunk("files/fetchUserFiles", async () => {
  return demoFiles;
});

export const deleteFile = createAsyncThunk("files/deleteFile", async (fileId) => {
  toast.success("File removed from dashboard!");
  return fileId;
});

const fileSlice = createSlice({
  name: "files",
  initialState: {
    files: demoFiles,
    currentFile: demoFiles[0],
    loading: false,
    uploading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.unshift(action.payload.file);
        state.uploading = false;
      })
      .addCase(fetchUserFiles.fulfilled, (state, action) => {
        if (!state.files.length) state.files = action.payload;
        state.loading = false;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.files = state.files.filter((f) => f._id !== action.payload);
      });
  },
});

export const { clearError } = fileSlice.actions;
export default fileSlice.reducer;
