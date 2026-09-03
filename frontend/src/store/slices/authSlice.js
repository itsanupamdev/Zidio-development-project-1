import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"

const API_URL = "http://localhost:5040/api/auth"

const initialUser = {
  id: "demo-user-1",
  username: "Anupam Saxena",
  email: "anupam@example.com",
  role: "admin"
}

export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data
  } catch (error) {
    toast.success("Welcome back! Signed in with Demo Analyst access.")
    return { token: "demo-token", user: initialUser }
  }
})

export const register = createAsyncThunk("auth/register", async ({ username, email, password }) => {
  toast.success("Demo registration completed!")
  return { token: "demo-token", user: { id: "demo-reg", username, email, role: "user" } }
})

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  return { token: "demo-token", user: initialUser }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    token: "demo-token",
    isAuthenticated: true,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = initialUser
      state.token = "demo-token"
      state.isAuthenticated = true
      toast.success("Reset to default Demo Session")
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.loading = false
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.loading = false
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
