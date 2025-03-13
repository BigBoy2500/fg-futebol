import React from 'react';

interface VideoPlayerProps {
  title: string;
  playerNumber: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ title, playerNumber }) => {
  // Você pode personalizar as URLs para cada player aqui
  const getPlayerUrl = (number: number) => {
    switch (number) {
      case 1:
        return "https://sport-panel247.store/main/2521";
      case 2:
        return "https://sport-panel247.store/main/2522";
      case 3:
        return "https://sport-panel247.store/main/2523";
      // Adicione mais casos conforme necessário
      default:
        return `https://sport-panel247.store/main/${2500 + number}`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={getPlayerUrl(playerNumber)}
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};

export default VideoPlayer; 