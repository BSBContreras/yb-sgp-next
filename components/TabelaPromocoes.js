import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';

// const promo = {
//   "Padrao 1": {

//     "ddds": [
//       {
//         "ddd": "12",
//         "UF": "SP",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "81",
//         "UF": "RJ",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "82",
//         "UF": "RJ",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "83",
//         "UF": "SP",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "84",
//         "UF": "RJ",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "85",
//         "UF": "RJ",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "98",
//         "UF": "SP",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "41",
//         "UF": "RJ",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "88",
//         "UF": "RJ",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "42",
//         "UF": "RJ",
//         "sts_ativo": "S",
//       },
//       {
//         "ddd": "86",
//         "UF": "RJ",
//         "sts_ativo": "S",
//       }
//     ],

//     "des_promocao": "Vivo Pré Conectado Plus",
//     "cod_promocao": "VT843",
//     "dtc_inicio": "05/01/2022",
//     "dtc_final": "31/12/2999",
//   }
// }

export default function TabelaPromocoes({ promotions }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Codigo Promocao</TableCell>
            <TableCell>Nome Promocao</TableCell>
            <TableCell>Data de Inicio</TableCell>
            <TableCell>DDDs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(promotions).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell><Avatar><PhoneAndroidIcon /></Avatar></TableCell>
              <TableCell>{value.cod_promocao}</TableCell>
              <TableCell>{value.des_promocao}</TableCell>
              <TableCell>{value.dtc_inicio}</TableCell>
              <TableCell>{value.ddds.map(({ ddd }) => ddd).join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
