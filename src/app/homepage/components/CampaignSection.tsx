"use client";
import React, { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/AppIcon";

// Scratch card symbols
const SYMBOLS = [
  { icon: "GiftIcon", color: "#e74c3c", name: "Hediye" },
  { icon: "SparklesIcon", color: "#f39c12", name: "Yildiz" },
  { icon: "HeartIcon", color: "#e91e63", name: "Kalp" },
  { icon: "BoltIcon", color: "#9b59b6", name: "Enerji" },
  { icon: "TrophyIcon", color: "#3498db", name: "Kupa" },
];

const DISCOUNT_CODES = [
  { code: "GG10", discount: 10 },
  { code: "GG20", discount: 20 },
  { code: "GG30", discount: 30 },
  { code: "GG40", discount: 40 },
  { code: "GG50", discount: 50 },
];

function generateCards(): { symbol: typeof SYMBOLS[0]; revealed: boolean }[] {
  // Generate 6 cards with at least 3 matching for a ~40% win rate
  const shouldWin = Math.random() < 0.4;
  
  if (shouldWin) {
    const winningSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const otherSymbols = SYMBOLS.filter(s => s.icon !== winningSymbol.icon);
    const cards = [
      { symbol: winningSymbol, revealed: false },
      { symbol: winningSymbol, revealed: false },
      { symbol: winningSymbol, revealed: false },
      { symbol: otherSymbols[Math.floor(Math.random() * otherSymbols.length)], revealed: false },
      { symbol: otherSymbols[Math.floor(Math.random() * otherSymbols.length)], revealed: false },
      { symbol: otherSymbols[Math.floor(Math.random() * otherSymbols.length)], revealed: false },
    ];
    return cards.sort(() => Math.random() - 0.5);
  } else {
    // No three matching - ensure max 2 of any symbol
    const cards: { symbol: typeof SYMBOLS[0]; revealed: boolean }[] = [];
    const symbolCounts: Record<string, number> = {};
    
    for (let i = 0; i < 6; i++) {
      let availableSymbols = SYMBOLS.filter(s => (symbolCounts[s.icon] || 0) < 2);
      if (availableSymbols.length === 0) availableSymbols = SYMBOLS;
      const symbol = availableSymbols[Math.floor(Math.random() * availableSymbols.length)];
      symbolCounts[symbol.icon] = (symbolCounts[symbol.icon] || 0) + 1;
      cards.push({ symbol, revealed: false });
    }
    return cards.sort(() => Math.random() - 0.5);
  }
}

function ScratchCard({ 
  card, 
  index, 
  onReveal, 
  disabled 
}: { 
  card: { symbol: typeof SYMBOLS[0]; revealed: boolean }; 
  index: number; 
  onReveal: (index: number) => void;
  disabled: boolean;
}) {
  const [isScratching, setIsScratching] = useState(false);

  const handleScratch = () => {
    if (card.revealed || disabled) return;
    setIsScratching(true);
    setTimeout(() => {
      onReveal(index);
      setIsScratching(false);
    }, 400);
  };

  return (
    <div 
      onClick={handleScratch}
      className={`
        relative aspect-square rounded-2xl cursor-pointer overflow-hidden
        transition-all duration-500 transform
        ${card.revealed 
          ? 'bg-white dark:bg-gray-800 shadow-lg scale-100' 
          : 'bg-gradient-to-br from-[#5aacf0] to-[#2ec4a0] hover:scale-105 hover:shadow-xl'
        }
        ${isScratching ? 'animate-scratch scale-95' : ''}
        ${disabled && !card.revealed ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Unscratched state */}
      {!card.revealed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
          <Icon name="SparklesIcon" size={24} className="mb-1 relative z-10" />
          <span className="text-xs font-bold relative z-10">Kazi</span>
        </div>
      )}

      {/* Revealed state */}
      {card.revealed && (
        <div 
          className="absolute inset-0 flex items-center justify-center animate-reveal"
          style={{ backgroundColor: `${card.symbol.color}15` }}
        >
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: card.symbol.color }}
          >
            <Icon name={card.symbol.icon as any} size={28} className="text-white" />
          </div>
        </div>
      )}

      {/* Scratch particles */}
      {isScratching && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-particle"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CampaignSection() {
  const [cards, setCards] = useState<ReturnType<typeof generateCards>>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [wonDiscount, setWonDiscount] = useState<typeof DISCOUNT_CODES[0] | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Initialize cards on mount
  useEffect(() => {
    const played = sessionStorage.getItem('scratch-game-played');
    if (played) {
      setHasPlayed(true);
      const savedResult = sessionStorage.getItem('scratch-game-result');
      if (savedResult) {
        const result = JSON.parse(savedResult);
        setGameState(result.state);
        setWonDiscount(result.discount);
        setCards(result.cards);
        setRevealedCount(6);
      }
    } else {
      setCards(generateCards());
    }
  }, []);

  const checkWin = useCallback((currentCards: ReturnType<typeof generateCards>) => {
    const symbolCounts: Record<string, number> = {};
    currentCards.forEach(card => {
      if (card.revealed) {
        symbolCounts[card.symbol.icon] = (symbolCounts[card.symbol.icon] || 0) + 1;
      }
    });

    for (const count of Object.values(symbolCounts)) {
      if (count >= 3) return true;
    }
    return false;
  }, []);

  const handleReveal = (index: number) => {
    if (gameState !== 'playing' || hasPlayed) return;

    const newCards = [...cards];
    newCards[index].revealed = true;
    setCards(newCards);
    setRevealedCount(prev => prev + 1);

    // Check for win after 3+ reveals
    const revealed = newCards.filter(c => c.revealed).length;
    if (revealed >= 3) {
      const hasWon = checkWin(newCards);
      if (hasWon) {
        const discount = DISCOUNT_CODES[Math.floor(Math.random() * DISCOUNT_CODES.length)];
        setWonDiscount(discount);
        setGameState('won');
        setShowNotification(true);
        setHasPlayed(true);
        sessionStorage.setItem('scratch-game-played', 'true');
        sessionStorage.setItem('scratch-game-result', JSON.stringify({ 
          state: 'won', 
          discount, 
          cards: newCards.map(c => ({ ...c, revealed: true }))
        }));
        // Reveal all cards
        setTimeout(() => {
          setCards(newCards.map(c => ({ ...c, revealed: true })));
        }, 500);
      } else if (revealed === 6) {
        setGameState('lost');
        setHasPlayed(true);
        sessionStorage.setItem('scratch-game-played', 'true');
        sessionStorage.setItem('scratch-game-result', JSON.stringify({ 
          state: 'lost', 
          discount: null, 
          cards: newCards 
        }));
      }
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const resetGame = () => {
    sessionStorage.removeItem('scratch-game-played');
    sessionStorage.removeItem('scratch-game-result');
    setCards(generateCards());
    setRevealedCount(0);
    setGameState('playing');
    setWonDiscount(null);
    setShowNotification(false);
    setHasPlayed(false);
  };

  return (
    <section id="campaign" className="py-24 relative overflow-hidden bg-white dark:bg-[#0a0f1c] transition-colors duration-500">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5aacf0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2ec4a0]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1024px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-semibold tracking-[0.01em] mb-6" style={{ background: "rgba(90,172,240,0.1)", color: "#5aacf0" }}>
              <span className="w-2 h-2 rounded-full bg-[#5aacf0] animate-pulse" /> Yaz Kampanyası 2026
            </div>
            
            <h2 className="text-[2.5rem] md:text-[3rem] font-bold leading-[1.1] mb-5 tracking-[-0.03em] text-[#1a1a2e] dark:text-white transition-colors">
              Gençlik Enerjisi <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0]">Seninle!</span>
            </h2>
            
            <p className="text-[16px] text-[#8a8aaa] dark:text-gray-400 leading-relaxed mb-8 transition-colors">
              Sınırları zorlayan teknoloji, seni asla yarı yolda bırakmaz. GG ile tarzını yansıt, müziği hisset ve hayatın ritmini yakala.
            </p>

            <ul className="flex flex-col gap-4 mb-8">
              {[
                { title: "Öğrenciye Özel %50 İndirim", desc: "Öğrenci kimliğini doğrula, anında kazan.", icon: "AcademicCapIcon" },
                { title: "Festivallerde VIP Ayrıcalığı", desc: "Seçili ürünlerle festivallere bilet şansı.", icon: "TicketIcon" },
                { title: "Sonsuz Enerji Garantisi", desc: "30 gün iade ve 2 yıl tam kapsamlı garanti.", icon: "ShieldCheckIcon" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#2ec4a0]/10 text-[#2ec4a0]">
                    <Icon name={item.icon as any} size={20} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#1a1a2e] dark:text-gray-100 transition-colors">{item.title}</h4>
                    <p className="text-[13px] text-[#8a8aaa] dark:text-gray-400 transition-colors">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="bg-[#f7f9fc] dark:bg-[#111827] rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-xl text-center relative overflow-hidden transition-colors duration-500">
              <div className="animate-fade-in">
                <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-2 transition-colors">
                  Kazi Kazan!
                </h3>
                <p className="text-sm text-[#8a8aaa] dark:text-gray-400 mb-6 transition-colors">
                  {gameState === 'playing' 
                    ? '3 ayni sembol bul, indirim kuponu kazan!' 
                    : gameState === 'won'
                    ? 'Tebrikler! Indirim kodunu kazandin!'
                    : 'Maalesef bu sefer kazanamadin. Tekrar dene!'}
                </p>
                
                {/* Scratch Cards Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {cards.map((card, index) => (
                    <ScratchCard
                      key={index}
                      card={card}
                      index={index}
                      onReveal={handleReveal}
                      disabled={gameState !== 'playing' || hasPlayed}
                    />
                  ))}
                </div>

                {/* Progress indicator */}
                <div className="flex justify-center gap-1.5 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i < revealedCount 
                          ? 'bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0]' 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Win state - Show discount code */}
                {gameState === 'won' && wonDiscount && (
                  <div className="mt-4 animate-fade-in-up">
                    <div 
                      onClick={() => copyToClipboard(wonDiscount.code)}
                      className="bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] text-white py-4 px-8 rounded-xl text-2xl font-mono tracking-[0.2em] mb-2 inline-block shadow-lg relative overflow-hidden group cursor-pointer hover:scale-105 transition-all active:scale-95"
                    >
                      <span className="relative z-10">{wonDiscount.code}</span>
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </div>
                    <p className="text-xs text-[#2ec4a0] font-semibold">%{wonDiscount.discount} indirim! Kopyalamak icin tikla</p>
                  </div>
                )}

                {/* Lost state or replay button */}
                {(gameState === 'lost' || (hasPlayed && gameState !== 'playing')) && (
                  <button
                    onClick={resetGame}
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] text-white rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-lg"
                  >
                    <Icon name="ArrowPathIcon" size={16} className="inline mr-2" />
                    Tekrar Oyna
                  </button>
                )}

                {/* Instructions */}
                {gameState === 'playing' && !hasPlayed && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {revealedCount}/6 kart acildi
                  </p>
                )}
              </div>
            </div>

            {/* Win Notification */}
            {showNotification && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-gray-100 dark:border-gray-800 animate-scaleIn">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#5aacf0] to-[#2ec4a0] text-white rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
                    <Icon name="TrophyIcon" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Kazandin!</h3>
                  <p className="text-[#8a8aaa] dark:text-gray-400 mb-6">
                    %{wonDiscount?.discount} indirim kuponu senin!
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6">
                    <p className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] tracking-wider">
                      {wonDiscount?.code}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (wonDiscount) copyToClipboard(wonDiscount.code);
                      setShowNotification(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] text-white rounded-xl font-semibold hover:scale-[1.02] transition-transform shadow-lg"
                  >
                    <Icon name="ClipboardDocumentIcon" size={18} className="inline mr-2" />
                    Kodu Kopyala
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
