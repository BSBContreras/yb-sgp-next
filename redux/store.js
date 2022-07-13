import { configureStore } from '@reduxjs/toolkit'
import questionnaireReducer from './QuestionnaireSlice'
import generalReducer from './GeneralSlice'
import regulationReducer from './RegulationSlice'

export default configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    general: generalReducer,
    regulation: regulationReducer
  }
})