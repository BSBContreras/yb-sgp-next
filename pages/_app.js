import '../styles/globals.css'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ptBR } from '@mui/x-date-pickers'


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
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
