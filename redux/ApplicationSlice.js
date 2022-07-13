import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'application',
  initialState: {
    promotions: typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('promotions') || '{}')
  },
  reducers: {
    handleAddPromotions(state, { payload }) {
      const promotions = { ...state.promotions, ...payload }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('promotions', JSON.stringify(promotions))
      }
      return { ...state, promotions }
    }
  }
})

export const { handleAddPromotions } = slice.actions

export const selectApplication = state => state.application

export default slice.reducer
