const create_promocao = padrao => {

  const {
    des_promocao,
    cod_promocao,
    dtc_inicio,
    dtc_final,
    des_dir_carga_recarga_out,
    num_ordem,
    ativavel,
    gera_protocolo,
    so_dealer_ativa,
    sts_historico,
    sts_exclusao,
    cod_duplicidade,
    cod_cadastramento_url,
    cod_cadastramento_sgp,
    sts_cad_manual,
    sts_inf_dealer,
    sts_excluida,
    sts_valida_unidade,
    cod_tip_promocao,
    dtc_final_contingencia,
    dtc_historico,
    dtc_exclusao,
    qtd_dias_dupl,
    id_grupo_promocao,
  } = padrao

  const sql_insert_01 =
    `
INSERT INTO SGPPROD.promocao (
  des_promocao,
  cod_promocao,
  dtc_inicio,
  dtc_final,
  dtc_historico,
  des_dir_carga_recarga_out,
  ativavel,
  cod_tip_promocao,
  gera_protocolo,
  so_dealer_ativa,
  sts_valida_unidade,
  dtc_exclusao,
  sts_historico,
  sts_exclusao,
  cod_duplicidade,
  cod_cadastramento_url,
  cod_cadastramento_sgp,
  qtd_dias_dupl,
  sts_cad_manual,
  sts_inf_dealer,
  dtc_final_contingencia,
  sts_excluida, 
  ID_GRUPO_PROMOCAO,
  num_ordem
) VALUES (
  '${des_promocao}',
  '${cod_promocao}',
  'TO_DATE('${dtc_inicio}','DD/MM/YYYY')',
  'TO_DATE('${dtc_final}','DD/MM/YYYY')',
  'TO_DATE('${dtc_historico}','DD/MM/YYYY')',
  '${des_dir_carga_recarga_out}',
  '${ativavel}',
  '${cod_tip_promocao}',
  '${gera_protocolo}',
  '${so_dealer_ativa}',
  '${sts_valida_unidade}',
  'TO_DATE('${dtc_exclusao}','DD/MM/YYYY')',
  '${sts_historico}',
  '${sts_exclusao}',
  '${cod_duplicidade}',
  '${cod_cadastramento_url}',
  '${cod_cadastramento_sgp}',
  ${qtd_dias_dupl},
  '${sts_cad_manual}',
  '${sts_inf_dealer}',
  'TO_DATE('${dtc_final_contingencia}','DD/MM/YYYY')',
  '${sts_excluida}',
  ${id_grupo_promocao},
  ${num_ordem}
);
`
  return sql_insert_01
}

const create_questionario = padrao => {

  const {
    cod_promocao,
    des_promocao
  } = padrao

  const {
    des_questionario,
    sts_ativo
  } = padrao.questionario

  const {
    regulamento_beneficios
  } = padrao.questionario.regulamento

  const questionario_nome = `${cod_promocao} - ${des_promocao}`

  const sql_insert_01 =
    `
--CRIAÇÃO DO QUESTIONÁRIO e PROMOÇÃO ${questionario_nome}
SELECT SGPPROD.SEQ_QUESTIONARIO.NEXTVAL INTO V_SEQ_QUESTIONARIO FROM DUAL;

INSERT INTO SGPPROD.QUESTIONARIO VALUES (V_SEQ_QUESTIONARIO,'${questionario_nome}','${sts_ativo}');

${regulamento_beneficios.map(({ id_tipo_beneficio, des_regulamento_beneficio }) => `INSERT INTO SGPPROD.regulamento_beneficio VALUES (SGPPROD.SEQ_REGULAMENTO_BENEFICIO.NEXTVAL,'${des_regulamento_beneficio}',${id_tipo_beneficio},V_SEQ_QUESTIONARIO);`).join('\n')}
  `

  return sql_insert_01
}

