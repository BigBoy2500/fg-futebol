export const LEAGUE_URLS = {
  'Primeira Liga': '/futebol/portugal/primeira-liga/',
  'Liga Portugal 2': '/futebol/portugal/liga-portugal-2/',
  'Premier League': '/futebol/inglaterra/premier-league/',
  'La Liga': '/futebol/espanha/laliga/',
  'Serie A': '/futebol/italia/serie-a/',
  'Bundesliga': '/futebol/alemanha/bundesliga/',
  'Ligue 1': '/futebol/franca/ligue-1/',
  'Champions League': '/futebol/liga-dos-campeoes/',
  'Liga Europa': '/futebol/liga-europa/',
  'Liga Conferência': '/futebol/liga-conferencia-europa/'
} as const;

export type LeagueName = keyof typeof LEAGUE_URLS;

export interface TodayMatch {
  homeTeam: string;
  awayTeam: string;
  time: string;
  status: string;
  channel?: string;
  competition: LeagueName;
  score?: {
    home: number;
    away: number;
  };
}

export interface Match extends TodayMatch {
  id: number;
} 