const _ = require('lodash')

const get_cod_segmento = {
  'DIAMANTE1': 1,
  'DIAMANTE2': 2,
  'DIAMANTE3': 3,
  'RUBI1': 4,
  'RUBI2': 5,
  'RUBI3': 6,
  'ESMERALDA1': 7,
  'ESMERALDA2': 8,
  'ESMERALDA3': 9,
  'SAFIRA': 10,
  'NAO SEGMENTADO': 11,
  'DESCRICAO A CADASTRAR': 12,
  'V': 30,
  'PLATINUM': 31,
  'GOLD': 32,
  'SILVER': 33,
  'SILVER - BABY SITTING': 34,
  'SEM SEGMENTO': 35,
  'NAO CLASSIFICADO': 36,
}

const get_cod_origem = {
  'PÓS-PAGO': 0,
  'PRÉ-PAGO': 1,
  'URA': 2,
  'VOL': 3,
  'TAV': 4,
  'SGP': 5,
  'SMS': 6,
  'ARQUIVO DE CARGA': 7,
  'AUTOMATICO SISTEMA': 10,
  'CONTROLE': 11,
  'NFO': 12,
  'SCREENPOP': 13,
  'VIVONET': 14,
  'CI': 15,
  'IVR': 16,
  'SMS INTERATIVO': 17,
  'VOL MG': 18,
  'SIMCARD': 19,
  'HOTSITE': 20,
  'CHAT': 21,
  'LOJA SERVIÇOS 1515': 22,
  'POS-PAGO FIXO': 23,
  'ATLYS': 24,
  'NGIN': 25,
  'SMS': 26,
  'E-MAIL': 27,
  'DISCADOR GENESYS': 28,
  'USSD': 29,
  'MEU VIVO MOBILE': 30,
  'LOJA SERV E DOWNLOAD': 31,
  'FRAMEWORK MOBILE': 32,
}

const get_cod_tipo_linha = {
  'POS-PAGO CDMA': 1,
  'PRE-PAGO CDMA': 2,
  'NAO CLASSIFICADO': 3,
  'CONTROLE CDMA': 4,
  'POS-PAGO GSM': 5,
  'PRE-PAGO GSM': 6,
  'CONTROLE GSM': 7,
  'LINHA INDIVIDUAL': 9,
  'LINHA PRIVATIVA': 10,
  'DDR E MULTILINK CORP': 134,
  'CARTCO': 1340,
  'CARTAO': 1343,
  'CARTOES CORP': 1360,
  'TELEF USO PUBLICO': 1555,
  'MULTILINK BASICO': 1556,
  'LINHA TRONCO': 1557,
  'REDE INTELIGENTE': 1558,
  'CSDIGO ESPECIAL': 1559,
  'TV': 1740,
  'LIRX': 4336,
  'LINX': 4337,
}

const get_region_from_ddd = {
  '79': 'BA',
  '77': 'BA',
  '75': 'BA',
  '74': 'BA',
  '73': 'BA',
  '71': 'BA',
  '67': 'CO',
  '68': 'CO',
  '69': 'CO',
  '91': 'CO',
  '92': 'CO',
  '93': 'CO',
  '94': 'CO',
  '95': 'CO',
  '96': 'CO',
  '97': 'CO',
  '98': 'CO',
  '99': 'CO',
  '65': 'CO',
  '64': 'CO',
  '63': 'CO',
  '62': 'CO',
  '61': 'CO',
  '66': 'CO',
  '31': 'MG',
  '32': 'MG',
  '33': 'MG',
  '34': 'MG',
  '35': 'MG',
  '37': 'MG',
  '38': 'MG',
  '81': 'NE',
  '82': 'NE',
  '83': 'NE',
  '84': 'NE',
  '89': 'NE',
  '86': 'NE',
  '87': 'NE',
  '88': 'NE',
  '85': 'NE',
  '49': 'PR',
  '48': 'PR',
  '47': 'PR',
  '46': 'PR',
  '45': 'PR',
  '44': 'PR',
  '43': 'PR',
  '41': 'PR',
  '42': 'PR',
  '23': 'RJ',
  '21': 'RJ',
  '22': 'RJ',
  '24': 'RJ',
  '27': 'RJ',
  '28': 'RJ',
  '29': 'RJ',
  '26': 'RJ',
  '25': 'RJ',
  '51': 'RS',
  '55': 'RS',
  '53': 'RS',
  '54': 'RS',
  '14': 'SP',
  '13': 'SP',
  '12': 'SP',
  '11': 'SP',
  '15': 'SP',
  '17': 'SP',
  '18': 'SP',
  '19': 'SP',
  '16': 'SP'
}

