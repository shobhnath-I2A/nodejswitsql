import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const createBlogCategory = createAsyncThunk(
  'blogCategory/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/blog-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error)
      }
      return await response.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const blogCategorySlice = createSlice({
  name: 'blogCategory',
  initialState: {
    loading: false,
    error: null,
    success: false,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlogCategory.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.data = action.payload
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })
  },
})

export default blogCategorySlice.reducer
