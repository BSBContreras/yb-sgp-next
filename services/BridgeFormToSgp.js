import { segmento, sistema_origem, tipo_linha, region } from '../dictionary'

const _ = require('lodash')

const mount_header = (state, promotion) => {
  const header = {}
  header['ddds'] = state.general.areaCode.map(ddd => ({ ddd, sts_ativo: 'S' }))
  header['des_promocao'] = state.general.promo.des_promocao
  header['cod_promocao'] = state.general.promo.cod_promocao
  header['dtc_inicio'] = new Date(state.general.promo.dtc_inicial).toLocaleDateString('pt-BR', { timeZone: 'Europe/London' })
  header['dtc_final'] = new Date(state.general.promo.dtc_final).toLocaleDateString('pt-BR', { timeZone: 'Europe/London' })
  header['cod_promocao_legado'] = state.general.promo.cod_legado
  return header
}

const mount_regulation = (state, promotion) => {
  const regulamento = {}
  regulamento['sts_aceite_promocao'] = state.regulation.options.sts_aceite_promocao
  regulamento['sts_cons_cupons'] = state.regulation.options.sts_cons_cupons
  regulamento['sts_precendente'] = state.regulation.options.sts_precendente
  regulamento['sts_cons_premios'] = state.regulation.options.sts_cons_premios
  regulamento['sts_cons_quest'] = state.regulation.options.sts_cons_quest
  regulamento['des_regulamento'] = state.regulation.regulation.des_regulamento
  regulamento['des_breve_regulamento_promocao'] = state.regulation.regulation.des_breve_regulamento_promocao
  regulamento['regulamento_segmento'] = state.regulation.segment.map(seg => ({ 'cod': segmento[seg] }))
  regulamento['regulamento_tipo_linha'] = state.regulation.lineType.map(typ => ({ 'cod': tipo_linha[typ] }))
  regulamento['regulamento_legado_origem'] = state.regulation.sourceSystem.map(src => ({ 'cod': sistema_origem[src] }))
  regulamento['regulamento_beneficios'] = Object.entries(state.general.benefits).map(([key, value]) => (
    {
      'id_regulamento_beneficio': '',
      'id_tipo_beneficio': Number(key),
      'des_regulamento_beneficio': value
    }
  ))

  return { questionario: { regulamento } }
}

const mount_questionnaire = (state, promotion) => {
  const questionario = {}
  questionario['des_questionario'] = `${state.general.promo.cod_promocao} - ${state.general.promo.des_promocao}`
  questionario['perguntas_respostas'] = state.questionnaire.questions
    .filter(question => Object.values(question).every(value => value != null))
    .map((question, index) => (
      {
        'pergunta': {
          'id_pergunta': '',
          'des_pergunta': question.des_pergunta,
          'des_categoria_pergunta': question.des_categoria_pergunta,
          'num_orgem': index + 1,
          'sts_ativo': 'S',
          'sts_obrigatorio': 'S'
        },
        'resposta': {
          'id_pergunta': '',
          'id_resposta_reg_prom': '',
          'des_resposta': question.des_resposta
        }
      }
    ))

  return { questionario }
}

const get_regionais = (state, promotions) => {
  const regionais_cod = {}
  for (const { ddd } of promotions.ddds) {
    regionais_cod[region[ddd]] = {
      "cod_regional": region[ddd],
    }
  }

  const regionais = []

  Object.values(regionais_cod).forEach((value) => regionais.push(value))

  return regionais
}

const mount_online_param = (state, promotions) => {
  const parametro_online = {}

  parametro_online['regionais'] = get_regionais(state, promotions);

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

export default function BridgeFormToSgp(state, opt) {

  console.log(state)

  let promotion = {}

  promotion = _.merge(promotion, SGP_BASE)
  promotion = _.merge(promotion, state.technical)
  promotion = _.merge(promotion, mount_header(state, promotion))
  promotion = _.merge(promotion, mount_questionnaire(state, promotion))
  promotion = _.merge(promotion, mount_regulation(state, promotion))
  // promotion = _.merge(promotion, mount_volta_v(rows, promotion))
  // promotion = _.merge(promotion, mount_promotion_list(rows, promotion))
  promotion = _.merge(promotion, mount_online_param(state, promotion))

  return promotion
}