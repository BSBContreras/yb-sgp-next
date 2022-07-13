import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'regulation',
  initialState: {
    regulation: {
      des_breve_regulamento_promocao: '',
      des_regulamento: ''
    },
    options: {
      sts_aceite_promocao: 'N',
      sts_cons_cupons: 'N',
      sts_precendente: 'N',
      sts_cons_premios: 'N',
      sts_cons_quest: 'N',
    },
    lineType: ['POS-PAGO CDMA'],
    segment: ['DIAMANTE1'],
    sourceSystem: ['URA']
  },
  reducers: {
    handleChangeRegulation(state, { payload }) {
      return { ...state, regulation: { ...state.regulation, ...payload } }
    },
    handleChangeOptions(state, { payload }) {
      return { ...state, options: { ...state.options, ...payload } }
    },
    handleChangeLineType(state, { payload }) {
      return { ...state, lineType: payload }
    },
    handleChangeSegment(state, { payload }) {
      return { ...state, segment: payload }
    },
    handleChangeSourceSystem(state, { payload }) {
      return { ...state, sourceSystem: payload }
    }
  }
})

export const {
  handleChangeRegulation,
  handleChangeOptions,
  handleChangeLineType,
  handleChangeSegment,
  handleChangeSourceSystem
} = slice.actions

export const selectRegulation = state => state.regulation

export default slice.reducer