const create_perguntas_respotas = padrao => {

  const {
    id_questionario,
    perguntas_respostas
  } = padrao.questionario

  const sql_insert_01 =
    `
    ${perguntas_respostas.map(({ pergunta, resposta }) => {
      return `
        SELECT SGPPROD.SEQ_PERGUNTA.NEXTVAL INTO V_SEQ_PERGUNTA FROM DUAL;
        INSERT INTO SGPPROD.PERGUNTA VALUES (V_SEQ_PERGUNTA,'${pergunta.des_pergunta}',V_SEQ_QUESTIONARIO,${pergunta.num_ordem},'${pergunta.sts_ativo}','${pergunta.sts_obrigatorio}',(SELECT ID_CATEGORIA_PERGUNTA FROM SGPPROD.CATEGORIA_PERGUNTA WHERE DES_CATEGORIA_PERGUNTA='${pergunta.des_categoria_pergunta}'));
        INSERT INTO SGPPROD.RESPOSTA_REGULAMENTO_PROMOCAO VALUES (SGPPROD.SEQ_RESPOSTA_REG_PROMOCAO.NEXTVAL,V_SEQ_QUESTIONARIO,V_SEQ_PERGUNTA, '${resposta.des_resposta}');
      `
    }).join('\n')}
  `

  return sql_insert_01
}

const create_regulamento = padrao => {

  const {
    cod_promocao,
    dtc_inicio,
    dtc_final,
    des_promocao,
    cod_promocao_legado
  } = padrao

  const {
    des_regulamento,
    sts_aceite_promocao,
    sts_cons_cupons,
    sts_precendente,
    sts_cons_premios,
    sts_cons_quest,
    sts_ativo,
    des_breve_regulamento_promocao
  } = padrao.questionario.regulamento

  const sql_insert_01 =
    `
SELECT SGPPROD.SEQ_REGULAMENTO_PROMOCAO.NEXTVAL INTO V_SEQ_REGULAMENTO_PROMOCAO FROM DUAL;

INSERT INTO SGPPROD.regulamento_promocao  VALUES (
  V_SEQ_REGULAMENTO_PROMOCAO,
  '${cod_promocao}',
  '${des_regulamento}',
  '${sts_aceite_promocao}',
  '${sts_cons_cupons}',
  '${sts_precendente}',
  '${sts_cons_premios}',
  '${sts_cons_quest}',
  TO_DATE('${dtc_inicio}','DD/MM/YYYY'),
  TO_DATE('${dtc_final}','DD/MM/YYYY'),
  '${cod_promocao}',
  '${cod_promocao_legado}',
  '${sts_ativo}',
  V_SEQ_QUESTIONARIO,
  '${des_promocao}',
  '${des_breve_regulamento_promocao}'
);
  `

  return sql_insert_01
}

const create_regulamento_ddd = padrao => {

  const {
    ddds
  } = padrao

  const sql_insert_01 =
    `
    ${ddds.map(({ ddd }) => `INSERT INTO SGPPROD.regulamento_ddd VALUES (SGPPROD.SEQ_REGULAMENTO_DDD.NEXTVAL,V_SEQ_REGULAMENTO_PROMOCAO,'${ddd}');`).join('\n')}
  `

  return sql_insert_01
}

const create_regulamento_configuracao = padrao => {

  const {
    regulamento_legado_origem,
    regulamento_segmento,
    regulamento_tipo_linha
  } = padrao.questionario.regulamento

  const sql_insert_01 = regulamento_legado_origem.map(({ cod }) => `INSERT INTO SGPPROD.regulamento_legado_origem VALUES (SGPPROD.SEQ_REGULAMENTO_LEGADO_ORIGEM.NEXTVAL,V_SEQ_REGULAMENTO_PROMOCAO,${cod});`).join('\n')
  const sql_insert_02 = regulamento_segmento.map(({ cod }) => `INSERT INTO SGPPROD.regulamento_segmento VALUES (SGPPROD.SEQ_REGULAMENTO_SEGMENTO.NEXTVAL,V_SEQ_REGULAMENTO_PROMOCAO,${cod});`).join('\n')
  const sql_insert_03 = regulamento_tipo_linha.map(({ cod }) => `INSERT INTO SGPPROD.regulamento_tipo_linha VALUES (SGPPROD.SEQ_REGULAMENTO_TIPO_LINHA.NEXTVAL,V_SEQ_REGULAMENTO_PROMOCAO,${cod});`).join('\n')

  return `${sql_insert_01}\n${sql_insert_02}\n${sql_insert_03}`
}

