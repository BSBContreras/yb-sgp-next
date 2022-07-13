import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Box from '@mui/material/Box'
import Container from '@mui/system/Container'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Questionnaire from '../components/Questionnaire'
import Technical from '../components/Technical'
import General from '../components/General'
import Regulation from '../components/Regulation'
import BridgeFormToSgp from '../services/BridgeFormToSgp';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useSelector } from 'react-redux';
import { getNameGroup } from '../utils/SetBelonging'
import { patterns } from '../dictionary'

import { Provider } from 'react-redux';
import { storeCreate } from '../redux/store'

const steps = [
  'Informações Gerais',
  'Questionário',
  'Regulamento',
  'Informações Técnicas'
]

const components = [
  <General />,
  <Questionnaire />,
  <Regulation />,
  <Technical />
]

const getComponent = index => {
  return components[index]
}

function StepperCreate() {
  const [activeStep, setActiveStep] = React.useState(0)

  const state = useSelector(state => state)

  const router = useRouter()

  const getOverviewSgp = () => {
    return BridgeFormToSgp(state, {})
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleFinish = () => {

    const name = getNameGroup(patterns, state.general.areaCode)
    const promotion = {}
    promotion[name] = getOverviewSgp()

    if (typeof window !== 'undefined') {
      var promotions = JSON.parse(window.localStorage.getItem('promotions') || '{}')
      promotions = { ...promotions, ...promotion }
      window.localStorage.setItem('promotions', JSON.stringify(promotions))
    }

    router.push('/app')
  }

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <SyntaxHighlighter language='json'>
              {JSON.stringify(getOverviewSgp()).split(',').join(',\n')}
            </SyntaxHighlighter>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
              <Button
                color="inherit"
                onClick={handleReset}
                sx={{ mr: 1 }}
              >
                Revisar
              </Button>
              <Button onClick={handleFinish}>Finalizar</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Container>
              {getComponent(activeStep)}
            </Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Voltar
              </Button>
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Overview' : 'Próximo'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}

export default function CreateWrapper() {
  return (
    <Provider store={storeCreate}>
      <StepperCreate />
    </Provider>
  )
}
