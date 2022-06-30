import { useRouter } from 'next/router';
import TabelaPromocoes from '../components/TabelaPromocoes';
import ButtonVivo from '../components/styled/ButtonVivo';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Container from '@mui/material/Container';
import { Input } from '@mui/material';
import { useRef } from 'react';

import readExcelPromo from '../services/readExcel'
import BridgeExcelToSgp from '../services/BridgeExcelToSgp';

export default function App() {

  const router = useRouter()

  const inputRef = useRef(null)

  const handleChangeInputFile = async () => {
    const [file] = inputRef.current.files
    if (!file) return
    const promos = await readExcelPromo(file)
    const promotions = BridgeExcelToSgp(promos, {})
    console.log(promotions)
  }

  return (
    <Container>
      <Input
        type="file"
        inputRef={inputRef}
        inputProps={{ accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' }}
        onChange={handleChangeInputFile}
      />
      {/* <ButtonVivo type="" variant='contained' endIcon={<DriveFolderUploadIcon />}>
        <input
          type="file"
          hidden
        />
        Fazer upload da Planilha
      </ButtonVivo> */}
      <ButtonVivo variant='contained' onClick={() => router.push('/create')} endIcon={<DriveFolderUploadIcon />}>Criar Promocao</ButtonVivo>
      <TabelaPromocoes />
      <ButtonVivo variant='contained' onClick={() => router.push('/technical')} endIcon={<NoteAddIcon />}>Gerar Promocoes</ButtonVivo>
    </Container>
  );
}