const create_premio = padrao => {

  const {
    cod_promocao,
    des_promocao,
    cod_promocao_legado
  } = padrao

  const sql_insert_01 =
    `
  INSERT INTO SGPPROD.premio VALUES ('${des_promocao}','${cod_promocao_legado}');
  INSERT INTO SGPPROD.promocao_premio VALUES ('${cod_promocao_legado}','${cod_promocao}');
  `

  return sql_insert_01
}

const create_cadastramento_voltav = padrao => {

  const {
    cod_promocao,
    dtc_inicio,
    dtc_final,
    cod_promocao_legado,
  } = padrao

  const {
    sts_ativo,
    sts_cadastro,
    sts_ativacao,
    sts_consulta,
    sts_indicacao_erro,
    origem
  } = padrao.volta_v

  const sql_insert_01 =
    origem.map(({ id_legado_origem }) => (
      `INSERT INTO SGPPROD.cadastramento_voltav VALUES (SGPPROD.SEQ_CADASTRAMENTO_VOLTAV.NEXTVAL,${cod_promocao},${id_legado_origem},TO_DATE('${dtc_inicio}','DD/MM/YYYY'),TO_DATE('${dtc_final}','DD/MM/YYYY'),'${sts_ativo}','${cod_promocao_legado}','${sts_cadastro}','${sts_ativacao}','${sts_consulta}','${sts_indicacao_erro}');`
    )).join('\n')

  return sql_insert_01
}

const create_lista_promocao = padrao => {

  const {
    cod_promocao,
    dtc_inicio,
    dtc_final,
    qtd_dias_dupl,
    ddds
  } = padrao

  const {
    id_legado_linha,
    des_observacao,
    sts_ativo,
    acao,
    origem
  } = padrao.lista_promocao

  return `
    ${origem.map(({ id_legado_origem }) => acao.map(({ sts_acao }) => {
    const sql_insert_01 = `\nINSERT INTO SGPPROD.lista_promocao VALUES (SGPPROD.SEQ_lista_promocao.NEXTVAL,'${cod_promocao}',TO_DATE('${dtc_inicio}','DD/MM/YYYY'),TO_DATE('${dtc_final}','DD/MM/YYYY'),${id_legado_origem},'${des_observacao}',${id_legado_linha},${sts_acao},'${sts_ativo}',${qtd_dias_dupl},TO_DATE('${dtc_final}','DD/MM/YYYY'));\n`
    const sql_insert_02 = ddds.map(({ ddd, sts_ativo: sts_ativo_ddd }) => (
      `INSERT INTO SGPPROD.lista_promocao_ddd VALUES (SGPPROD.SEQ_lista_promocao_DDD.NEXTVAL,SGPPROD.SEQ_lista_promocao.CURRVAL,'${cod_promocao}','${ddd}',TO_DATE('${dtc_inicio}','DD/MM/YYYY'),TO_DATE('${dtc_final}','DD/MM/YYYY'),'${sts_ativo_ddd}');`
    )).join('\n')
    return `${sql_insert_01}\n${sql_insert_02}`
  })).join('\n')}
  `
}

const create_parametro_online = padrao => {
  const {
    cod_promocao_legado,
    cod_promocao,
    dtc_inicio,
    dtc_final
  } = padrao

  const {
    cod_ip,
    num_porta,
    cod_comando,
    num_tent,
    num_max_tent,
    num_tempo_tent,
    num_tempo_timeout,
    cod_service_add,
    cod_username,
    id_legado_linha,
    regionais,
    id_interface,
    cod_premio_enviado,
    destinos
  } = padrao.parametro_online

  const sql_insert_01 =
    `${regionais.map(({ cod_regional }) => (
      destinos.map(({ id_legado_destino }) => (
        `INSERT INTO SGPPROD.parametro_online VALUES (${id_interface},'${cod_promocao}','${cod_regional}',TO_DATE('${dtc_inicio}','DD/MM/YYYY'),TO_DATE('${dtc_final}','DD/MM/YYYY'),'${cod_ip}','${num_porta}','${cod_promocao_legado}','${cod_comando}',${num_tent},${num_max_tent},${num_tempo_tent},'${cod_username}','${cod_service_add}',${cod_premio_enviado},${id_legado_destino},${num_tempo_timeout});`
      )).join('\n')
    )).join('\n')}`

  return `\n${sql_insert_01}\n`
}

