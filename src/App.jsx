import { useState } from 'react'
import HelpCardsScreen from './components/HelpCardsScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import UseHelpCardScreen from './components/UseHelpCardScreen.jsx'
import { helpCards, resourceCards } from './data/helpCards.js'
import { useHelpUsageHistory } from './hooks/useHelpUsageHistory.js'

function App() {
  const [screen, setScreen] = useState('home')
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [activeCardId, setActiveCardId] = useState(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const { history, addUsage } = useHelpUsageHistory()
  const compactView = screen !== 'home'
  const activeCard = helpCards.find((card) => card.id === activeCardId)

  function selectCard(cardId) {
    setSelectedCardId((currentSelection) => currentSelection === cardId ? null : cardId)
  }

  function useSelectedCard() {
    if (selectedCardId === null) return
    setActiveCardId(selectedCardId)
    setScreen('use')
  }

  function recordAuthorizedUse({ card, authorizedBy }) {
    addUsage({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      cardId: card.id,
      title: card.title,
      authorizedBy,
      usedAt: new Date().toISOString(),
    })
  }

  return (
    <main className={`isolate relative flex min-h-dvh items-center justify-center bg-[#050a30] ${compactView ? 'h-dvh overflow-hidden px-2 py-2 sm:px-4' : 'min-h-screen overflow-auto px-4 py-8 sm:px-6'}`}>
      <div className="fixed inset-0 -z-10 scale-110 bg-[url('/data/fundo.jpg')] bg-cover bg-center brightness-[.25] blur-[10px]" />
      <section className={`w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[.05] text-center shadow-2xl backdrop-blur-xl ${compactView ? 'flex h-full max-h-full flex-col overflow-hidden p-3 sm:p-5' : 'p-6 sm:p-10 lg:p-12'}`}>
        <header className={`flex shrink-0 justify-center border-b-2 border-white/10 ${compactView ? 'mb-3 pb-3' : 'mb-8 pb-7 sm:mb-10 sm:pb-8'}`}>
          <div className="flex items-center justify-center gap-3 sm:gap-[18px]">
            <img src="/data/logo_start.png" alt="Logo Start" className={`${compactView ? 'h-9 sm:h-10' : 'h-12 sm:h-[65px]'} w-auto`} />
            <div className={`flex items-baseline font-brand font-semibold italic leading-none tracking-tight text-white ${compactView ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-[2.6rem]'}`}>
              <span className="lowercase">start</span>
              <span className="text-cyan-400 not-italic">_</span>
              <span>{screen === 'home' ? 'Engenharias' : 'Cards'}</span>
            </div>
          </div>
        </header>

        {screen === 'home' && <HomeScreen resources={resourceCards} onOpenHelpCards={() => setScreen('browse')} />}
        {screen === 'browse' && <HelpCardsScreen
          cards={helpCards}
          currentIndex={carouselIndex}
          selectedCardId={selectedCardId}
          history={history}
          onIndexChange={setCarouselIndex}
          onSelectCard={selectCard}
          onUseCard={useSelectedCard}
          onBack={() => setScreen('home')}
        />}
        {screen === 'use' && activeCard && <UseHelpCardScreen
          card={activeCard}
          onBack={() => setScreen('browse')}
          onAuthorized={recordAuthorizedUse}
        />}

        {!compactView && <footer className="mt-8 text-sm font-light text-white/50 sm:mt-10">Inatel - Santa Rita do Sapucaí</footer>}
      </section>
    </main>
  )
}

export default App
