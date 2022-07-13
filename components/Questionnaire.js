import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushQuestion, removeQuestion, selectQuestionnaire } from '../redux/QuestionnaireSlice';

import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

const categoria_pergunta = {
  '1': 'VALOR PROMOCAO',
  '2': 'BENEFICIOS',
  '3': 'FRANQUIA',
  '4': 'VELOCIDADE DOWNLOAD',
  '5': 'VELOCIDADE UPLOAD',
  '6': 'INTERNET',
  '7': 'MINUTOS VIVO',
  '8': 'MINUTOS OUTRAS OPERADORAS',
  '9': 'TARIFAÇÃO MINUTOS',
  '10': 'MINUTOS',
  '11': 'SMS VIVO',
  '12': 'SMS OUTRAS OPERADORAS',
  '13': 'SMS TARIFAÇÃO',
  '14': 'SMS',
  '15': 'TARIFAS',
}


function Question({ question }) {

  const dispatch = useDispatch()

  const {
    des_categoria_pergunta,
    des_pergunta,
    des_resposta,
    index
  } = question

  const handleRemoveQuestion = () => {
    dispatch(removeQuestion(index))
  }

  return (
    <TableRow>
      <TableCell>
        {des_categoria_pergunta}
      </TableCell>
      <TableCell>
        {des_pergunta}
      </TableCell>
      <TableCell>
        {des_resposta}
      </TableCell>
      <TableCell>
        <IconButton onClick={handleRemoveQuestion} aria-label='delete'>
          <ClearIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

function CreateQuestion() {

  const dispatch = useDispatch()

  const [des_categoria_pergunta, set_des_categoria_pergunta] = useState('')
  const [des_pergunta, set_des_pergunta] = useState('')
  const [des_resposta, set_des_resposta] = useState('')

  const handleCategoriaPergunta = des_categoria_pergunta => {
    set_des_categoria_pergunta(des_categoria_pergunta)
  }

  const handleChangePergunta = des_pergunta => {
    set_des_pergunta(des_pergunta)
  }

  const handleChangeResposta = des_resposta => {
    set_des_resposta(des_resposta)
  }

  const handleCreateQuestion = () => {
    dispatch(pushQuestion({
      des_categoria_pergunta,
      des_pergunta,
      des_resposta
    }))
  }

  return (
    <TableRow>

      <TableCell>
        <FormControl fullWidth>
          <InputLabel>Tipo de Pegunta</InputLabel>
          <Select
            required
            fullWidth
            id='des_categoria_pergunta'
            value={des_categoria_pergunta}
            label='Tipo de Pegunta'
            onChange={e => handleCategoriaPergunta(e.target.value)}
          >
            {Object.entries(categoria_pergunta).map(([key, value]) => (
              <MenuItem key={key} value={value}>{value} - {key}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>

      <TableCell>
        <TextField
          required
          fullWidth
          id='des_pergunta'
          label='Pergunta'
          onChange={e => handleChangePergunta(e.target.value)}
          value={des_pergunta}
        />
      </TableCell>

      <TableCell>
        <TextField
          required
          fullWidth
          id='des_resposta'
          label='Reposta'
          onChange={e => handleChangeResposta(e.target.value)}
          value={des_resposta}
        />
      </TableCell>

      <TableCell>
        <IconButton onClick={handleCreateQuestion} aria-label='add'>
          <AddIcon />
        </IconButton>
      </TableCell>

    </TableRow>
  )
}

export default function Questionnaire() {

  const { questions } = useSelector(selectQuestionnaire)

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tipo de Pergunta</TableCell>
            <TableCell>Pergunta</TableCell>
            <TableCell>Resposta</TableCell>
            <TableCell>Açao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, index) => (
            <Question key={index} question={{ ...question, index }} />
          ))}
          <CreateQuestion />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
