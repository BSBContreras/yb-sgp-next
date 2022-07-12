import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
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

import { segmento, tipo_linha, sistema_origem } from '../dictionary'

function OptionsRegulation() {

  const [status_options, set_status_options] = useState({
    'sts_aceite_promocao': 'N',
    'sts_cons_cupons': 'N',
    'sts_precendente': 'N',
    'sts_cons_premios': 'N',
    'sts_cons_quest': 'N',
  })

  const handleChangeStatusOptions = (name) => {
    const status = status_options[name]
    if (!status) return
    let new_status_options = { ...status_options }
    new_status_options[name] = status == 'N' ? 'S' : 'N'
    set_status_options(new_status_options)
  }

  const getChecked = (name) => {
    const status = status_options[name]
    return status && (status == 'S')
  }

  const getFormControl = (name) => (
    <FormControlLabel
      label={name}
      control={
        <Checkbox
          checked={getChecked(name)}
          onChange={() => handleChangeStatusOptions(name)}
        />
      }
    />
  )

  const getStatusOptions = () => Object.keys(status_options)

  return (
    <FormGroup>
      <Grid container>
        {getStatusOptions().map((option, index) => (
          <Grid item key={index}>
            {getFormControl(option)}
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
}

function Header() {

  const { promo } = useSelector(selectGeneral)
  const { dtc_inicial, dtc_final } = promo

  const dispatch = useDispatch()

  const [des_breve_regulamento_promocao, set_des_breve_regulamento_promocao] = useState(promo.des_breve_regulamento_promocao)
  const [des_regulamento, set_des_regulamento] = useState(promo.des_regulamento)

  const handleChangeRegulamentoBreve = des_breve_regulamento_promocao => {
    set_des_breve_regulamento_promocao(des_breve_regulamento_promocao)
  }

  const handleChangeRegulamentoLongo = des_regulamento => {
    set_des_regulamento(des_regulamento)
  }

  const handleBlurRegulamentoBreve = () => {
    // dispatch(changeCodPromocao(des_breve_regulamento_promocao))
  }

  const handleBlurRegulamentoLongo = () => {
    // dispatch(changeDesPromocao(des_regulamento))
  }

  return (
    <Stack spacing={1}>
      <TextField
        required
        fullWidth
        multiline
        rows={2}
        id='des_breve_regulamento_promocao'
        label='Regulamento Breve'
        onChange={e => handleChangeRegulamentoBreve(e.target.value)}
        onBlur={handleBlurRegulamentoBreve}
        value={des_breve_regulamento_promocao}
      />
      <TextField
        required
        fullWidth
        multiline
        rows={4}
        id='des_regulamento'
        label='Regulamento Longo'
        onChange={e => handleChangeRegulamentoLongo(e.target.value)}
        onBlur={handleBlurRegulamentoLongo}
        value={des_regulamento}
      />
    </Stack>
  )
}

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function TransferList({ options }) {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(Object.keys(options));
  const [right, setRight] = React.useState([]);

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
    <Paper sx={{ width: '100%', height: 230, overflow: 'auto' }}>
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
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid sm={5} item>{customList(left)}</Grid>
      <Grid sm={2} item>
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
      <Grid sm={5} item>{customList(right)}</Grid>
    </Grid>
  );
}

export default function General() {
  return (
    <React.Fragment>
      <Header />
      <OptionsRegulation />
      <Stack spacing={2} alignItems='center'>
        <TransferList options={tipo_linha} />
        <TransferList options={segmento} />
        <TransferList options={sistema_origem} />
      </Stack>
    </React.Fragment>
  )
}

