import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'general',
  initialState: {
    promo: {
      cod_promocao: '',
      cod_legado: '',
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
    },
    areaCode: []
  },
  reducers: {
    changeCodPromocao(state, { payload }) {
      return { ...state, promo: { ...state.promo, cod_promocao: payload } }
    },
    changeCodLegado(state, { payload }) {
      return { ...state, promo: { ...state.promo, cod_legado: payload } }
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
    },
    changeAreaCode(state, { payload }) {
      return { ...state, areaCode: payload.sort((a, b) => a - b) }
    }
  }
})

export const {
  changeCodPromocao,
  changeCodLegado,
  changeDesPromocao,
  changeStartDate,
  changeFinalDate,
  changeDesBenefit,
  changeAreaCode
} = slice.actions

export const selectGeneral = state => state.general

export default slice.reducer
