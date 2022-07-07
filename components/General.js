import React, { useState } from 'react';
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

import { useDispatch, useSelector } from 'react-redux';
import {
  changeCodPromocao,
  changeCodLegado,
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

export default function General() {
  return (
    <React.Fragment>
      <Header />
      <AreaCode />
      <Benefits />
    </React.Fragment>
  )
}

const padroes = {
  'PADRAO_1': [1, 2, 3],
  'PADRAO_2': [3, 4, 5],
}

function AreaCode() {

  const [pattern, setPattern] = useState('')
  const [selected, setSelected] = useState([])
  const [areaCode, setAreaCode] = useState([])

  const handleChangePattern = (pattern) => {
    setPattern(pattern)
    setSelected(padroes[pattern])
  }

  const handleChangeSelected = (select) => {
    const index = selected.indexOf(select)
    if (index < 0) {
      setSelected(prev => [...prev, select])
    } else {
      setSelected(prev => prev.filter(v => v != select))
    }
  }

  const handleUsePattern = () => {
    setAreaCode(prev => _.union(prev, selected))
  }

  const isAreaCodeSelected = (select) => {
    return selected.includes(select)
  }

  console.log(areaCode)

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
          {Object.entries(padroes).map(([key]) => (
            <ListItem key={key} disablePadding>
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
            <Typography variant='body2' style={{ padding: '16px' }}>{pattern}</Typography>
            <Grid container spacing={0.5}>
              {padroes[pattern].map((value) => (
                <Grid key={value} item>
                  <Chip
                    label={value}
                    color='primary'
                    variant={isAreaCodeSelected(value) ? 'filled' : 'outlined'}
                    onClick={() => handleChangeSelected(value)}
                  />
                </Grid>
              ))}
            </Grid>
            <ButtonVivo
              fullWidth
              variant='contained'
              size='small'
              endIcon={<ArrowRightAltIcon />}
              onClick={handleUsePattern}
            >
              Usar DDDs
            </ButtonVivo>
          </Stack>

        ) : (
          null
        )}

      </Grid>
      <Grid item sm={4}>

      </Grid>
    </Grid >
  )
}

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import ButtonVivo from './styled/ButtonVivo'

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function TransferList() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3, 100, 101, 102, 103, 104, 105]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
