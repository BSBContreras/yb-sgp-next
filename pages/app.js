import { useRouter } from 'next/router';
import TabelaPromocoes from '../components/TabelaPromocoes';
import ButtonVivo from '../components/styled/ButtonVivo';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Container from '@mui/material/Container';
import { Input } from '@mui/material';
import { useRef } from 'react';

import readXlsxFile from 'read-excel-file'

export default function App() {

  const router = useRouter()

  const inputRef = useRef(null)

  const handleChangeInputFile = () => {
    readXlsxFile(inputRef.current.files[0]).then((rows) => {
      console.log(rows)
    })
  }

  return (
    <Container>
      <Input inputRef={inputRef}
        type="file"
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

