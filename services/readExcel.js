import readXlsxFile from 'read-excel-file'

const DATA_CONSULT = 'Dados Consulta'
const filterOnlyDataSheet = ({ name }) => (name !== DATA_CONSULT)

const get_des_promocao = (rows) => {
  const ROW = 3
  const COL = 2

  const des_promocao = rows[ROW][COL]

  return des_promocao
}

const get_ddds = (rows) => {
  const ROW = 4
  const COL = 2

  const ddds = rows[ROW][COL]

  return ddds.split(',').map(num => Number(num))
}

const get_cod_consulta = (rows) => {
  const ROW = 6
  const COL = 2

  const cod_consulta = rows[ROW][COL]

  return cod_consulta
}

const get_cod_promocao = (rows) => {
  const ROW = 3
  const COL = 5

  const cod_promocao = rows[ROW][COL]

  return cod_promocao
}

const get_cod_legado = (rows) => {
  const ROW = 4
  const COL = 5

  const cod_legado = rows[ROW][COL]

  return cod_legado
}

const format_date = (inputDate) => {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date
    .toString()
    .padStart(2, '0');

  month = month
    .toString()
    .padStart(2, '0');

  return `${date}/${month}/${year}`;
}

const get_dtc_inicio = (rows) => {
  const ROW = 5
  const COL = 5

  const dtc_inicio = rows[ROW][COL]

  return format_date(new Date(dtc_inicio))
}

const get_dtc_final = (rows) => {
  const ROW = 6
  const COL = 5

  const dtc_final = rows[ROW][COL]

  return format_date(new Date(dtc_final))
}

const mount_header = (rows) => {
  const header = {}
  header['ddds'] = get_ddds(rows).map(ddd => ({ ddd, sts_ativo: 'S' }))
  header['des_promocao'] = get_des_promocao(rows)
  header['cod_promocao'] = get_cod_promocao(rows)
  header['dtc_inicio'] = get_dtc_inicio(rows)
  header['dtc_final'] = get_dtc_final(rows)
  header['cod_promocao_legado'] = get_cod_legado(rows)
  return header
}

const get_default_header = (header) => {
  const default_header = {}
  default_header["ativavel"] = "N"
  default_header["gera_protocolo"] = "N"
  default_header["so_dealer_ativa"] = "N"
  default_header["sts_historico"] = "N"
  default_header["sts_exclusao"] = "N"
  default_header["cod_duplicidade"] = "S"
  default_header["cod_cadastramento_url"] = "S"
  default_header["cod_cadastramento_sgp"] = "S"
  default_header["sts_cad_manual"] = "N"
  default_header["sts_inf_dealer"] = "N"
  default_header["sts_excluida"] = "N"
  default_header["sts_valida_unidade"] = "I"
  default_header["cod_tip_promocao"] = "CONSU"
  default_header["dtc_final_contingencia"] = "01/12/2050"
  default_header["dtc_historico"] = "01/12/2050"
  default_header["dtc_exclusao"] = "01/12/2050"
  default_header["qtd_dias_dupl"] = 1
  default_header["id_grupo_promocao"] = 1
  return default_header
}


function readExcelPromo(file) {
  return new Promise((resolve, reject) => {
    readXlsxFile(file, { getSheets: true }).then(sheets => {

      const alreadyUsedDDDs = {}
      const promos = {}

      // sheets.push({ name: 'Planilha2' })

      sheets.filter(filterOnlyDataSheet).forEach(({ name }, i) => {
        try {
          readXlsxFile(file, { sheet: name }).then(rows => {

            promos[name] = rows

            console.log(mount_header(rows))

            // for (const ddd in ddds) {
            //   const usedfrom = alreadyUsedDDDs[ddd]
            //   if (usedfrom) {
            //     console.log(`O DDD: ${ddd} já foi usado pela promoção ${usedfrom}.`)
            //   } else {
            //     alreadyUsedDDDs[ddd] = name
            //   }
            // }
          })
        } catch (error) {
          reject(error)
        }
      })

      resolve(promos)

    })
  })
}

export default readExcelPromo