const create_exc_ngin = padrao => {

  const {
    cod_promocao,
    dtc_inicio,
    dtc_final
  } = padrao

  const {
    cod_ip,
    num_porta,
    cod_comando,
    num_tent,
    num_tempo_tent,
    num_tempo_timeout,
    cod_service_remove,
    cod_username,
  } = padrao.parametro_online

  const sql_insert_01 = `
    INSERT INTO SGPPROD.PARAMETRO_EXC_NGIN VALUES (SGPPROD.SEQ_PARAMETRO_EXC_NGIN.NEXTVAL,'${cod_promocao}','${cod_ip}','${num_porta}','${cod_username}','${cod_service_remove}','${cod_comando}',TO_DATE('${dtc_inicio}','DD/MM/YYYY'),TO_DATE('${dtc_final}','DD/MM/YYYY'),${num_tent},${num_tempo_tent},${num_tempo_timeout}); 
  `

  return sql_insert_01

}

const create_parametro_ddd_ngin = padrao => {

  const {
    cod_promocao,
    dtc_inicio,
    dtc_final,
    ddds,
    cod_promocao_legado
  } = padrao

  const {
    id_legado_linha
  } = padrao.parametro_online

  const sql_insert_01 = `
  ${ddds.map(({ ddd }) => (
    `INSERT INTO SGPPROD.parametro_ddd_ngin (id_param_ddd_ngin,id_parametro,cod_inpromotion,cod_ddd,dtc_inicio,dtc_fim,id_legado_linha) VALUES (SGPPROD.SEQ_parametro_ddd_ngin.NEXTVAL,SGPPROD.SEQ_PARAMETRO_EXC_NGIN.CURRVAL,'${cod_promocao_legado}','${ddd}',TO_DATE('${dtc_inicio}','DD/MM/YYYY'),TO_DATE('${dtc_final}','DD/MM/YYYY'),${id_legado_linha});`
  )).join('\n')}
  `

  return sql_insert_01
}

const create_header = (padrao, index) => {

  const {
    cod_promocao_legado
  } = padrao

  return `
SET TIME ON
SET TIMI ON
SET ECHO ON
SET DEFINE OFF

SPOOL A_${(index + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}_PTI${cod_promocao_legado}.log

DECLARE 
---------------------------------------------------
-- 			INICIO CRIACAO DAS VARIAVEIS		 --
---------------------------------------------------

V_SEQ_REGULAMENTO_PROMOCAO		  NUMBER;
V_SEQ_QUESTIONARIO  		      NUMBER;
V_SEQ_PERGUNTA 		              NUMBER;

BEGIN

V_SEQ_REGULAMENTO_PROMOCAO		  := 0;
V_SEQ_QUESTIONARIO	        	  := 0;
V_SEQ_PERGUNTA		              := 0;
  `
}

const create_footer = padrao => {
  return `
COMMIT;

END;
/

SPOOL OFF;
SET TIME OFF;
SET TIMI OFF;
SET ECHO OFF;

EXIT;
`
}

export default function BridgeSgpToSql(promos, opt) {

  const promotions = {}

  for (const promo_name in promos) {
    const rows = promos[promo_name]

    let promo = ''

    promo = promo.concat(create_header(rows, 0))
    promo = promo.concat(create_promocao(rows))
    promo = promo.concat(create_questionario(rows))
    promo = promo.concat(create_perguntas_respotas(rows))
    promo = promo.concat(create_regulamento(rows))
    promo = promo.concat(create_regulamento_ddd(rows))
    promo = promo.concat(create_regulamento_configuracao(rows))
    promo = promo.concat(create_premio(rows))
    promo = promo.concat(create_cadastramento_voltav(rows))
    promo = promo.concat(create_lista_promocao(rows))
    promo = promo.concat(create_cadastramento_voltav(rows))
    promo = promo.concat(create_parametro_online(rows))
    promo = promo.concat(create_exc_ngin(rows))
    promo = promo.concat(create_parametro_ddd_ngin(rows))
    promo = promo.concat(create_footer(rows))

    promotions[promo_name] = promo
  }

  return promotions
}