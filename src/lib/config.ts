export const API_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_API_FOOTBALL_KEY || 'YOUR_API_KEY_HERE',
  API_URL: 'https://v3.football.api-sports.io'
};

// Mapeamento de canais portugueses para IDs dos nossos players
export const CHANNEL_MAPPING: { [key: string]: string } = {
  // Sport TV
  'Sport TV1': 'Sport TV 1',
  'Sport TV 1': 'Sport TV 1',
  'SPORT TV1': 'Sport TV 1',
  'SPORT TV 1': 'Sport TV 1',
  'SportTV1': 'Sport TV 1',
  'SportTV 1': 'Sport TV 1',
  
  'Sport TV2': 'Sport TV 2',
  'Sport TV 2': 'Sport TV 2',
  'SPORT TV2': 'Sport TV 2',
  'SPORT TV 2': 'Sport TV 2',
  'SportTV2': 'Sport TV 2',
  'SportTV 2': 'Sport TV 2',
  
  'Sport TV3': 'Sport TV 3',
  'Sport TV 3': 'Sport TV 3',
  'SPORT TV3': 'Sport TV 3',
  'SPORT TV 3': 'Sport TV 3',
  'SportTV3': 'Sport TV 3',
  'SportTV 3': 'Sport TV 3',
  
  'Sport TV4': 'Sport TV 4',
  'Sport TV 4': 'Sport TV 4',
  'SPORT TV4': 'Sport TV 4',
  'SPORT TV 4': 'Sport TV 4',
  'SportTV4': 'Sport TV 4',
  'SportTV 4': 'Sport TV 4',
  
  'Sport TV5': 'Sport TV 5',
  'Sport TV 5': 'Sport TV 5',
  'SPORT TV5': 'Sport TV 5',
  'SPORT TV 5': 'Sport TV 5',
  'SportTV5': 'Sport TV 5',
  'SportTV 5': 'Sport TV 5',

  // Benfica TV
  'Benfica TV': 'Benfica TV',
  'BTV': 'Benfica TV',
  'BenficaTV': 'Benfica TV',
  'BENFICA TV': 'Benfica TV',

  // DAZN (antiga Eleven Sports)
  'ELEVEN SPORTS 1': 'DAZN 1',
  'Eleven Sports 1': 'DAZN 1',
  'ELEVEN 1': 'DAZN 1',
  'DAZN1': 'DAZN 1',
  'DAZN 1': 'DAZN 1',
  
  'ELEVEN SPORTS 2': 'DAZN 2',
  'Eleven Sports 2': 'DAZN 2',
  'ELEVEN 2': 'DAZN 2',
  'DAZN2': 'DAZN 2',
  'DAZN 2': 'DAZN 2',
  
  'ELEVEN SPORTS 3': 'DAZN 3',
  'Eleven Sports 3': 'DAZN 3',
  'ELEVEN 3': 'DAZN 3',
  'DAZN3': 'DAZN 3',
  'DAZN 3': 'DAZN 3',
  
  'ELEVEN SPORTS 4': 'DAZN 4',
  'Eleven Sports 4': 'DAZN 4',
  'ELEVEN 4': 'DAZN 4',
  'DAZN4': 'DAZN 4',
  'DAZN 4': 'DAZN 4',
  
  'ELEVEN SPORTS 5': 'DAZN 5',
  'Eleven Sports 5': 'DAZN 5',
  'ELEVEN 5': 'DAZN 5',
  'DAZN5': 'DAZN 5',
  'DAZN 5': 'DAZN 5',
  
  'ELEVEN SPORTS 6': 'DAZN 6',
  'Eleven Sports 6': 'DAZN 6',
  'ELEVEN 6': 'DAZN 6',
  'DAZN6': 'DAZN 6',
  'DAZN 6': 'DAZN 6'
};

// Mapeamento de transmissões em Portugal
export const BROADCAST_RULES = {
  // Champions League
  'UEFA Champions League': {
    primary: 'DAZN 1',
    secondary: 'DAZN 2',
    tertiaryChannels: ['DAZN 3', 'DAZN 4'],
    hasRights: true // DAZN tem os direitos em Portugal
  },
  // Liga Portuguesa
  'Primeira Liga': {
    primary: 'Sport TV 1',
    secondary: 'Sport TV 2',
    tertiaryChannels: ['Sport TV 3'],
    hasRights: true,
    exceptions: {
      'Benfica': 'Benfica TV', // Jogos em casa do Benfica
    }
  },
  // Premier League
  'Premier League': {
    primary: 'Sport TV 2',
    secondary: 'Sport TV 3',
    hasRights: true
  },
  // La Liga
  'La Liga': {
    primary: 'Sport TV 2',
    secondary: 'Sport TV 3',
    hasRights: true
  },
  // Serie A
  'Serie A': {
    primary: 'Sport TV 3',
    secondary: 'Sport TV 4',
    hasRights: true
  },
  // Bundesliga
  'Bundesliga': {
    primary: 'Sport TV 4',
    secondary: 'Sport TV 5',
    hasRights: true
  },
  // Ligue 1
  'Ligue 1': {
    primary: 'Sport TV 5',
    secondary: 'Sport TV 3',
    hasRights: true
  },
  // Europa League
  'UEFA Europa League': {
    primary: 'Sport TV 1',
    secondary: 'Sport TV 2',
    tertiaryChannels: ['Sport TV 3', 'Sport TV 4'],
    hasRights: true
  },
  // Conference League
  'UEFA Conference League': {
    primary: 'Sport TV 3',
    secondary: 'Sport TV 4',
    hasRights: true
  },
  // Eredivisie
  'Eredivisie': {
    primary: 'Sport TV 4',
    secondary: 'Sport TV 5',
    hasRights: false // Atualmente não é transmitida em Portugal
  }
}; 