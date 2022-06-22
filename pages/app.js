import { useRouter } from 'next/router';
import TabelaPromocoes from '../components/TabelaPromocoes';
import ButtonVivo from '../components/styled/ButtonVivo';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Container from '@mui/material/Container';


export default function App() {

  const router = useRouter()

  return (
    <Container>
      <ButtonVivo variant='contained' endIcon={<DriveFolderUploadIcon />}>Fazer upload da Planilha</ButtonVivo>
      <ButtonVivo variant='contained' onClick={() => router.push('/create')} endIcon={<DriveFolderUploadIcon />}>Criar Promocao</ButtonVivo>
      <TabelaPromocoes />
      <ButtonVivo variant='contained' onClick={() => router.push('/technical')} endIcon={<NoteAddIcon />}>Gerar Promocoes</ButtonVivo>
    </Container>
  );
}

