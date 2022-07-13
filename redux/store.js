import { configureStore } from '@reduxjs/toolkit'
import questionnaireReducer from './QuestionnaireSlice'
import generalReducer from './GeneralSlice'
import regulationReducer from './RegulationSlice'
import onlineParamReducer from './TechnicalSlice'

export const storeCreate = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    general: generalReducer,
    regulation: regulationReducer,
    technical: onlineParamReducer
  }
})