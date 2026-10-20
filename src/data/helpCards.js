export const helpCards = [
  {
    id: 1,
    title: 'Diagnóstico de Bordo',
    purpose: '🐛 Debug',
    context: 'Uma anomalia foi detectada no sistema. Antes de alterar qualquer protocolo, a tripulação pode solicitar um diagnóstico da central.',
    effect: 'A organização executa ou testa o código da equipe e informa o primeiro comportamento incorreto encontrado, sem indicar como corrigi-lo.',
    examples: [
      'Quando o botão é pressionado, o LED não apaga.',
      'O servo não está atingindo a posição esperada.',
      'Quando os dois botões são pressionados, o sistema não entra no estado de conflito.',
    ],
  },
  {
    id: 2,
    title: 'Chave da Nave',
    purpose: '🧠 Entendimento',
    context: 'Os sistemas da nave possuem inúmeros protocolos. Entre eles, existe uma chave capaz de revelar o caminho necessário para prosseguir.',
    effect: 'A equipe recebe uma dica sobre o principal conceito de programação necessário para resolver a missão, sem receber código ou a solução.',
    examples: [
      'A solução depende de verificar duas entradas simultaneamente.',
      'O valor recebido precisa ser convertido antes de controlar o servo.',
      'O sistema precisa manter o estado atual entre os comandos.',
    ],
  },
  {
    id: 5,
    title: 'Módulo de Emergência',
    purpose: '🔧 Montagem',
    context: 'O sistema de montagem automática da estação foi ativado. Toda a infraestrutura necessária para a missão já está pronta.',
    effect: 'A organização entrega a montagem física da missão já realizada. A equipe ainda precisa desenvolver toda a programação.',
    examples: ['Em uma missão com Arduino, RGB, botão, potenciômetro e servo, a organização entrega toda a montagem pronta.'],
  },
]

export const resourceCards = [
  {
    title: 'Apostila',
    description: 'Material Didático e Guia de Práticas.',
    href: '/data/revisao-final-2026.pdf',
    icon: 'pdf',
    tone: 'blue',
  },
  {
    title: 'Tabela de Cores',
    description: 'Consulta rápida de cores para o LED RGB.',
    href: '/data/Tabela%20de%20Cores%20RGB.pdf',
    icon: 'rgb',
    tone: 'teal',
  },
]
