import { useEffect, useState } from 'react'

function HelpUsageHistory({ entries }) {
  return (
    <div className="mt-4 border-t border-white/15 pt-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">Histórico de usos</h4>
      {entries.length ? <ol className="mt-2 max-h-28 space-y-2 overflow-y-auto pr-1 text-[11px] sm:text-xs">
        {entries.map((entry) => <li key={entry.id} className="flex items-start justify-between gap-2 rounded-lg bg-black/20 px-2.5 py-2">
          <span className="min-w-0"><span className="block font-semibold text-white">{entry.title}</span><span className="text-white/60">Autorizado por: {entry.authorizedBy || 'Não registrado'}</span></span>
          <time className="shrink-0 text-right text-white/60" dateTime={entry.usedAt}>{new Date(entry.usedAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</time>
        </li>)}
      </ol> : <p className="mt-1 text-xs text-white/60">Nenhuma carta usada ainda.</p>}
    </div>
  )
}

function FullscreenCard({ card, onClose }) {
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Visualização da ${card.title}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <button type="button" onClick={onClose} aria-label="Fechar visualização" className="absolute right-4 top-4 rounded-full bg-white/15 px-4 py-2 text-2xl leading-none text-white transition hover:bg-white/25">×</button>
      <img src={`/data/helpcards/${card.id}.png`} alt={card.title} className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl" />
    </div>
  )
}

export default function HelpCardsScreen({
  cards,
  currentIndex,
  selectedCardId,
  history,
  onIndexChange,
  onSelectCard,
  onUseCard,
  onBack,
}) {
  const [previewCard, setPreviewCard] = useState(null)
  const currentCard = cards[currentIndex]
  const isSelected = selectedCardId === currentCard.id

  function moveCarousel(direction) {
    onIndexChange((currentIndex + direction + cards.length) % cards.length)
  }

  return (
    <section className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col text-white" aria-labelledby="help-title">
      <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
        <button type="button" onClick={onBack} className="rounded-lg px-3 py-1 text-left text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white sm:text-sm">← Voltar ao menu principal</button>
        <span className="shrink-0 text-xs text-white/70">{currentIndex + 1} / {cards.length}</span>
      </div>
      <h2 id="help-title" className="shrink-0 text-xl font-bold sm:text-2xl">Cartas de Ajuda</h2>
      <p className="mt-1 shrink-0 text-xs text-white/70 sm:text-sm">Selecione uma carta para ver seus detalhes.</p>
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-3 md:grid-cols-2 md:grid-rows-1 md:gap-6 [@media(max-height:500px)]:grid-cols-2 [@media(max-height:500px)]:grid-rows-1">
        <div className="flex min-h-0 min-w-0 flex-col items-center justify-center">
          <div className="group relative flex min-h-0 w-full flex-1 items-center justify-center">
            <button type="button" aria-pressed={isSelected} onClick={() => onSelectCard(currentCard.id)} className="flex h-full max-h-[min(24dvh,280px)] min-h-0 w-full items-center justify-center rounded-xl bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 md:max-h-[min(42dvh,400px)]">
              <img src={`/data/helpcards/${currentCard.id}.png`} alt={`Ilustração da ${currentCard.title}`} className={`h-full max-h-[min(24dvh,280px)] max-w-full rounded-xl object-contain transition md:max-h-[min(42dvh,400px)] ${isSelected ? 'outline outline-[3px] outline-offset-4 outline-amber-400 shadow-[0_0_0_8px_rgba(251,192,45,.18)]' : ''}`} />
            </button>
            <button type="button" onClick={() => setPreviewCard(currentCard)} aria-label={`Ver ${currentCard.title} em tela cheia`} className="absolute right-2 top-2 rounded-lg bg-indigo-950/90 px-3 py-2 text-xs font-bold text-white opacity-100 shadow-lg transition hover:bg-indigo-800 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">⛶ Tela cheia</button>
          </div>
          <div className="mt-1 flex w-full shrink-0 items-center justify-between sm:mt-2">
            <button type="button" aria-label="Carta anterior" onClick={() => moveCarousel(-1)} className="min-h-10 min-w-10 px-2 text-4xl font-bold leading-none text-amber-300 transition hover:scale-110 hover:text-white">‹</button>
            <span className="text-xs text-white/75">{isSelected ? 'Carta selecionada' : 'Clique na carta para selecionar'}</span>
            <button type="button" aria-label="Próxima carta" onClick={() => moveCarousel(1)} className="min-h-10 min-w-10 px-2 text-4xl font-bold leading-none text-amber-300 transition hover:scale-110 hover:text-white">›</button>
          </div>
          <button type="button" onClick={onUseCard} disabled={selectedCardId === null} className="mt-1 min-h-10 w-full shrink-0 rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-indigo-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-2">Usar Carta de Ajuda</button>
        </div>
        <aside className="flex min-h-0 flex-col justify-center overflow-y-auto rounded-2xl border border-white/15 bg-white/[.06] p-4 text-left sm:p-5" aria-live="polite">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-300">{currentCard.title}</p>
          <h3 className="mt-1 text-lg font-bold uppercase sm:text-xl">{currentCard.title}</h3>
          <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-white/80 sm:text-sm">
            <p><strong className="text-white">Contexto:</strong> {currentCard.context}</p>
            <p><strong className="text-white">Efeito:</strong> {currentCard.effect}</p>
            <div className="rounded-xl bg-black/20 p-3"><strong className="text-amber-200">Exemplos:</strong><ul className="mt-1 list-disc space-y-1 pl-4">{currentCard.examples.map((example) => <li key={example}>{example}</li>)}</ul></div>
            <p><strong className="text-white">Função:</strong> {currentCard.purpose}</p>
            {currentCard.id === 3 && <p className="text-[11px] text-white/65">Regra: o fragmento nunca pode representar a solução completa da missão.</p>}
          </div>
          <HelpUsageHistory entries={history} />
        </aside>
      </div>
      {previewCard && <FullscreenCard card={previewCard} onClose={() => setPreviewCard(null)} />}
    </section>
  )
}
