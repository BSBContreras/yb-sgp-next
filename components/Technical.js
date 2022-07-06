import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from '@mui/material';

import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';

import RestartAltIcon from '@mui/icons-material/RestartAlt';

const defaults = {
  cod_ip: {
    default: '10.129.178.160',
    getDefault: function () { return this.default }
  },
  num_porta: {
    default: {
      '10.129.227.131': '1521',
      '10.129.227.130': '1521',
      '10.129.178.160': '1521',
      '10.128.5.107': '1521'
    },
    getDefault: function (cod_ip) { return this.default[cod_ip] }
  },
  num_max_tent: {
    default: 2,
    getDefault: function () { return this.default }
  },
  num_tent: {
    default: 2,
    getDefault: function (num_max_tent) { return Math.min(this.default, num_max_tent) }
  },
  num_tempo_tent: {
    default: 60,
    getDefault: function () { return this.default }
  },
  num_tempo_timeout: {
    default: 10,
    getDefault: function () { return this.default }
  },
}

const servers = {
  '10.129.227.131': 'QA1',
  '10.129.227.130': 'QA2',
  '10.129.178.160': 'PreProd',
  '10.128.5.107': 'Produção'
}

export default function Technical({ handleChangeState }) {

  const [cod_ip, set_cod_ip] = useState(defaults.cod_ip.getDefault()) // PreProd Default
  const [num_porta, set_num_porta] = useState(defaults.num_porta.getDefault(cod_ip)) // 8004 Default
  const [num_max_tent, set_num_max_tent] = useState(defaults.num_max_tent.getDefault()) // 2 Default
  const [num_tent, set_num_tent] = useState(defaults.num_tent.getDefault(num_max_tent)) // 2 Default
  const [num_tempo_tent, set_num_tempo_tent] = useState(defaults.num_tempo_tent.getDefault()) // 2 Default
  const [num_tempo_timeout, set_num_tempo_timeout] = useState(defaults.num_tempo_timeout.getDefault()) // 2 Default

  useEffect(() => {
    if (handleChangeState) {
      handleChangeState({
        "parametro_online": {
          cod_ip, num_porta, num_max_tent, num_tent, num_tempo_tent, num_tempo_timeout
        }
      })
    }
  }, [cod_ip, num_porta, num_max_tent, num_tent, num_tempo_tent, num_tempo_timeout])

  const handleChangeCodIp = cod_ip => {
    set_cod_ip(cod_ip)
    set_num_porta(defaults.num_porta.getDefault(cod_ip))
  }

  const handleChangeNumMaxTent = num_max_tent => {
    if (num_max_tent < 0) return
    set_num_max_tent(num_max_tent)
    handleChangeNumTent(Math.min(num_max_tent, num_tent))
  }

  const handleChangeNumTent = num_tent => {
    if (num_tent < 0) return
    set_num_tent(Math.max(Math.min(num_tent, num_max_tent), 0))
  }

  const handleChangeNumTempoTent = num_tempo_tent => {
    if (num_tempo_tent < 0) return
    set_num_tempo_tent(num_tempo_tent)
  }

  const handleChangeNumTempoTimeout = num_tempo_timeout => {
    if (num_tempo_timeout < 0) return
    set_num_tempo_timeout(num_tempo_timeout)
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Informacoes</TableCell>
            <TableCell>Dados</TableCell>
            <TableCell>Definir Padrao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>cod_service_add</TableCell>
            <TableCell>mblTransAddPromotion</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>cod_service_remove</TableCell>
            <TableCell>mblTransRemovePromotion</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>cod_username</TableCell>
            <TableCell>SGP</TableCell>
            <TableCell></TableCell>
          </TableRow>

          <TableRow>
            <TableCell>cod_ip</TableCell>
            <TableCell>
              <FormControl fullWidth>
                <InputLabel>cod_ip</InputLabel>
                <Select
                  id="cod_ip"
                  value={cod_ip}
                  label="cod_ip"
                  onChange={e => handleChangeCodIp(e.target.value)}
                >
                  {Object.entries(servers).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value} - {key}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleChangeCodIp(defaults.cod_ip.getDefault())} aria-label="reset">
                <RestartAltIcon />
              </IconButton>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>num_porta</TableCell>
            <TableCell>{num_porta}</TableCell>
            <TableCell></TableCell>
          </TableRow>

          <TableRow>
            <TableCell>cod_comando</TableCell>
            <TableCell>7030</TableCell>
            <TableCell></TableCell>
          </TableRow>

          <TableRow>
            <TableCell>num_max_tent</TableCell>
            <TableCell>
              <FormControl fullWidth>

                <TextField
                  id="num_max_tent"
                  value={num_max_tent}
                  label="num_max_tent"
                  type="number"
                  onChange={e => handleChangeNumMaxTent(e.target.value)}
                >

                </TextField>
              </FormControl>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleChangeNumMaxTent(defaults.num_max_tent.getDefault())} aria-label="reset">
                <RestartAltIcon />
              </IconButton>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>num_tent</TableCell>
            <TableCell>
              <FormControl fullWidth>

                <TextField
                  id="num_tent"
                  value={num_tent}
                  label="num_tent"
                  type="number"
                  onChange={e => handleChangeNumTent(e.target.value)}
                >

                </TextField>
              </FormControl>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleChangeNumTent(defaults.num_tent.getDefault(num_max_tent))} aria-label="reset">
                <RestartAltIcon />
              </IconButton>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>num_tempo_tent</TableCell>
            <TableCell>
              <FormControl fullWidth>

                <TextField
                  id="num_tempo_tent"
                  value={num_tempo_tent}
                  label="num_tempo_tent"
                  type="number"
                  onChange={e => handleChangeNumTempoTent(e.target.value)}
                >

                </TextField>
              </FormControl>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleChangeNumTempoTent(defaults.num_tempo_tent.getDefault())} aria-label="reset">
                <RestartAltIcon />
              </IconButton>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>num_tempo_timeout</TableCell>
            <TableCell>
              <FormControl fullWidth>

                <TextField
                  id="num_tempo_timeout"
                  value={num_tempo_timeout}
                  label="num_tempo_timeout"
                  type="number"
                  onChange={e => handleChangeNumTempoTimeout(e.target.value)}
                >

                </TextField>
              </FormControl>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleChangeNumTempoTimeout(defaults.num_tempo_timeout.getDefault())} aria-label="reset">
                <RestartAltIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}