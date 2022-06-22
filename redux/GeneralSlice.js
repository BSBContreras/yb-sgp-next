import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'general',
  initialState: {
    promo: {
      cod_promocao: '',
      des_promocao: ''
    }
  },
  reducers: {
    changeCodPromocao(state, { payload }) {
      return { ...state, promo: { ...state.promo, cod_promocao: payload } }
    },
    changeDesPromocao(state, { payload }) {
      return { ...state, promo: { ...state.promo, des_promocao: payload } }
    }
  }
})

export const { changeCodPromocao, changeDesPromocao } = slice.actions

export const selectPromo = state => state.general

export default slice.reducer