const translate_questions = {
  "INTERNET": "COMPL. INTERNET",
  "MINUTOS OUTRAS OPERADORAS": "MINUTOS OUTRAS OP.",
  "MINUTOS": "COMPL. MINUTOS",
  "SMS OUTRAS OPERADORAS": "SMS OUTRAS OP.",
  "SMS": "COMPL. SMS",
  "STEPS PROMOCIONAIS": "COMPL. TARIFAS"
}

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

const get_dtc_inicio = (rows) => {
  const ROW = 5
  const COL = 5

  const dtc_inicio = rows[ROW][COL]

  return new Date(dtc_inicio).toLocaleDateString('pt-BR', { timeZone: 'Europe/London' })
}

const get_dtc_final = (rows) => {
  const ROW = 6
  const COL = 5

  const dtc_final = rows[ROW][COL]

  return new Date(dtc_final).toLocaleDateString('pt-BR', { timeZone: 'Europe/London' })
}

const mount_header = (rows, promo) => {
  const header = {}
  header['ddds'] = get_ddds(rows).map(ddd => ({ ddd, sts_ativo: 'S' }))
  header['des_promocao'] = get_des_promocao(rows)
  header['cod_promocao'] = get_cod_promocao(rows)
  header['dtc_inicio'] = get_dtc_inicio(rows)
  header['dtc_final'] = get_dtc_final(rows)
  header['cod_promocao_legado'] = get_cod_legado(rows)
  return header
}

const get_question = (rows, row) => {
  const ROW = row
  const COL_TYPE = 1
  const COL_QUES = 2
  const COL_ANSW = 4

  const type = translate_questions[rows[ROW][COL_TYPE]]
    ? translate_questions[rows[ROW][COL_TYPE]]
    : rows[ROW][COL_TYPE]
  const ques = rows[ROW][COL_QUES]
  const answ = rows[ROW][COL_ANSW]

  return { type, ques, answ }
}

const get_questions = (rows) => {
  const ROW_INI = 23
  const ROW_END = 32

  const questions = []

  for (let row = ROW_INI; row <= ROW_END; row++) {
    questions.push(get_question(rows, row))
  }

  return questions
}

const get_partial_row = (rows, row) => {
  const ROW = row
  const COL_QUES = 1
  const COL_ANSW = 2

  const type = 'STEPS PROMOCIONAIS'
  const ques = rows[ROW][COL_QUES]
  const answ = rows[ROW][COL_ANSW]

  return { type, ques, answ }
}

const get_partial = (rows) => {
  const ROW_INI = 36
  const ROW_END = 46

  const partial = []

  for (let row = ROW_INI; row <= ROW_END; row++) {
    partial.push(get_partial_row(rows, row))
  }

  return partial
}

const mount_questionnaire = (rows, promo) => {
  const questionario = {}
  questionario['des_questionario'] = `${promo.cod_promocao} - ${promo.des_promocao}`

  questionario['perguntas_respostas'] = [
    ...get_questions(rows),
    ...get_partial(rows)
  ]
    .filter(question =>
      Object.values(question).every(value => value != null)
    )
    .map((question, index) => (
      {
        'pergunta': {
          'id_pergunta': '',
          'des_pergunta': question.ques,
          'des_categoria_pergunta': question.type,
          'num_orgem': index + 1,
          'sts_ativo': 'S',
          'sts_obrigatorio': 'S'
        },
        'resposta': {
          'id_pergunta': '',
          'id_resposta_reg_prom': '',
          'des_resposta': question.answ
        }
      }
    ))

  return { questionario }
}

