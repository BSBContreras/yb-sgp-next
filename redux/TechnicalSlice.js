import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'technical',
  initialState: {
    parametro_online: {}
  },
  reducers: {
    handleChangeOnlineParam(state, { payload }) {
      return { ...state, parametro_online: payload }
    }
  }
})

export const { handleChangeOnlineParam } = slice.actions

export const selectTechnical = state => state.technical

export default slice.reducer
