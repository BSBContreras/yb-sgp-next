import { configureStore } from '@reduxjs/toolkit'
import questionnaireReducer from './QuestionnaireSlice'
import generalReducer from './GeneralSlice'

export default configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    general: generalReducer
  }
})