import { useRouter } from 'next/router';
import TabelaPromocoes from '../components/TabelaPromocoes';
import ButtonVivo from '../components/styled/ButtonVivo';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Container, ThemeProvider } from '@mui/material';

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#660099',
    },
  },
});

export default function App() {

  const router = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ButtonVivo variant='contained' endIcon={<DriveFolderUploadIcon />}>Fazer upload da Planilha</ButtonVivo>
        <TabelaPromocoes />
        <ButtonVivo variant='contained' onClick={() => router.push('/technical')} endIcon={<NoteAddIcon />}>Gerar Promocoes</ButtonVivo>
      </Container>
    </ThemeProvider>
  );
}

