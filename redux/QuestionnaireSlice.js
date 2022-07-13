import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'questionnaire',
  initialState: {
    questions: []
  },
  reducers: {
    pushQuestion(state, { payload }) {
      return { ...state, questions: [...state.questions, payload] }
    },
    removeQuestion(state, { payload }) {
      return { ...state, questions: state.questions.filter((q, index) => index != payload) }
    }
  }
})

export const { pushQuestion, removeQuestion } = slice.actions

export const selectQuestionnaire = state => state.questionnaire

export default slice.reducer