const get_regulamento_breve = (rows) => {
  const ROW = 9
  const COL = 1

  const regulamento_breve = rows[ROW][COL]

  return regulamento_breve
}

const get_regulamento_longo = (rows) => {
  const ROW = 11
  const COL = 1

  const regulamento_longo = rows[ROW][COL]

  return regulamento_longo
}

const get_beneficios = (rows) => {
  const ROW_INTERNET = 15, COL_INTERNET = 2
  const internet = rows[ROW_INTERNET][COL_INTERNET]

  const ROW_VIVO_VIVO = 16, COL_VIVO_VIVO = 2
  const vivo_vivo = rows[ROW_VIVO_VIVO][COL_VIVO_VIVO]

  const ROW_VIVO_OTHER = 17, COL_VIVO_OTHER = 2
  const vivo_other = rows[ROW_VIVO_OTHER][COL_VIVO_OTHER]

  const ROW_SMS = 18, COL_SMS = 2
  const sms = rows[ROW_SMS][COL_SMS]

  const ROW_OTHERS = 19, COL_OTHERS = 2
  const others = rows[ROW_OTHERS][COL_OTHERS]

  return { '1': internet, '2': vivo_vivo, '3': vivo_other, '4': sms, '5': others }
}

const get_sts_aceite_promocao = (rows) => {
  const ROW = 15
  const COL = 5

  const sts_aceite_promocao = rows[ROW][COL]

  return sts_aceite_promocao
}

const get_sts_cons_cupons = (rows) => {
  const ROW = 16
  const COL = 5

  const sts_cons_cupons = rows[ROW][COL]

  return sts_cons_cupons
}

const get_sts_precendente = (rows) => {
  const ROW = 17
  const COL = 5

  const sts_precendente = rows[ROW][COL]

  return sts_precendente
}

const get_sts_cons_premios = (rows) => {
  const ROW = 18
  const COL = 5

  const sts_cons_premios = rows[ROW][COL]

  return sts_cons_premios
}

const get_sts_cons_quest = (rows) => {
  const ROW = 19
  const COL = 5

  const sts_cons_quest = rows[ROW][COL]

  return sts_cons_quest
}

const get_cod_tipo_linhas = (rows) => {
  const ROW = 35
  const COL = 4

  const tipo_linha = rows[ROW][COL]

  return tipo_linha.toUpperCase().split(/\,\s*/g).map(tipo => get_cod_tipo_linha[tipo])
}

const get_cod_segmentos = (rows) => {
  const ROW = 39
  const COL = 4

  const segmentos = rows[ROW][COL]

  return segmentos.toUpperCase().split(/\,\s*/g).map(segmento => get_cod_segmento[segmento])
}

const get_cod_legado_origem = (rows) => {
  const ROW = 43
  const COL = 4

  const legados = rows[ROW][COL]

  return legados.toUpperCase().split(/\,\s*/g).map(legado => get_cod_origem[legado])
}

const mount_regulation = (rows, promo) => {
  const regulamento = {}
  regulamento['sts_aceite_promocao'] = get_sts_aceite_promocao(rows)[0]
  regulamento['sts_cons_cupons'] = get_sts_cons_cupons(rows)[0]
  regulamento['sts_precendente'] = get_sts_precendente(rows)[0]
  regulamento['sts_cons_premios'] = get_sts_cons_premios(rows)[0]
  regulamento['sts_cons_quest'] = get_sts_cons_quest(rows)[0]
  regulamento['des_regulamento'] = get_regulamento_longo(rows)
  regulamento['des_breve_regulamento_promocao'] = get_regulamento_breve(rows)
  regulamento['regulamento_segmento'] = get_cod_segmentos(rows).map(cod => ({ 'cod': cod }))
  regulamento['regulamento_tipo_linha'] = get_cod_tipo_linhas(rows).map(cod => ({ 'cod': cod }))
  regulamento['regulamento_legado_origem'] = get_cod_legado_origem(rows).map(cod => ({ 'cod': cod }))
  regulamento['regulamento_beneficios'] = Object.entries(get_beneficios(rows)).map(([key, value]) => (
    {
      'id_regulamento_beneficio': '',
      'id_tipo_beneficio': Number(key),
      'des_regulamento_beneficio': value
    }
  ))

  return { questionario: { regulamento } }
}

