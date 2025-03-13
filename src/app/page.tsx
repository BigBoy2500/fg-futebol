import MatchesList from '@/components/MatchesList';
import { getTodayMatches } from '@/lib/api';
import { Suspense } from 'react';

const channels = [
  { name: 'Sport TV 1', logoUrl: '/images/sport-tv-1.png' },
  { name: 'Sport TV 2', logoUrl: '/images/sport-tv-2.png' },
  { name: 'Sport TV 3', logoUrl: '/images/sport-tv-3.png' },
  { name: 'Sport TV 4', logoUrl: '/images/sport-tv-4.png' },
  { name: 'Sport TV 5', logoUrl: '/images/sport-tv-5.png' },
  { name: 'Sport TV 6', logoUrl: '/images/sport-tv-6.png' },
  { name: 'Sport TV 7', logoUrl: '/images/sport-tv-7.png' },
  { name: 'Benfica TV', logoUrl: '/images/btv.png' },
  { name: 'DAZN 1', logoUrl: '/images/dazn-1.png' },
  { name: 'DAZN 2', logoUrl: '/images/dazn-2.png' },
  { name: 'DAZN 3', logoUrl: '/images/dazn-3.png' },
  { name: 'DAZN 4', logoUrl: '/images/dazn-4.png' },
  { name: 'DAZN 5', logoUrl: '/images/dazn-5.png' },
  { name: 'DAZN 6', logoUrl: '/images/dazn-6.png' }
];

async function MatchesSection() {
  const matches = await getTodayMatches();
  return <MatchesList matches={matches} isLoading={false} />;
}

export default function Home() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Canais de Desporto</h1>
        <p className="text-xl text-gray-600">Todos os jogos, todos os canais</p>
      </div>

      {/* Lista de Jogos com Suspense */}
      {/*
      <Suspense fallback={<MatchesList matches={[]} isLoading={true} />}>
        <MatchesSection />
      </Suspense>
      */}

      {/* Grid de Canais */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Todos os Canais</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {channels.map((channel, i) => (
            <a
                key={i}
                href={`/player${i + 1}`}
                className="channel-button p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
            >
                <img 
                    src={channel.logoUrl} 
                    alt={channel.name} 
                    className="w-29 max-w-29 h-auto max-h-16 object-contain mb-2" // Ajuste aqui
                />
                {/*<h2 className="text-xl font-semibold text-center">{channel.name}</h2>*/} {/* Opcional: manter o nome abaixo da imagem */}
            </a>
        ))}
        </div>
      </div>
    </div>
  );
} 