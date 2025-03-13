import React from 'react';

interface Match {
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

interface CompetitionGroup {
  name: string;
  matches: Match[];
}

interface MatchesListProps {
  matches: CompetitionGroup[];
  isLoading: boolean;
}

const MatchesList: React.FC<MatchesListProps> = ({ matches, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Jogos de Hoje</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Jogos de Hoje</h2>
        <p className="text-center text-gray-500">Nenhum jogo encontrado para hoje</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {matches.map((competition) => (
        <div key={competition.name} className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
            {competition.name}
          </h3>
          <div className="space-y-4">
            {competition.matches.map((match) => {
              const channelNumber = match.channel.includes('Sport TV') ? 
                Number(match.channel.replace('Sport TV ', '')) :
                match.channel === 'Benfica TV' ? 8 :
                match.channel.includes('DAZN') ? 8 + Number(match.channel.replace('DAZN ', '')) : 1;

              return (
                <div 
                  key={match.id} 
                  className="hover:bg-gray-50 transition-colors rounded-lg p-4 border"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4 w-full">
  <div className="flex items-center space-x-4">
    <span className="text-lg font-semibold text-blue-600">{match.time}</span>
    {match.status === 'AO VIVO' && (
      <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
        AO VIVO
      </span>
    )}
    {match.status === 'INTERVALO' && (
      <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
        INTERVALO
      </span>
    )}
    {match.status === 'TERMINADO' && (
      <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
        TERMINADO
      </span>
    )}
  </div>
  
  {match.channel && (
    <div className="ml-auto">
      <a 
        href={`/player${channelNumber}`}
        className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
      >
        {match.channel}
      </a>
    </div>
  )}
</div>
                  <div className="mt-2 flex items-center justify-center space-x-4 text-lg">
                    <span className="font-medium">{match.homeTeam}</span>
                    {match.score ? (
                      <span className="font-bold text-blue-600">
                        {match.score.home} - {match.score.away}
                      </span>
                    ) : (
                      <span className="text-gray-400">vs</span>
                    )}
                    <span className="font-medium">{match.awayTeam}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesList; 