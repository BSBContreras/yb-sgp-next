import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'general',
  initialState: {
    promo: {
      cod_promocao: '',
      des_promocao: '',
      dtc_inicial: null,
      dtc_final: null
    },
    benefits: {
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '5': ''
    }
  },
  reducers: {
    changeCodPromocao(state, { payload }) {
      return { ...state, promo: { ...state.promo, cod_promocao: payload } }
    },
    changeDesPromocao(state, { payload }) {
      return { ...state, promo: { ...state.promo, des_promocao: payload } }
    },
    changeStartDate(state, { payload }) {
      return { ...state, promo: { ...state.promo, dtc_inicial: payload } }
    },
    changeFinalDate(state, { payload }) {
      return { ...state, promo: { ...state.promo, dtc_final: payload } }
    },
    changeDesBenefit(state, { payload }) {
      const { benefits } = state
      const newBenefits = { ...benefits }
      const [id_tipo_beneficio, des_regulamento_beneficio] = payload
      newBenefits[id_tipo_beneficio] = des_regulamento_beneficio
      return { ...state, benefits: newBenefits }
    }
  }
})

export const {
  changeCodPromocao,
  changeDesPromocao,
  changeStartDate,
  changeFinalDate,
  changeDesBenefit
} = slice.actions

export const selectGeneral = state => state.general

export default slice.reducer
