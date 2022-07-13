import { useRouter } from 'next/router';
import TabelaPromocoes from '../components/TabelaPromocoes';
import ButtonVivo from '../components/styled/ButtonVivo';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';

import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Technical from '../components/Technical'

import readExcelPromo from '../services/readExcel'
import BridgeExcelToSgp from '../services/BridgeExcelToSgp';

import Grid from '@mui/material/Grid'

function FormDialog({ open, handleSubmit, handleChangeOpen }) {

  const [tech_state, set_tech_state] = useState({})

  const handleChangeState = values => {
    set_tech_state(values)
  }

  const handleSaveButton = () => {
    handleSubmit(tech_state)
    handleChangeOpen()
  }

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleChangeOpen}>
      <DialogTitle>Informacoes Técnicas</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para concluir a leitura do Excel, por favor preencha as Informacoes Técnicas faltantes.
        </DialogContentText>
        <Technical handleChangeState={handleChangeState} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveButton}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function App() {

  const router = useRouter()

  const inputRef = useRef(null)

  const [open, setOpen] = useState(false);
  const [opt_tech, set_opt_tech] = useState({})
  const [promotions, setPromotions] = useState({})

  const handleChangeOpen = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    if (Object.keys(opt_tech) != 0) {
      buildBridgeExcelToSgp()
    }
  }, [opt_tech])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const promotions = JSON.parse(window.localStorage.getItem('promotions') || '{}')
      setPromotions(promotions)
    }
  }, [])

  const buildBridgeExcelToSgp = async () => {
    const [file] = inputRef.current.files
    const promos = await readExcelPromo(file)
    setPromotions(prev => ({ ...prev, ...BridgeExcelToSgp(promos, opt_tech) }))
  }

  const handleChangeInputFile = async () => {
    const [file] = inputRef.current.files
    if (!file) return
    handleChangeOpen()
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={1}>
          <Grid item sm={3}>
            <ButtonVivo
              fullWidth
              variant="outlined"
              component="label"
              endIcon={<CloudUploadIcon />}
            >
              Upload File
              <input
                hidden
                type="file"
                ref={inputRef}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleChangeInputFile}
              />
            </ButtonVivo>
          </Grid>
          <Grid item sm={3}>
            <ButtonVivo fullWidth variant="outlined" onClick={() => router.push('/create')} endIcon={<AddIcon />}>Criar Promocao</ButtonVivo>
          </Grid>
          <Grid item sm={6}></Grid>
          <Grid item sm={12}>
            <TabelaPromocoes promotions={promotions} />
          </Grid>
          <Grid item sm={9}></Grid>
          <Grid item sm={3}>
            <ButtonVivo fullWidth variant="outlined" onClick={() => router.push('/viewsql')} endIcon={<NoteAddIcon />}>Gerar Promocoes</ButtonVivo>
          </Grid>
        </Grid>
      </Container>
      <FormDialog open={open} handleSubmit={set_opt_tech} handleChangeOpen={handleChangeOpen} />
    </React.Fragment>
  );
}
