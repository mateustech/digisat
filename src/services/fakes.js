export function loadLists() {
    return [
      {
        title: 'Tarefas',
        creatable: true,
        cards: [
          {
            id: 1,
            content: 'Instalação de Antena',
            labels: ['#7159c1']
          },
          {
            id: 2,
            content: 'Instalação de Camera',
            labels: ['#3b5bfd'],
            user: 'https://avatars0.githubusercontent.com/u/20547884?v=4'
          },
          {
            id: 3,
            content: 'Instalação de Cerca Eletrica',
            labels: ['#7159c1']
          },
          {
            id: 4,
            content: 'Manutenção de Alarme em Antonio Filho',
            labels: ['#54e1f7'],
            user: 'https://randomuser.me/api/portraits/thumb/men/75.jpg'
          }
        ]
      },
      {
        title: 'Fazendo',
        creatable: false,
        cards: [
          {
            id: 5,
            content: 'Cavando Burado',
            labels: ['#70cc00'],
            user: 'https://avatars0.githubusercontent.com/u/20547884?v=4'
          }
        ]
      },
      {
        title: 'Pausado',
        creatable: false,
        cards: [
          {
            id: 6,
            content: 'Manutenção da prefeitura',
            labels: ['#7159c1'],
            user: 'https://randomuser.me/api/portraits/women/48.jpg'
          },
          {
            id: 7,
            content: 'Revisao no carro',
            labels: ['#54e1f7'],
            user: 'https://randomuser.me/api/portraits/men/15.jpg'
          },
          {
            id: 8,
            content: 'Limpar Deposito',
            labels: ['#ff4e4e'],
          },
          {
            id: 9,
            content: 'Manutenção da prefeitura',
            labels: ['#7159c1'],
            user: 'https://randomuser.me/api/portraits/women/48.jpg'
          },
          {
            id: 10,
            content: 'Revisao no carro',
            labels: ['#54e1f7'],
            user: 'https://randomuser.me/api/portraits/men/15.jpg'
          },
          {
            id: 11,
            content: 'Limpar Deposito',
            labels: ['#ff4e4e'],
          }
        ]
      },
      {
        title: 'Concluído',
        creatable: false,
        done: true,
        cards: [
          {
            id: 12,
            content: 'Instalação na casa de neto de maro',
            labels: ['#3b5bfd'],
            user: 'https://avatars0.githubusercontent.com/u/20547884?v=4'
          },
          {
            id: 13,
            content: 'Revisao na moto',
            labels: ['#54e1f7'],
          },
          {
            id: 14,
            content: 'Deixar mamae no sitio',
            labels: ['#7159c1'],
            user: 'https://randomuser.me/api/portraits/women/71.jpg'
          }
        ]
      },
    ];
  }
  