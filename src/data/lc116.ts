// Tabela LC 116/2003 (atualizada pela LC 157/2016 e LC 175/2020)
// code = item (2d) + subitem (2d) + desdobro (2d), ex: "010201" = item 1, sub 02, desdobro 01

export interface Lc116Item {
  code: string;
  label: string;
}

export const LC116: Lc116Item[] = [
  // 01 — Informática e congêneres
  { code: '010101', label: '1.01 — Análise e desenvolvimento de sistemas' },
  { code: '010201', label: '1.02 — Programação' },
  { code: '010301', label: '1.03 — Processamento, armazenamento ou hospedagem de dados, textos, imagens, vídeos, páginas eletrônicas, aplicativos e sistemas de informação' },
  { code: '010401', label: '1.04 — Elaboração de programas de computadores, inclusive jogos eletrônicos' },
  { code: '010501', label: '1.05 — Licenciamento ou cessão de direito de uso de programas de computação' },
  { code: '010601', label: '1.06 — Assessoria e consultoria em informática' },
  { code: '010701', label: '1.07 — Suporte técnico em informática, inclusive instalação, configuração e manutenção de programas e bancos de dados' },
  { code: '010801', label: '1.08 — Planejamento, confecção, manutenção e atualização de páginas eletrônicas' },
  { code: '010901', label: '1.09 — Disponibilização, sem cessão definitiva, de conteúdos de áudio, vídeo, imagem e texto via internet' },

  // 02 — Pesquisas e desenvolvimento
  { code: '020101', label: '2.01 — Serviços de pesquisas e desenvolvimento de qualquer natureza' },

  // 03 — Locação e cessão de direito de uso
  { code: '030101', label: '3.01 — Locação de bens móveis' },
  { code: '030201', label: '3.02 — Locação de espaço em bens imóveis de domínio privado' },
  { code: '030301', label: '3.03 — Locação de espaço em bem imóvel' },
  { code: '030401', label: '3.04 — Locação, sublocação, arrendamento ou permissão de uso de ferrovia, rodovia, postes, cabos, dutos e condutos' },
  { code: '030501', label: '3.05 — Cessão de andaimes, palcos, coberturas e outras estruturas de uso temporário' },

  // 04 — Saúde e assistência médica
  { code: '040101', label: '4.01 — Medicina e biomedicina' },
  { code: '040201', label: '4.02 — Análises clínicas, patologia, eletricidade médica, radioterapia, quimioterapia, ultrassonografia, ressonância magnética, radiologia, tomografia e congêneres' },
  { code: '040301', label: '4.03 — Hospitais, clínicas, laboratórios, sanatórios, manicômios, casas de saúde, prontos-socorros, ambulatórios e congêneres' },
  { code: '040401', label: '4.04 — Instrumentação cirúrgica' },
  { code: '040501', label: '4.05 — Acupuntura' },
  { code: '040601', label: '4.06 — Enfermagem, inclusive serviços auxiliares' },
  { code: '040701', label: '4.07 — Serviços farmacêuticos' },
  { code: '040801', label: '4.08 — Terapia ocupacional, fisioterapia e fonoaudiologia' },
  { code: '040901', label: '4.09 — Terapias destinadas ao tratamento físico, orgânico e mental' },
  { code: '041001', label: '4.10 — Nutrição' },
  { code: '041101', label: '4.11 — Obstetrícia' },
  { code: '041201', label: '4.12 — Odontologia' },
  { code: '041301', label: '4.13 — Ortóptica' },
  { code: '041401', label: '4.14 — Próteses sob encomenda' },
  { code: '041501', label: '4.15 — Psicanálise' },
  { code: '041601', label: '4.16 — Psicologia' },
  { code: '041701', label: '4.17 — Casas de repouso e de recuperação, creches, asilos e congêneres' },
  { code: '041801', label: '4.18 — Inseminação artificial, fertilização in vitro e congêneres' },
  { code: '041901', label: '4.19 — Bancos de sangue, leite, pele, olhos, óvulos, sêmen e congêneres' },
  { code: '042001', label: '4.20 — Coleta de sangue, leite, tecidos, sêmen, órgãos e materiais biológicos de qualquer espécie' },
  { code: '042101', label: '4.21 — Unidade de atendimento, assistência ou tratamento móvel e congêneres' },
  { code: '042201', label: '4.22 — Planos de medicina de grupo ou individual e convênios para prestação de assistência médica, hospitalar, odontológica e congêneres' },
  { code: '042301', label: '4.23 — Outros planos de saúde que se cumpram por serviços de terceiros contratados, credenciados ou cooperados' },

  // 05 — Medicina veterinária
  { code: '050101', label: '5.01 — Medicina veterinária e zootecnia' },
  { code: '050201', label: '5.02 — Hospitais, clínicas, ambulatórios, prontos-socorros e congêneres, na área veterinária' },
  { code: '050301', label: '5.03 — Laboratórios de análise na área veterinária' },
  { code: '050401', label: '5.04 — Inseminação artificial, fertilização in vitro e congêneres na área veterinária' },
  { code: '050501', label: '5.05 — Bancos de sangue e de órgãos e congêneres na área veterinária' },
  { code: '050601', label: '5.06 — Coleta de sangue, leite, tecidos, sêmen, órgãos e materiais biológicos de qualquer espécie na área veterinária' },
  { code: '050701', label: '5.07 — Unidade de atendimento, assistência ou tratamento móvel e congêneres na área veterinária' },
  { code: '050801', label: '5.08 — Guarda, tratamento, amestramento, embelezamento, alojamento e congêneres na área veterinária' },
  { code: '050901', label: '5.09 — Planos de atendimento e assistência médico-veterinária' },

  // 06 — Cuidados pessoais, estética e atividades físicas
  { code: '060101', label: '6.01 — Barbearia, cabeleireiros, manicuros, pedicuros e congêneres' },
  { code: '060201', label: '6.02 — Esteticistas, tratamento de pele, depilação e congêneres' },
  { code: '060301', label: '6.03 — Banhos, duchas, sauna, massagens e congêneres' },
  { code: '060401', label: '6.04 — Ginástica, dança, esportes, natação, artes marciais e demais atividades físicas' },
  { code: '060501', label: '6.05 — Centros de emagrecimento, spa e congêneres' },

  // 07 — Engenharia, arquitetura, construção civil e congêneres
  { code: '070101', label: '7.01 — Engenharia, agronomia, agrimensura, arquitetura, geologia, urbanismo e congêneres' },
  { code: '070201', label: '7.02 — Execução, por administração, empreitada ou subempreitada, de obras de construção civil, hidráulica ou elétrica e de outras obras semelhantes, inclusive sondagem, perfuração de poços, escavação, drenagem e irrigação' },
  { code: '070301', label: '7.03 — Elaboração de planos diretores, estudos de viabilidade, estudos organizacionais e outros, relacionados com obras e serviços de engenharia' },
  { code: '070401', label: '7.04 — Demolição' },
  { code: '070501', label: '7.05 — Reparação, conservação e reforma de edifícios, estradas, pontes, portos e congêneres' },
  { code: '070601', label: '7.06 — Colocação e instalação de tapetes, carpetes, assoalhos, cortinas, revestimentos de parede, vidros, divisórias, placas de gesso e congêneres' },
  { code: '070701', label: '7.07 — Recuperação, raspagem, polimento e lustração de pisos e congêneres' },
  { code: '070801', label: '7.08 — Calafetação' },
  { code: '070901', label: '7.09 — Varrição, coleta, remoção, incineração, tratamento, reciclagem, separação e destinação final de lixo, rejeitos e outros resíduos quaisquer' },
  { code: '071001', label: '7.10 — Limpeza, manutenção e conservação de vias e logradouros públicos, imóveis, chaminés, piscinas, parques, jardins e congêneres' },
  { code: '071101', label: '7.11 — Decoração e jardinagem, inclusive corte e poda de árvores' },
  { code: '071201', label: '7.12 — Controle e tratamento de efluentes de qualquer natureza e de agentes físicos, químicos e biológicos' },
  { code: '071301', label: '7.13 — Dedetização, desinfecção, desinsetização, imunização, higienização, desratização, pulverização e congêneres' },
  { code: '071401', label: '7.14 — (revogado)' },
  { code: '071501', label: '7.15 — (revogado)' },
  { code: '071601', label: '7.16 — Florestamento, reflorestamento, semeadura, adubação e congêneres' },
  { code: '071701', label: '7.17 — Escoramento, contenção de encostas e serviços congêneres' },
  { code: '071801', label: '7.18 — Limpeza e dragagem de rios, portos, canais, baías, lagos, lagoas, represas, açudes e congêneres' },
  { code: '071901', label: '7.19 — Acompanhamento e fiscalização da execução de obras de engenharia, arquitetura e urbanismo' },
  { code: '072001', label: '7.20 — Aerofotogrametria (inclusive interpretação), cartografia, mapeamento, levantamentos topográficos, batimétricos, geográficos, geodésicos, geológicos, geofísicos e congêneres' },
  { code: '072101', label: '7.21 — Pesquisa, perfuração, cimentação, mergulho, perfilagem, concretação, testemunhagem, pescaria, estimulação e outros serviços relacionados com a exploração e explotação de petróleo, gás natural e de outros recursos minerais' },
  { code: '072201', label: '7.22 — Nucleação e bombardeamento de nuvens e congêneres' },

  // 08 — Educação, instrução, treinamento
  { code: '080101', label: '8.01 — Ensino regular pré-escolar, fundamental, médio e superior' },
  { code: '080201', label: '8.02 — Instrução, treinamento, orientação pedagógica e educacional, avaliação de conhecimentos de qualquer natureza' },

  // 09 — Hospedagem, turismo e viagens
  { code: '090101', label: '9.01 — Hospedagem de qualquer natureza em hotéis, apart-service condominiais, flat, apart-hotéis, hotéis residência, residence-service, suite service, hotelaria marítima e congêneres' },
  { code: '090201', label: '9.02 — Agenciamento, organização, promoção, intermediação e execução de programas de turismo, passeios, viagens, excursões, hospedagens e congêneres' },
  { code: '090301', label: '9.03 — Guias de turismo' },

  // 10 — Intermediação e congêneres
  { code: '100101', label: '10.01 — Agenciamento, corretagem ou intermediação de câmbio, de seguros, de cartões de crédito, de planos de saúde e de planos de previdência privada' },
  { code: '100201', label: '10.02 — Agenciamento, corretagem ou intermediação de títulos em geral, valores mobiliários e contratos quaisquer' },
  { code: '100301', label: '10.03 — Agenciamento, corretagem ou intermediação de direitos de propriedade industrial, artística ou literária' },
  { code: '100401', label: '10.04 — Agenciamento, corretagem ou intermediação de contratos de arrendamento mercantil (leasing), de franquia (franchising) e de faturização (factoring)' },
  { code: '100501', label: '10.05 — Agenciamento, corretagem ou intermediação de bens móveis ou imóveis, não abrangidos em outros itens ou subitens deste artigo' },
  { code: '100601', label: '10.06 — Agenciamento marítimo' },
  { code: '100701', label: '10.07 — Agenciamento de notícias' },
  { code: '100801', label: '10.08 — Agenciamento de publicidade e propaganda, inclusive o agenciamento de veiculação por quaisquer meios' },
  { code: '100901', label: '10.09 — Representação de qualquer natureza, inclusive comercial' },
  { code: '101001', label: '10.10 — Distribuição de bens de terceiros' },

  // 11 — Guarda, estacionamento, armazenamento e vigilância
  { code: '110101', label: '11.01 — Guarda e estacionamento de veículos terrestres automotores, de aeronaves e de embarcações' },
  { code: '110201', label: '11.02 — Vigilância, segurança ou monitoramento de bens e pessoas' },
  { code: '110301', label: '11.03 — Escolta, inclusive de veículos e cargas' },
  { code: '110401', label: '11.04 — Armazenamento, depósito, carga, descarga, arrumação e guarda de bens de qualquer espécie' },

  // 12 — Diversões, lazer e entretenimento
  { code: '120101', label: '12.01 — Espetáculos teatrais' },
  { code: '120201', label: '12.02 — Exibições cinematográficas' },
  { code: '120301', label: '12.03 — Espetáculos circenses' },
  { code: '120401', label: '12.04 — Programas de auditório' },
  { code: '120501', label: '12.05 — Parques de diversões, centros de lazer e congêneres' },
  { code: '120601', label: '12.06 — Boates, taxi-dancing e congêneres' },
  { code: '120701', label: '12.07 — Shows, ballet, danças, desfiles, bailes, óperas, concertos, recitais, festivais e congêneres' },
  { code: '120801', label: '12.08 — Feiras, exposições, congressos e congêneres' },
  { code: '120901', label: '12.09 — Bilhares, boliches e diversões eletrônicas ou não' },
  { code: '121001', label: '12.10 — Corridas e competições de animais' },
  { code: '121101', label: '12.11 — Competições esportivas ou de destreza física ou intelectual, com ou sem a participação do espectador' },
  { code: '121201', label: '12.12 — Execução de música' },
  { code: '121301', label: '12.13 — Produção, mediante ou sem encomenda prévia, de eventos, espetáculos, entrevistas, shows, ballet, danças, desfiles, bailes, teatros, óperas, concertos, recitais, festivais e congêneres' },
  { code: '121401', label: '12.14 — Fornecimento de música para ambientes fechados ou não, mediante transmissão por qualquer processo' },
  { code: '121501', label: '12.15 — Desfiles de blocos carnavalescos ou folclóricos, trios elétricos e congêneres' },
  { code: '121601', label: '12.16 — Exibição de filmes, entrevistas, musicais, espetáculos, shows, concertos, desfiles, óperas, competições esportivas, de destreza intelectual ou congêneres' },
  { code: '121701', label: '12.17 — Recreação e animação, inclusive em festas e eventos de qualquer natureza' },

  // 13 — Fonografia, fotografia, cinematografia e reprografia
  { code: '130101', label: '13.01 — (vetado)' },
  { code: '130201', label: '13.02 — Fonografia ou gravação de sons, inclusive trucagem, dublagem, mixagem e congêneres' },
  { code: '130301', label: '13.03 — Fotografia e cinematografia, inclusive revelação, ampliação, cópia, reprodução, trucagem e congêneres' },
  { code: '130401', label: '13.04 — Reprografia, microfilmagem e digitalização' },
  { code: '130501', label: '13.05 — Composição gráfica, fotocomposição, clicheria, zincografia, litografia, fotolitografia e congêneres' },

  // 14 — Bens de terceiros
  { code: '140101', label: '14.01 — Lubrificação, limpeza, lustração, revisão, carga e recarga, conserto, restauração, blindagem, manutenção e conservação de máquinas, veículos, aparelhos, equipamentos, motores, elevadores ou de qualquer objeto' },
  { code: '140201', label: '14.02 — Assistência técnica' },
  { code: '140301', label: '14.03 — Recondicionamento de motores (exceto peças e partes empregadas, que ficam sujeitas ao ICMS)' },
  { code: '140401', label: '14.04 — Recauchutagem ou regeneração de pneus' },
  { code: '140501', label: '14.05 — Restauração, recondicionamento, acondicionamento, pintura, beneficiamento, lavagem, secagem, tingimento, galvanoplastia, anodização, corte, recorte, polimento, plastificação e congêneres, de objetos quaisquer' },
  { code: '140601', label: '14.06 — Instalação e montagem de aparelhos, máquinas e equipamentos, inclusive montagem industrial' },
  { code: '140701', label: '14.07 — Colocação de molduras e congêneres' },
  { code: '140801', label: '14.08 — Encadernação, gravação e douração de livros, revistas e congêneres' },
  { code: '140901', label: '14.09 — Alfaiataria e costura, quando o material for fornecido pelo usuário final, exceto aviamento' },
  { code: '141001', label: '14.10 — Tinturaria e lavanderia' },
  { code: '141101', label: '14.11 — Tapeçaria e reforma de estofamentos em geral' },
  { code: '141201', label: '14.12 — Funilaria e lanternagem' },
  { code: '141301', label: '14.13 — Carpintaria e serralheria' },

  // 15 — Serviços bancários e financeiros
  { code: '150101', label: '15.01 — Administração de fundos quaisquer, de consórcio, de cartão de crédito ou débito e congêneres, de carteira de clientes, de cheques pré-datados e congêneres' },
  { code: '150201', label: '15.02 — Abertura de contas em geral, inclusive conta-corrente, conta de investimentos e aplicação e caderneta de poupança, no País e no exterior' },
  { code: '150301', label: '15.03 — Locação e manutenção de cofres particulares, de terminais eletrônicos, de terminais de atendimento e de bens e equipamentos em geral' },
  { code: '150401', label: '15.04 — Fornecimento ou emissão de atestados em geral, inclusive atestado de idoneidade, atestado de capacidade financeira e congêneres' },
  { code: '150501', label: '15.05 — Cadastro, elaboração de ficha cadastral, renovação cadastral e congêneres, inclusão ou exclusão no Cadastro de Emitentes de Cheques sem Fundos – CCF ou em quaisquer outros bancos cadastrais' },
  { code: '150601', label: '15.06 — Emissão, reemissão e fornecimento de avisos, comprovantes e documentos em geral' },
  { code: '150701', label: '15.07 — Acesso, movimentação, atendimento e consulta a contas em geral, por qualquer meio ou processo, inclusive por telefone, fac-símile, internet e telex, acesso a terminais de atendimento, inclusive vinte e quatro horas' },
  { code: '150801', label: '15.08 — Fornecimento, emissão, reemissão, renovação e manutenção de cartão magnético, cartão de crédito, cartão de débito, cartão salário e congêneres' },
  { code: '150901', label: '15.09 — Arrendamento mercantil (leasing) de quaisquer bens, inclusive cessão de direitos e obrigações, substituição de garantias, alteração, cancelamento e registro de contrato, e demais serviços relacionados ao arrendamento mercantil' },
  { code: '151001', label: '15.10 — Serviços relacionados a cobranças, recebimentos ou pagamentos em geral, de títulos quaisquer, de contas ou carnês, de câmbio, de tributos e por conta de terceiros, inclusive os efetuados por meio eletrônico, automático ou por máquinas de atendimento' },
  { code: '151101', label: '15.11 — Devolução de títulos, protesto de títulos, sustação de protesto, manutenção de títulos, reapresentação de títulos, e demais serviços a eles relacionados' },
  { code: '151201', label: '15.12 — Custódia em geral, inclusive de títulos e valores mobiliários' },
  { code: '151301', label: '15.13 — Serviços relacionados a operações de câmbio em geral, edição, alteração, prorrogação, cancelamento e baixa de contrato de câmbio' },
  { code: '151401', label: '15.14 — Serviços relacionados a avaliações e perícias, inclusive avaliação de bens e imóveis para fins de desapropriação' },
  { code: '151501', label: '15.15 — Serviços relacionados a emissão, reemissão, liquidação, alteração, cancelamento e baixa de ordens de pagamento, ordens de crédito e similares' },
  { code: '151601', label: '15.16 — Serviços relacionados a emissão, concessão, alteração ou contratação de aval, fiança, anuência e congêneres' },
  { code: '151701', label: '15.17 — Serviços relacionados a transferências, cobranças e pagamentos diversos' },
  { code: '151801', label: '15.18 — Serviços de cobrança em geral' },

  // 16 — Transporte municipal
  { code: '160101', label: '16.01 — Serviços de transporte de natureza municipal' },

  // 17 — Apoio técnico, administrativo, jurídico, contábil e comercial
  { code: '170101', label: '17.01 — Assessoria ou consultoria de qualquer natureza, não contida em outros itens desta lista; análise, exame, pesquisa, coleta, compilação e fornecimento de dados e informações de qualquer natureza' },
  { code: '170201', label: '17.02 — Datilografia, digitação, estenografia, expediente, secretaria em geral, resposta audível, redação, edição, interpretação, revisão, tradução, apoio e infra-estrutura administrativa e congêneres' },
  { code: '170301', label: '17.03 — Planejamento, coordenação, programação ou organização técnica, financeira ou administrativa' },
  { code: '170401', label: '17.04 — Recrutamento, agenciamento, seleção e colocação de mão-de-obra' },
  { code: '170501', label: '17.05 — Fornecimento de mão-de-obra, mesmo em caráter temporário, inclusive de empregados ou trabalhadores' },
  { code: '170601', label: '17.06 — Propaganda e publicidade, inclusive promoção de vendas, planejamento de campanhas ou sistemas de publicidade, elaboração de desenhos, textos e demais elementos e materiais publicitários' },
  { code: '170701', label: '17.07 — (vetado)' },
  { code: '170801', label: '17.08 — Franquia (franchising)' },
  { code: '170901', label: '17.09 — Perícias, laudos, exames técnicos e análises técnicas' },
  { code: '171001', label: '17.10 — Planejamento, organização e administração de feiras, exposições, congressos e congêneres' },
  { code: '171101', label: '17.11 — Organização de festas e recepções; bufê (exceto o fornecimento de alimentação e bebidas, que fica sujeito ao ICMS)' },
  { code: '171201', label: '17.12 — Administração em geral, inclusive de bens e negócios de terceiros' },
  { code: '171301', label: '17.13 — Leilão e congêneres' },
  { code: '171401', label: '17.14 — Advocacia' },
  { code: '171501', label: '17.15 — Arbitragem de qualquer espécie, inclusive jurídica' },
  { code: '171601', label: '17.16 — Auditoria' },
  { code: '171701', label: '17.17 — Análise de Organização e Métodos' },
  { code: '171801', label: '17.18 — Atuária e cálculos técnicos de qualquer natureza' },
  { code: '171901', label: '17.19 — Contabilidade, inclusive serviços técnicos e auxiliares' },
  { code: '172001', label: '17.20 — Consultoria e assessoria econômica ou financeira' },
  { code: '172101', label: '17.21 — Estatística' },
  { code: '172201', label: '17.22 — Cobrança em geral' },
  { code: '172301', label: '17.23 — Assessoria, análise, avaliação, atendimento, consulta, cadastro, seleção, gerenciamento de informações, administração de contas a receber ou a pagar e em geral, relacionados a operações de faturização (factoring)' },
  { code: '172401', label: '17.24 — Apresentação de palestras, conferências, seminários e congêneres' },

  // 18 — Regulação de sinistros e seguros
  { code: '180101', label: '18.01 — Serviços de regulação de sinistros vinculados a contratos de seguros; inspeção e avaliação de riscos para cobertura de contratos de seguros; prevenção e gerência de riscos seguráveis e congêneres' },

  // 19 — Distribuição de loteria e apostas
  { code: '190101', label: '19.01 — Serviços de distribuição e venda de bilhetes e demais produtos de loteria, bingos, cartões, pules ou cupons de apostas, sorteios, prêmios, inclusive os decorrentes de títulos de capitalização e congêneres' },

  // 20 — Serviços portuários, aeroportuários e ferroviários
  { code: '200101', label: '20.01 — Serviços portuários, ferroportuários, utilização de porto, movimentação de passageiros, reboque de embarcações, rebocador escoteiro, atracação, desatracação, serviços de praticagem, capatazia, armazenagem de qualquer natureza, serviços acessórios' },
  { code: '200201', label: '20.02 — Serviços aeroportuários, utilização de aeroporto, movimentação de passageiros, armazenagem de qualquer natureza, capatazia, movimentação de aeronaves, abastecimento, concessão de espaço, atividades terrestres de apoio à navegação aérea' },
  { code: '200301', label: '20.03 — Serviços de terminais rodoviários e ferroviários, utilização de terminal, movimentação de passageiros, de mercadorias, serviços de apoio operacionais e administrativos em geral' },

  // 21 — Registros públicos, cartorários e notariais
  { code: '210101', label: '21.01 — Serviços de registros públicos, cartorários e notariais' },

  // 22 — Exploração de rodovias
  { code: '220101', label: '22.01 — Serviços de exploração de rodovias mediante cobrança de preço ou pedágio dos usuários, envolvendo execução de serviços de conservação, manutenção, melhoramentos para adequação de capacidade e segurança de trânsito, operação, monitoração, assistência aos usuários e outros' },

  // 23 — Programação e comunicação visual e desenho industrial
  { code: '230101', label: '23.01 — Serviços de programação e comunicação visual, desenho industrial e congêneres' },

  // 24 — Chaveiros, carimbos e sinalização visual
  { code: '240101', label: '24.01 — Serviços de chaveiros, confecção de carimbos, placas, sinalização visual, banners, adesivos e congêneres' },

  // 25 — Serviços funerários
  { code: '250101', label: '25.01 — Funerais, inclusive fornecimento de caixão, urna ou esquifes; aluguel de capela; transporte do corpo cadavérico; fornecimento de flores, coroas e outros paramentos' },
  { code: '250201', label: '25.02 — Translado intramunicipal e cremação de corpos e partes de corpos cadavéricos' },
  { code: '250301', label: '25.03 — Planos ou convênio funerários' },
  { code: '250401', label: '25.04 — Manutenção e conservação de jazigos e cemitérios' },

  // 26 — Coleta e entrega de correspondências e documentos
  { code: '260101', label: '26.01 — Serviços de coleta, remessa ou entrega de correspondências, documentos, objetos, bens ou valores, inclusive pelos correios e suas agências franqueadas; courier e congêneres' },

  // 27 — Assistência social
  { code: '270101', label: '27.01 — Serviços de assistência social' },

  // 28 — Avaliação de bens e serviços
  { code: '280101', label: '28.01 — Serviços de avaliação de bens e serviços de qualquer natureza' },

  // 29 — Biblioteconomia
  { code: '290101', label: '29.01 — Serviços de biblioteconomia' },

  // 30 — Biologia, biotecnologia e química
  { code: '300101', label: '30.01 — Serviços de biologia, biotecnologia e química' },

  // 31 — Serviços técnicos (edificações, eletrônica, mecânica e telecomunicações)
  { code: '310101', label: '31.01 — Serviços técnicos em edificações, eletrônica, eletrotécnica, mecânica, telecomunicações e congêneres' },

  // 32 — Desenhos técnicos
  { code: '320101', label: '32.01 — Serviços de desenhos técnicos' },

  // 33 — Desembaraço aduaneiro, comissários e despachantes
  { code: '330101', label: '33.01 — Serviços de desembaraço aduaneiro, comissários, despachantes e congêneres' },

  // 34 — Investigações particulares e detetives
  { code: '340101', label: '34.01 — Serviços de investigações particulares, detetives e congêneres' },

  // 35 — Reportagem, assessoria de imprensa e jornalismo
  { code: '350101', label: '35.01 — Serviços de reportagem, assessoria de imprensa, jornalismo e congêneres' },

  // 36 — Meteorologia
  { code: '360101', label: '36.01 — Serviços de meteorologia' },

  // 37 — Artistas, atletas, modelos e manequins
  { code: '370101', label: '37.01 — Serviços de artistas, atletas, modelos e manequins' },

  // 38 — Museologia
  { code: '380101', label: '38.01 — Serviços de museologia' },

  // 39 — Ourivesaria e lapidação
  { code: '390101', label: '39.01 — Serviços de ourivesaria e lapidação (com o material fornecido pelo tomador do serviço)' },

  // 40 — Obras de arte sob encomenda
  { code: '400101', label: '40.01 — Obras de arte sob encomenda' },
];