const mount_volta_v = (rows, promo) => {
  const volta_v = []

  return { volta_v }
}

const mount_promotion_list = (rows, promo) => {
  const lista_promocao = {}

  return { lista_promocao }
}

const get_regionais = (rows, promo) => {
  const regionais_cod = {}
  for (const { ddd } of promo.ddds) {
    regionais_cod[get_region_from_ddd[ddd]] = {
      "cod_regional": get_region_from_ddd[ddd],
    }
  }

  const regionais = []
  Object.entries(regionais_cod).forEach(([key, value]) => regionais.push(value))

  return regionais
}

const mount_online_param = (rows, promo) => {
  const parametro_online = {}

  parametro_online['regionais'] = get_regionais(rows, promo);

  return { parametro_online }
}

const SGP_BASE = {
  'ativavel': 'N',
  'gera_protocolo': 'N',
  'so_dealer_ativa': 'N',
  'sts_historico': 'N',
  'sts_exclusao': 'N',
  'cod_duplicidade': 'S',
  'cod_cadastramento_url': 'S',
  'cod_cadastramento_sgp': 'S',
  'sts_cad_manual': 'N',
  'sts_inf_dealer': 'N',
  'sts_excluida': 'N',
  'sts_valida_unidade': 'I',
  'cod_tip_promocao': 'CONSU',
  'dtc_final_contingencia': '01/12/2050',
  'dtc_historico': '01/12/2050',
  'dtc_exclusao': '01/12/2050',
  'qtd_dias_dupl': 1,
  'id_grupo_promocao': 1,
  'num_ordem': 1,
  'des_dir_carga_recarga_out': '/sgp/PROMOCOES/NAT2008',
  'questionario': {
    'id_questionario': '',
    'sts_ativo': 'S',
    'regulamento': {
      'id_regulamento_promocao': '',
      'sts_ativo': 'S',
    }
  },
  "parametro_online": {
    "id_parametro": "",
    "cod_service_add": "mblTransAddPromotion",
    "cod_service_remove": "mblTransRemovePromotion",
    "cod_username": "SGP",
    "id_interface": 1,
    "id_legado_linha": 1,
    "cod_premio_enviado": null,
    "cod_comando": "7030",
    "destinos": [
      { "id_legado_destino": 1 },
      { "id_legado_destino": 11 }
    ],
  },
  "lista_promocao": {
    "id_legado_linha": 1,
    "des_observacao": "",
    "sts_ativo": "S",
    "acao": [
      { "sts_acao": 1 },
      { "sts_acao": 2 }
    ],
    "origem": [
      { "id_legado_origem": 2 },
      { "id_legado_origem": 12 },
      { "id_legado_origem": 16 },
      { "id_legado_origem": 17 },
      { "id_legado_origem": 29 },
      { "id_legado_origem": 2 },
    ]
  },
  "volta_v": {
    "sts_ativo": "S",
    "sts_cadastro": "S",
    "sts_ativacao": "N",
    "sts_consulta": "N",
    "sts_indicacao_erro": "N",
    "origem": [
      { "id_legado_origem": 2 },
      { "id_legado_origem": 3 },
      { "id_legado_origem": 4 },
      { "id_legado_origem": 12 },
      { "id_legado_origem": 16 },
      { "id_legado_origem": 17 },
      { "id_legado_origem": 29 }
    ]
  },
}

export default function BridgeExcelToSgp(promos, opt) {

  const promotions = {}

  for (const promo_name in promos) {
    const rows = promos[promo_name]

    let promo = {}
    promo = _.merge(promo, SGP_BASE)
    promo = _.merge(promo, opt)
    promo = _.merge(promo, mount_header(rows, promo))
    promo = _.merge(promo, mount_questionnaire(rows, promo))
    promo = _.merge(promo, mount_regulation(rows, promo))
    // promo = _.merge(promo, mount_volta_v(rows, promo))
    // promo = _.merge(promo, mount_promotion_list(rows, promo))
    promo = _.merge(promo, mount_online_param(rows, promo))

    promotions[promo_name] = promo
  }

  return promotions
}