import React, { useEffect, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const _ = require('lodash')

import ptBR from 'date-fns/locale/pt-BR'

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CloseIcon from '@mui/icons-material/Close';

import ButtonVivo from './styled/ButtonVivo'

import { getNameGroup } from '../utils/SetBelonging';

import { patterns } from '../dictionary'

import { useDispatch, useSelector } from 'react-redux';
import {
  changeCodPromocao,
  changeCodLegado,
  changeDesPromocao,
  changeStartDate,
  changeFinalDate,
  changeDesBenefit,
  changeAreaCode,
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
  const [cod_legado, set_cod_legado] = useState(promo.cod_legado)
  const [des_promocao, set_des_promocao] = useState(promo.des_promocao)

  const handleChangeCodPromocao = cod_promocao => {
    set_cod_promocao(cod_promocao)
  }

  const handleChangeDesPromocao = des_promocao => {
    set_des_promocao(des_promocao)
  }

  const handleChangeCodLegado = cod_legado => {
    set_cod_legado(cod_legado)
  }

  const handleBlurCodPromocao = () => {
    dispatch(changeCodPromocao(cod_promocao))
  }

  const handleBlurCodLegado = () => {
    dispatch(changeCodLegado(cod_legado))
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
      <Grid item xs={4}>
        <TextField
          required
          fullWidth
          id='des_promocao'
          label='Código Legado'
          onChange={e => handleChangeCodLegado(e.target.value)}
          onBlur={handleBlurCodLegado}
          value={cod_legado}
        />
      </Grid>
      <Grid item xs={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label='Data Inicial'
            inputFormat='dd/MM/yyyy'
            value={dtc_inicial}
            onChange={handleChangeStartDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DesktopDatePicker
            label='Data Final'
            inputFormat='dd/MM/yyyy'
            value={dtc_final}
            onChange={handleChangeFinalDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  )
}

function AreaCode() {

  const useGetNameGroup = () => {
    return getNameGroup(patterns, areaCode)
  }

  const { areaCode } = useSelector(selectGeneral)

  const [pattern, setPattern] = useState(useGetNameGroup())
  const [selected, setSelected] = useState(areaCode)

  const dispatch = useDispatch()

  const handleChangePattern = (pattern) => {
    setPattern(pattern)
    if (areaCode.length === 0) {
      setSelected(patterns[pattern])
    } else {
      setSelected(areaCode)
    }
  }

  const handleChangeSelected = (select) => {
    const index = selected.indexOf(select)
    if (index < 0) {
      setSelected(prev => [...prev, select])
    } else {
      setSelected(prev => prev.filter(v => v != select))
    }
  }

  const handleRemoveAreaCode = () => {
    dispatch(changeAreaCode([]))
    setSelected(patterns[pattern])
  }

  const handleAddAreaCode = () => {
    dispatch(changeAreaCode(_.union(areaCode, selected)))
  }

  const isAreaCodeSelected = (select) => {
    return selected.includes(select)
  }

  return (
    <Grid spacing={1} container>
      <Grid item sm={4}>
        <List
          subheader={
            <ListSubheader component="div" id="pattern-group">
              Padrões grupos de DDDs
            </ListSubheader>
          }
        >
          {Object.entries(patterns).map(([key]) => (
            <ListItem key={key} disablePadding selected={pattern === key}>
              <ListItemButton onClick={() => handleChangePattern(key)}>
                <ListItemText primary={key} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item sm={4}>
        {pattern ? (
          <Stack style={{ height: '100%' }} direction='column' justifyContent='space-between' spacing={1}>
            <Typography variant='body2' style={{ padding: '16px' }}>{patterns[pattern] ? pattern : 'Padrão'}</Typography>
            <Grid container spacing={0.5}>
              {patterns[pattern] ? (
                patterns[pattern].map((value) => (
                  <Grid key={value} item>
                    <Chip
                      label={value}
                      color='primary'
                      variant={isAreaCodeSelected(value) ? 'filled' : 'outlined'}
                      onClick={() => handleChangeSelected(value)}
                    />
                  </Grid>
                ))
              ) : ('Padrão Fora das Definições')}
            </Grid>
            <ButtonVivo
              fullWidth
              variant='contained'
              size='small'
              disabled={selected.length === 0}
              endIcon={<ArrowRightAltIcon />}
              onClick={handleAddAreaCode}
            >
              Usar DDDs
            </ButtonVivo>
          </Stack>
        ) : (
          <Stack style={{ height: '100%' }} direction='column' justifyContent='center' alignItems='center'>
            <Typography color='GrayText' component='span'>Selecione um Grupo de DDD</Typography>
          </Stack>
        )}
      </Grid>
      <Grid item sm={4}>
        {pattern ? (
          <Stack style={{ height: '100%' }} direction='column' justifyContent='space-between' spacing={1}>
            {areaCode.length > 0 ? (
              <Typography noWrap title={useGetNameGroup()} variant='body2' style={{ padding: '16px' }}>{useGetNameGroup()}</Typography>
            ) : (
              <Stack style={{ height: '100%' }} direction='column' justifyContent='center' alignItems='center'>
                <Typography color='GrayText' component='span'>Clique em usar DDDs</Typography>
              </Stack>
            )}
            <Typography component='span' align='center'>
              {areaCode.join(', ')}
            </Typography>
            <ButtonVivo
              fullWidth
              variant='outlined'
              size='small'
              disabled={areaCode.length === 0}
              endIcon={<CloseIcon />}
              onClick={handleRemoveAreaCode}
            >
              Remover todos os DDDs
            </ButtonVivo>
          </Stack>
        ) : (
          <Stack style={{ height: '100%' }} direction='column' justifyContent='center' alignItems='center'>
            <Typography color='GrayText' component='span'>Selecione um Grupo de DDD</Typography>
          </Stack>
        )}
      </Grid>
    </Grid >
  )
}

export default function General() {
  return (
    <React.Fragment>
      <Header />
      <AreaCode />
      <Benefits />
    </React.Fragment>
  )
}
