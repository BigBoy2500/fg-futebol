import puppeteer from 'puppeteer';

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

// Função auxiliar para esperar
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getTodayMatches(): Promise<Match[]> {
  try {
    console.log('Iniciando busca de jogos no Flashscore...');

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080'
      ]
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Acessar a página principal do Flashscore
    console.log('Acessando Flashscore...');
    await page.goto('https://www.flashscore.pt/', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    // Aguardar carregamento e aceitar cookies se necessário
    await wait(5000);
    try {
      const cookieButton = await page.$('#onetrust-accept-btn-handler');
      if (cookieButton) {
        await cookieButton.click();
        console.log('Cookies aceitos');
        await wait(2000);
      }
    } catch (e) {
      console.log('Botão de cookies não encontrado');
    }

    // Extrair jogos da página principal
    console.log('Extraindo jogos...');
    const matches = await page.evaluate(async () => {
      const matchList: any[] = [];
      let matchId = 1;

      // Pegar todos os jogos
      const eventElements = document.querySelectorAll('.event__match');
      console.log('Elementos encontrados:', eventElements.length);

      for (const event of eventElements) {
        try {
          const rawHomeTeam = event.querySelector('.event__participant--home, .event__homeParticipant')?.textContent?.trim() || '';
          const rawAwayTeam = event.querySelector('.event__participant--away, .event__awayParticipant')?.textContent?.trim() || '';

          const cleanTeamName = (name: string) => {
            return name
              .replace(/\([^)]*\)/g, '')
              .replace(/Segue em Frente/gi, '')
              .replace(/Eliminado/gi, '')
              .replace(/Qualificado/gi, '')
              .replace(/Vencedor/gi, '')
              .replace(/\s+/g, ' ')
              .trim();
          };

          const homeTeam = cleanTeamName(rawHomeTeam);
          const awayTeam = cleanTeamName(rawAwayTeam);

          let time = '';
          let status = 'NS';

          const statusElement = event.querySelector('.event__stage--block, .event__stage--live, .event__stage');
          if (statusElement) {
            const statusText = statusElement.textContent?.trim() || '';

            if (!statusText || statusText === 'NS') {
              time = event.querySelector('.event__time, .event__startTime')?.textContent?.trim() || '';
              status = 'NS';
            } else if (statusText.includes('FIN') || statusText.includes('Term') || statusText.includes('Pen')) {
              time = 'TERMINADO';
              status = 'TERMINADO';
            } else if (statusText.includes('INT')) {
              time = 'INTERVALO';
              status = 'INTERVALO';
            } else {
              const minuteMatch = statusText.match(/(\d+)'/);
              if (minuteMatch) {
                time = `${minuteMatch[1]}'`;
                status = 'AO VIVO';
              } else {
                time = statusText;
                status = 'AO VIVO';
              }
            }
          } else {
            time = event.querySelector('.event__time, .event__startTime')?.textContent?.trim() || '';
          }

          const isLive = event.classList.contains('event__match--live') || 
                        event.querySelector('.event__stage--live') !== null ||
                        event.closest('.event--live') !== null;

          if (isLive && status !== 'TERMINADO') {
            status = 'AO VIVO';
            if (!time.includes("'")) {
              time = 'AO VIVO';
            }
          }

          const scoreElement = event.querySelector('.event__scores');
          if (scoreElement && !isLive && status !== 'INTERVALO') {
            status = 'TERMINADO';
          }

          let score;
          const scoreHome = event.querySelector('.event__score--home')?.textContent?.trim();
          const scoreAway = event.querySelector('.event__score--away')?.textContent?.trim();

          if (scoreHome && scoreAway) {
            score = {
              home: parseInt(scoreHome, 10),
              away: parseInt(scoreAway, 10)
            };
          }

          let competition = '';

          const tournament = event.closest('.tournament');
          if (tournament) {
            const tournamentName = tournament.querySelector('.tournament__name')?.textContent?.trim();
            if (tournamentName) {
              competition = tournamentName
                .replace(/.*: /, '')
                .replace(/\([^)]*\)/g, '')
                .replace(/- Play-offs?/gi, '')
                .replace(/- Qualificação/gi, '')
                .replace(/\s+/g, ' ')
                .trim();
            }
          }

          // Capturar o canal de TV
          let channel = '';
          const tvIcon = event.querySelector('.event__icon--tv');
          if (tvIcon) {
            (tvIcon as HTMLElement).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            await wait(500); // Espera o tooltip carregar

            (tvIcon as HTMLElement).dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
            await wait(500); // Espera o tooltip desaparecer e atualizar o atributo title

            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
              const tooltipTitle = tooltip.getAttribute('title');

              if (tooltipTitle) {
                // Extrair o nome do canal dentro da tag <a title="DAZN 2">
                const match = tooltipTitle.match(/<a[^>]*title="([^"]+)"/);
                if (match) {
                  channel = match[1].trim();
                }
              }
            }
          }

          if (homeTeam && awayTeam) {
            console.log(`Jogo encontrado: ${homeTeam} vs ${awayTeam} (${competition})`);
            matchList.push({
              id: matchId++,
              homeTeam,
              awayTeam,
              time,
              status,
              competition,
              channel,
              score
            });
          }
        } catch (error) {
          console.log('Erro ao processar jogo:', error);
        }
      }

      return matchList;
    });

    console.log(`Encontrados ${matches.length} jogos`);
    await browser.close();

    return matches;
  } catch (error) {
    console.error('Erro ao buscar jogos do Flashscore:', error);
    return [];
  }
}
