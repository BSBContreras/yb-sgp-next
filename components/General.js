import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ptBR from 'date-fns/locale/pt-BR'

import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux';
import { changeCodPromocao, changeDesPromocao, selectPromo } from '../redux/GeneralSlice';

export default function General() {

  const { promo } = useSelector(selectPromo)
  const dispatch = useDispatch()

  const [cod_promocao, set_cod_promocao] = useState(promo.cod_promocao)
  const [des_promocao, set_des_promocao] = useState(promo.des_promocao)
  const [startDate, setStartDate] = useState(null)

  const handleChangeCodPromocao = cod_promocao => {
    set_cod_promocao(cod_promocao)
  }

  const handleChangeDesPromocao = des_promocao => {
    set_des_promocao(des_promocao)
  }

  const handleBlurCodPromocao = () => {
    dispatch(changeCodPromocao(cod_promocao))
  }

  const handleBlurDesPromocao = () => {
    dispatch(changeDesPromocao(des_promocao))
  }

  const handleChangeStartDate = newValue => {
    setStartDate(newValue)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <TextField
          required
          fullWidth
          id='cod_promocao'
          label='Código da Promoção'
          onChange={e => handleChangeCodPromocao(e.target.value)}
          onBlur={handleBlurCodPromocao}
          value={cod_promocao}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          required
          fullWidth
          id='des_promocao'
          label='Nome da Promoção'
          onChange={e => handleChangeDesPromocao(e.target.value)}
          onBlur={handleBlurDesPromocao}
          value={des_promocao}
        />
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label='Data Inicial'
            inputFormat='dd/MM/yyyy'
            value={startDate}
            onChange={handleChangeStartDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DesktopDatePicker
            label='Data Final'
            inputFormat='dd/MM/yyyy'
            value={startDate}
            onChange={handleChangeStartDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  )
}





