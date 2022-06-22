import '../styles/globals.css'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux';
import { ptBR } from '@mui/x-date-pickers'

import store from '../redux/store'

const theme = createTheme({
  palette: {
    primary: {
      main: '#660099',
    },
  },
  ptBR
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
