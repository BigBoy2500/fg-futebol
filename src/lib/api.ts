import { getTodayMatches as getFlashscoreMatches } from './flashscore';
import { CHANNEL_MAPPING, BROADCAST_RULES } from './config';

export interface Match {
  id: number;
  time: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  channel: string;
  status: string;
  score?: {
    home: number;
    away: number;
  };
}

export interface CompetitionGroup {
  name: string;
  matches: Match[];
}

interface BroadcastRule {
  primary: string;
  secondary: string;
  tertiaryChannels?: string[];
  hasRights: boolean;
  exceptions?: {
    [key: string]: string;
  };
}

// Lista das principais ligas europeias e competições da UEFA
const MAJOR_COMPETITIONS = [
  // Competições UEFA
  { name: 'UEFA Champions League', country: 'World' },
  { name: 'UEFA Europa League', country: 'World' },
  { name: 'UEFA Conference League', country: 'World' },
  // Big Five
  { name: 'Premier League', country: 'England' },
  { name: 'La Liga', country: 'Spain' },
  { name: 'Serie A', country: 'Italy' },
  { name: 'Bundesliga', country: 'Germany' },
  { name: 'Ligue 1', country: 'France' },
  // Portugal e Holanda
  { name: 'Primeira Liga', country: 'Portugal' },
  { name: 'Eredivisie', country: 'Netherlands' }
];

// Função auxiliar para normalizar nomes de times
function normalizeTeamName(name: string): string {
  return name.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Função auxiliar para encontrar o canal de transmissão
async function findBroadcastChannel(match: any, broadcasts: any[]): Promise<string | null> {
  const homeTeam = normalizeTeamName(match.teams.home.name);
  const awayTeam = normalizeTeamName(match.teams.away.name);
  
  // Procurar nas transmissões do Flashscore
  for (const broadcast of broadcasts) {
    const broadcastMatch = normalizeTeamName(broadcast.match);
    // Verificar se ambos os times estão mencionados na transmissão
    if (broadcastMatch.includes(homeTeam) && broadcastMatch.includes(awayTeam)) {
      return broadcast.channel;
    }
  }
  
  return null;
}

// Função auxiliar para determinar o canal provável
function determineLikelyChannel(match: Match): string {
  // Verificar regras de transmissão específicas
  const rules = BROADCAST_RULES[match.competition as keyof typeof BROADCAST_RULES] as BroadcastRule;
  if (rules) {
    // Verificar exceções (ex: jogos em casa do Benfica)
    if (rules.exceptions) {
      for (const [team, channel] of Object.entries(rules.exceptions)) {
        if (match.homeTeam.includes(team)) {
          return channel;
        }
      }
    }

    // Se não houver exceção, usar o canal principal
    return rules.primary;
  }

  return '';
}

export async function getTodayMatches(): Promise<CompetitionGroup[]> {
  try {
    console.log('Iniciando busca de jogos...');
    
    // Buscar jogos do Flashscore
    const rawMatches = await getFlashscoreMatches();
    console.log('Jogos encontrados:', rawMatches.length);
    
    if (rawMatches.length === 0) {
      console.log('Nenhum jogo encontrado. Verificando possíveis problemas...');
      return [];
    }

    // Processar cada jogo para garantir que tenha um canal
    const matches = rawMatches.map(match => {
      if (!match.channel) {
        // Se não tiver canal definido, tentar determinar baseado nas regras
        match.channel = determineLikelyChannel(match);
      }
      return match;
    });

    // Agrupar jogos por competição
    const groupedMatches = matches.reduce((groups: { [key: string]: Match[] }, match) => {
      if (!groups[match.competition]) {
        groups[match.competition] = [];
      }
      groups[match.competition].push(match);
      return groups;
    }, {});

    // Ordenar jogos dentro de cada grupo
    Object.values(groupedMatches).forEach(matches => {
      matches.sort((a, b) => {
        // Jogos ao vivo primeiro
        if (a.status === 'AO VIVO' && b.status !== 'AO VIVO') return -1;
        if (b.status === 'AO VIVO' && a.status !== 'AO VIVO') return 1;

        // Depois por horário
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);
        
        // Se não for horário válido (ex: "TERMINADO", "AO VIVO"), manter ordem atual
        if (timeA.length !== 2 || timeB.length !== 2) return 0;
        
        return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
      });
    });

    // Converter para array e ordenar as competições
    const result = Object.entries(groupedMatches)
      .map(([name, matches]) => ({
        name,
        matches
      }))
      .sort((a, b) => {
        // Priorizar competições com jogos ao vivo
        const aHasLive = a.matches.some(m => m.status === 'AO VIVO');
        const bHasLive = b.matches.some(m => m.status === 'AO VIVO');
        if (aHasLive && !bHasLive) return -1;
        if (!aHasLive && bHasLive) return 1;

        // Depois ordenar por nome da competição
        return a.name.localeCompare(b.name);
      });

    console.log('Jogos processados e agrupados:', result.length, 'competições');
    return result;
    
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    return [];
  }
} 