import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ptBR from 'date-fns/locale/pt-BR'

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import { useDispatch, useSelector } from 'react-redux';
import {
  changeCodPromocao,
  changeDesPromocao,
  changeStartDate,
  changeFinalDate,
  changeDesBenefit,
  selectGeneral
} from '../redux/GeneralSlice';

const benefits = {
  '1': 'INTERNET',
  '2': 'SMS',
  '3': 'LIGAÇÕES DE VIVO - VIVO',
  '4': 'LIGAÇÕES OUTRAS OPERADORAS',
  '5': 'OUTROS BENEFÍCIOS'
}

function Benefit({ benefit }) {

  const { benefits } = useSelector(selectGeneral)

  const [des_regulamento_beneficio, set_des_regulamento_beneficio] = useState(benefits[benefit.id_tipo_beneficio])

  const dispatch = useDispatch()

  const handleChangeBenefit = des_regulamento_beneficio => {
    set_des_regulamento_beneficio(des_regulamento_beneficio)
  }

  const handleBlurBenefit = () => {
    dispatch(changeDesBenefit([benefit.id_tipo_beneficio, des_regulamento_beneficio]))
  }

  return (
    <TableRow>
      <TableCell>
        {benefit.des_tipo_beneficio}
      </TableCell>
      <TableCell>
        <TextField
          required
          fullWidth
          id='des_regulamento_beneficio'
          label='Regulamento'
          onChange={e => handleChangeBenefit(e.target.value)}
          onBlur={handleBlurBenefit}
          value={des_regulamento_beneficio}
        />
      </TableCell>
    </TableRow>
  )
}

function Benefits() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Benefícios</TableCell>
            <TableCell>Regulamento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(benefits).map(([key, value]) => (
            <Benefit key={key} benefit={{ id_tipo_beneficio: key, des_tipo_beneficio: value }} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function Header() {

  const { promo } = useSelector(selectGeneral)
  const { dtc_inicial, dtc_final } = promo

  const dispatch = useDispatch()

  const [cod_promocao, set_cod_promocao] = useState(promo.cod_promocao)
  const [des_promocao, set_des_promocao] = useState(promo.des_promocao)

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
    dispatch(changeStartDate(newValue))
  }

  const handleChangeFinalDate = newValue => {
    dispatch(changeFinalDate(newValue))
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
    </Grid>
  )
}

export default function General() {
  return (
    <React.Fragment>
      <Header />
      <Benefits />
    </React.Fragment>
  )
}

