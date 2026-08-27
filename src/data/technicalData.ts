export interface TechnicalComponent {
  id: string
  name: string
  shortName: string
  system: string
  function: string
  characteristics: string[]
  safety: string
}

export const technicalData: Record<string, TechnicalComponent> = {
  generator: {
    id: 'generator',
    name: 'Gerador 24 V DC',
    shortName: 'Gerador 24 V',
    system: 'Geração elétrica por esforço humano',
    function: 'Converte a rotação do conjunto bicicleta/rolo em energia elétrica contínua. Na simulação, essa energia reduz a parcela que seria solicitada à rede elétrica do evento.',
    characteristics: ['Tensão demonstrativa de até 24 V DC', 'Potência simulada de 0–300 W', 'Acoplamento mecânico por rolete'],
    safety: 'Circuito conceitual de baixa tensão, com proteção contra sobrecorrente e seccionamento.'
  },
  breaker: {
    id: 'breaker',
    name: 'Disjuntor DC',
    shortName: 'Disjuntor DC',
    system: 'QDG — distribuição 24 V DC',
    function: 'Proteção do circuito responsável pela geração e alimentação do elemento de aquecimento auxiliar.',
    characteristics: ['Aplicação em circuito DC', 'Seccionamento visível no painel', 'Proteção contra sobrecorrente'],
    safety: 'Projeto conceitual desenvolvido considerando princípios e referências da NBR 5410 e NR-10.'
  },
  bep: {
    id: 'bep',
    name: 'Barra BEP de Cobre',
    shortName: 'BEP',
    system: 'Equipotencialização',
    function: 'Representa o ponto de equipotencialização das partes metálicas da instalação didática.',
    characteristics: ['Barra de cobre', 'Conexões identificadas', 'Ligação visual das massas metálicas'],
    safety: 'A representação é educacional e não substitui dimensionamento elétrico executivo.'
  },
  heater: {
    id: 'heater',
    name: 'Elemento de Aquecimento 24 V DC',
    shortName: 'Resistência 24 V',
    system: 'Aquecimento elétrico auxiliar',
    function: 'Converte a energia elétrica proveniente da bicicleta em calor. No balanço didático, a bicicleta substitui uma pequena parcela da energia que viria da rede.',
    characteristics: ['Imersão no reservatório', 'Baixa tensão DC', 'Atuação proporcional à potência gerada'],
    safety: 'A simulação mostra comportamento térmico conceitual com inércia, sem representar um dimensionamento final.'
  },
  coil: {
    id: 'coil',
    name: 'Trocador Térmico de Biometano',
    shortName: 'Serpentina',
    system: 'Aquecimento principal por biometano',
    function: 'Representa a principal parcela térmica do sistema híbrido. Na comparação didática, o biometano evita que essa parcela seja fornecida por aquecimento 100% elétrico.',
    characteristics: ['Serpentina de cobre', 'Zona inferior do boiler', 'Fonte térmica predominante'],
    safety: 'Referência conceitual à NBR 13103; implantação real exige projeto, ventilação, componentes certificados e profissional habilitado.'
  },
  regulator: {
    id: 'regulator',
    name: 'Regulador de Pressão',
    shortName: 'Regulador',
    system: 'Célula de biometano',
    function: 'Reduz e estabiliza a pressão antes da alimentação da etapa térmica.',
    characteristics: ['Entrada de alta pressão', 'Saída regulada', 'Manômetros de leitura'],
    safety: 'Componente representado apenas para fins didáticos. Sistemas reais devem seguir normas de gás aplicáveis.'
  },
  solenoid: {
    id: 'solenoid',
    name: 'Válvula Solenoide',
    shortName: 'Solenoide',
    system: 'Controle do biometano',
    function: 'Representa o bloqueio automático do fluxo de gás durante condições de desligamento.',
    characteristics: ['Atuação eletromecânica', 'Instalada após regulação', 'Integração com ESD'],
    safety: 'A lógica de segurança real deve ser definida e validada por profissional habilitado.'
  },
  esd: {
    id: 'esd',
    name: 'ESD — Emergency Shut Down',
    shortName: 'ESD',
    system: 'Segurança do sistema de gás',
    function: 'Ponto de parada de emergência para interrupção rápida do fornecimento de biometano.',
    characteristics: ['Identificação destacada', 'Ação de bloqueio', 'Acesso rápido'],
    safety: 'O estande real deve ter análise de risco, sinalização, procedimentos e componentes adequados ao ambiente de exposição.'
  },
  grid: {
    id: 'grid',
    name: 'Alimentação da Rede Elétrica do Local',
    shortName: 'Rede do Local',
    system: 'Complementação elétrica do sistema híbrido',
    function: 'Fornece a parcela de energia que não é suprida pelo biometano e pelas pedaladas, além de representar a alimentação dos sistemas auxiliares do estande.',
    characteristics: ['Parcela calculada a partir do cenário do evento', 'Complementação automática do balanço energético', 'Medição exibida em tempo real'],
    safety: 'A ligação real ao evento depende do padrão elétrico disponibilizado pela organização, dimensionamento, proteção e profissional habilitado.'
  },
  meter: {
    id: 'meter',
    name: 'Medidor de Matriz Energética',
    shortName: 'Medidor',
    system: 'Telemetria educacional',
    function: 'Compara, em tempo real, o cenário convencional 100% elétrico com a combinação biometano + pedaladas + rede elétrica local.',
    characteristics: ['Base: 1.363 pessoas e 1,0 L/pessoa', 'Cálculo de energia térmica da água + perdas', 'Biometano e pedaladas limitados por capacidade', 'Rede: completa automaticamente o restante'],
    safety: 'Os números são uma estimativa conceitual baseada em premissas configuráveis. O projeto executivo deve validar vazão, potências, rendimentos, consumo real, instalações e segurança.'
  }
}
