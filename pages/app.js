import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TabelaPromocoes from '../components/TabelaPromocoes';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export default function App() {

  const router = useRouter()

  return (
    <>
      <Button variant='contained' endIcon={<DriveFolderUploadIcon />}>Fazer upload da Planilha</Button>
      <TabelaPromocoes />
      <Button variant='contained' onClick={() => router.push('/technical')} endIcon={<NoteAddIcon />}>Gerar Promocoes</Button>
    </>
  );
}

