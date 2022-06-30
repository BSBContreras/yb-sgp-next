import readXlsxFile from 'read-excel-file'

const DATA_CONSULT = 'Dados Consulta'

export default async function readExcelPromo(file) {
  const sheets = await readXlsxFile(file, { getSheets: true })
  const names = sheets.filter(({ name }) => name !== DATA_CONSULT)
  const promises = names.map(({ name }) => readXlsxFile(file, { sheet: name }))
  return await Promise.all(promises).then(values => {
    const promos = {}
    for (let i = 0; i < values.length; i++) {
      promos[names[i].name] = values[i]
    }
    return promos
  })
}
