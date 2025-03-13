'use client'

import { useState } from 'react'
import Link from 'next/link';

const channelGroups = {
  'Sport TV': ['Sport TV 1', 'Sport TV 2', 'Sport TV 3', 'Sport TV 4', 'Sport TV 5', 'Sport TV 6', 'Sport TV 7'],
  'Benfica': ['Benfica TV'],
  'DAZN': ['DAZN 1', 'DAZN 2', 'DAZN 3', 'DAZN 4', 'DAZN 5', 'DAZN 6']
};

// Criar uma lista com todos os canais para manter a ordem correta dos players
const allChannels = Object.values(channelGroups).flat();

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (group: string) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-3xl font-mono font-bold tracking-wide text-white drop-shadow-lg transition-all duration-300 hover:scale-105">
                📺 FG Futebol
            </h1>
          </Link>

          {/* Botão do menu hambúrguer */}
          <button 
            className="md:hidden text-white text-3xl focus:outline-none transition-transform duration-300 transform hover:scale-110"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Menu normal (telas maiores) */}
          <div className="hidden md:block">
            <div className="flex space-x-8">
              {Object.entries(channelGroups).map(([group, channels]) => (
                <div key={group} className="relative group">
                  <button className="py-2 font-medium transition-all duration-300 hover:text-blue-200 hover:scale-105">
                    {group}
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100">
                    <div className="py-1">
                      {channels.map((channel) => {
                        const channelIndex = allChannels.indexOf(channel) + 1;
                        return (
                          <a
                            key={channel}
                            href={`/player${channelIndex}`}
                            className="block px-4 py-2 hover:bg-gray-100 transition-all duration-200 rounded-md"
                          >
                            {channel}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu móvel - animação de slide e opacidade */}
        <div className={`md:hidden fixed inset-0 bg-black bg-opacity-80 z-50 transition-all duration-500 transform ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}`}>
          <div className="flex justify-end p-4">
            <button 
              className="text-white text-3xl focus:outline-none transition-transform duration-300 transform hover:scale-110"
              onClick={() => setMenuOpen(false)}
            >
              ✖
            </button>
          </div>
          
          {/* Submenus dentro do menu hambúrguer */}
          <div className="p-6">
            {Object.entries(channelGroups).map(([group, channels]) => (
              <div key={group} className="mb-4">
                {/* Botão do submenu */}
                <button
                  className="flex justify-between items-center w-full bg-indigo-700 text-white px-4 py-3 rounded-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
                  onClick={() => toggleSubmenu(group)}
                >
                  {group}
                  <span className="text-xl">{submenuOpen[group] ? '−' : '+'}</span>
                </button>

                {/* Lista de canais (animação ao abrir/fechar) */}
                <div className={`overflow-hidden transition-all duration-500 ${submenuOpen[group] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="mt-2 space-y-2">
                    {channels.map((channel) => {
                      const channelIndex = allChannels.indexOf(channel) + 1;
                      return (
                        <a
                          key={channel}
                          href={`/player${channelIndex}`}
                          className="block bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
                        >
                          {channel}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
