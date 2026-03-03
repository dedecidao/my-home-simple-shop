export const products = [
  // --- TESTES ---
  // {
  //   id: 1,
  //   name: 'Teste Pix',
  //   description: 'Teste de funcionalidade.',
  //   price: 0.10,
  //   image: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&w=600&q=80'
  // },
  // {
  //   id: 2,
  //   name: 'Teste Cred',
  //   description: 'Teste de funcionalidade.',
  //   price: 1.00,
  //   image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&w=600&q=80'
  // },

  // --- ITENS DE ENTRADA (ESTRATÉGIA 69,90) ---
  {
    id: 17,
    name: 'Conjunto de Copos de Cristal',
    description: 'Elegância para servir bebidas e receber visitas.',
    price: 69.90,
    image: import.meta.env.BASE_URL + 'img/copocristal.png'
  },
  {
    id: 19,
    name: 'Mop de Limpeza com Balde',
    description: 'Para limpar a sujeira que as patas de toddy de Luna deixa pelo chão.',
    price: 69.90,
    image: import.meta.env.BASE_URL + 'img/mop.png'
  },

  // --- ITENS ESTRATÉGICOS (CONVERTER TICKET MÉDIO) ---
  {
    id: 4,
    name: 'Kit de Travessas Gourmet',
    description: 'Peças em porcelana ideais para servir jantares especiais.',
    price: 139.90,
    image: import.meta.env.BASE_URL + 'img/kit_travessas.png'
  },
  {
    id: 44,
    name: 'Aparelho de Jantar Completo',
    description: 'Design moderno para compor a mesa da casa nova.',
    price: 159.90,
    image: import.meta.env.BASE_URL + 'img/aparelho_jantar_comp.png'
  },
  {
    id: 48, // NOVO ITEM ESTRATÉGICO ACIMA DE 300
    name: 'Fritadeira Air Fryer Inox',
    description: 'O eletro essencial para uma rotina saudável e prática.',
    price: 199.90,
    image: import.meta.env.BASE_URL + 'img/airfryer.png'
  },

  // --- UTILIDADES E ELETROS (FAIXA R$ 500 - R$ 1.500) ---
  {
    id: 45,
    name: 'Lavadora de Alta Pressão Profissional',
    description: 'Potência para lavar o carro e manter as áreas externas impecáveis.',
    price: 499.90,
    image: import.meta.env.BASE_URL + 'img/lava_auto_pressao.png'
  },
  {
    id: 46,
    name: 'Tanquinho de Lavar Roupas',
    description: 'Eficiência e economia para lavar roupas pesadas e tapetes.',
    price: 589.90,
    image: import.meta.env.BASE_URL + 'img/lavadora.png'
  },
  {
    id: 49,
    name: 'Micro-ondas Inox com Grill',
    description: 'Alta potência e acabamento espelhado para a cozinha.',
    price: 849.90,
    image: import.meta.env.BASE_URL + 'img/microondas.png'
  },
  {
    id: 50,
    name: 'Aspirador de Pó Robô Inteligente',
    description: 'Limpeza automática para você aproveitar o tempo livre.',
    price: 999.90,
    image: import.meta.env.BASE_URL + 'img/robo.png'
  },
  {
    id: 51,
    name: 'Churrasqueira Gourmet de Embutir',
    description: 'O item que faltava para os momentos de lazer em família.',
    price: 1199.90,
    image: import.meta.env.BASE_URL + 'img/churras.png'
  },

  // --- COTAS MASTER (GRANDES MÓVEIS E ELETROS ATÉ R$ 5.000) ---
  {
    id: 42,
    name: 'Cota: Fogão de Embutir 5 Bocas Inox',
    description: 'Design moderno com acendimento automático e forno potente.',
    price: 1399.90,
    image: import.meta.env.BASE_URL + 'img/fogao.png'
  },
  {
    id: 39,
    name: 'Cota: Smart TV',
    description: 'Maratonar um anime, jogar e fingir que vamos dormir cedo.',
    price: 1999.90,
    image: import.meta.env.BASE_URL + 'img/tv.png'
  },
  {
    id: 36,
    name: 'Cota: Sofá Retrátil e Reclinável Premium',
    description: 'Conforto máximo com tecido de alta qualidade e design ergonómico.',
    price: 1999.90,
    image: import.meta.env.BASE_URL + 'img/sofa.png'
  },
  {
    id: 47,
    name: 'Cota: Conjunto de Armários Modulados',
    description: 'Organização e estilo para a cozinha com acabamento premium.',
    price: 1999.90,
    image: import.meta.env.BASE_URL + 'img/armario.png'
  },
  {
    id: 32,
    name: 'Cota: Máquina Lava e Seca Frontal Inox',
    description: 'Praticidade absoluta: roupas limpas e secas num único ciclo.',
    price: 1999.90,
    image: import.meta.env.BASE_URL + 'img/lavaseca.png'
  },
  {
    id: 41,
    name: 'Cota: Geladeira Inverse Frost Free',
    description: 'Capacidade total e economia de energia para a nova rotina.',
    price: 1999.90,
    image: import.meta.env.BASE_URL + 'img/geladeira.png'
  }
];