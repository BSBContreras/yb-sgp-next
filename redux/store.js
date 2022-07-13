import { configureStore } from '@reduxjs/toolkit'
import questionnaireReducer from './QuestionnaireSlice'
import generalReducer from './GeneralSlice'
import regulationReducer from './RegulationSlice'
import onlineParamReducer from './TechnicalSlice'
import applicationReducer from './ApplicationSlice'

export default configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    general: generalReducer,
    regulation: regulationReducer,
    technical: onlineParamReducer,
    application: applicationReducer

  }
})
