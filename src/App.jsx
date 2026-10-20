import { useEffect, useRef, useState } from 'react'
import Resolutions from './Resolutions.jsx'

const masterKey = 'c3RhcnRlbmdlbmhhcmlhcw=='
const helpCodeHashes = {
  1: { salt: 'd4f19a70', hash: 'bfc2c1f3e3773570277bbe0555b58d70cc3f20e89a70a5a1797dc86266a7a7c8' },
  2: { salt: 'a82c53e1', hash: '2beeaeb59be3e6d274357eb3db57bdcc9150601bcdce2abfe6668b72ec6d8c92' },
  3: { salt: '73be0d42', hash: '3ea7dac6598790601428867bb93d38fd723636f9b67081f9358783b8207a7f1b' },
  4: { salt: 'f19a65c8', hash: '604dd28bc64140c9aa73b2f68fccfc08163f8e26e18ca6dba9ba6f47dd3644f7' },
  5: { salt: 'c531e8a4', hash: 'bf51f48377cfef8856df82aa73f00aa0c70899df0f0cc704aefe50d920875383' },
}

async function hashHelpCode(value, salt) {
  const bytes = new TextEncoder().encode(`${salt}${value}`)
  const digest = await window.crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function Icon({ type }) {
  const paths = {
    pdf: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 2 4 4h-4zM8 13h8v2H8zm0 4h8v2H8z',
    rgb: 'M17 7H7a5 5 0 0 0 0 10h10a5 5 0 0 0 0-10M7 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6m10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6',
    lock: 'M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M9 6a3 3 0 0 1 6 0v2H9zm3 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4',
  }
  return <svg aria-hidden="true" className="h-14 w-14" viewBox="0 0 24 24" fill="currentColor"><path d={paths[type]} /></svg>
}

function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('acessoLiberado') === 'true')
  const [resolutionsOpen, setResolutionsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)
  const [helpScreen, setHelpScreen] = useState('home')
  const [selectedHelpCards, setSelectedHelpCards] = useState([])
  const [activeHelpCard, setActiveHelpCard] = useState(null)
  const [helpCode, setHelpCode] = useState('')
  const [helpCodeStatus, setHelpCodeStatus] = useState('')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [previewHelpCard, setPreviewHelpCard] = useState(null)
  const inputRef = useRef(null)
  const compactHelpView = helpScreen !== 'home' && !resolutionsOpen

  useEffect(() => {
    if (modalOpen) inputRef.current?.focus()
  }, [modalOpen])

  useEffect(() => {
    if (previewHelpCard === null) return undefined
    function closeOnEscape(event) {
      if (event.key === 'Escape') setPreviewHelpCard(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [previewHelpCard])

  function submitPassword(event) {
    event.preventDefault()
    if (btoa(password) === masterKey) {
      sessionStorage.setItem('acessoLiberado', 'true')
      setUnlocked(true)
      setModalOpen(false)
      setPassword('')
      setHasError(false)
      return
    }
    setHasError(true)
    setPassword('')
    inputRef.current?.focus()
  }

  const cards = [
    { title: 'Apostila', description: 'Material Didático e Guia de Práticas.', href: '/data/revisao-final-2026.pdf', type: 'pdf', tone: 'blue' },
    { title: 'Tabela de Cores', description: 'Consulta rápida de cores para o LED RGB.', href: '/data/Tabela%20de%20Cores%20RGB.pdf', type: 'rgb', tone: 'teal' },
  ]
  const helpCards = [
    {
      id: 1,
      title: 'Diagnóstico de Bordo',
      purpose: '🐛 Debug',
      context: 'Uma anomalia foi detectada no sistema. Antes de alterar qualquer protocolo, a tripulação pode solicitar um diagnóstico da central.',
      effect: 'A organização executa ou testa o código da equipe e informa o primeiro comportamento incorreto encontrado, sem indicar como corrigi-lo.',
      examples: ['Quando o botão é pressionado, o LED não apaga.', 'O servo não está atingindo a posição esperada.', 'Quando os dois botões são pressionados, o sistema não entra no estado de conflito.'],
    },
    {
      id: 2,
      title: 'Chave da Nave',
      purpose: '🧠 Entendimento',
      context: 'Os sistemas da nave possuem inúmeros protocolos. Entre eles, existe uma chave capaz de revelar o caminho necessário para prosseguir.',
      effect: 'A equipe recebe uma dica sobre o principal conceito de programação necessário para resolver a missão, sem receber código ou a solução.',
      examples: ['A solução depende de verificar duas entradas simultaneamente.', 'O valor recebido precisa ser convertido antes de controlar o servo.', 'O sistema precisa manter o estado atual entre os comandos.'],
    },
    {
      id: 3,
      title: 'Fragmento do Código Proibido',
      purpose: '💻 Código',
      context: 'Uma transmissão antiga foi recuperada dos arquivos da estação. O código está incompleto, mas um fragmento permanece intacto.',
      effect: 'A equipe recebe um pequeno trecho de código relacionado à solução da missão e precisa descobrir onde e como utilizá-lo. O fragmento nunca representa a solução completa.',
      examples: ['int valor = analogRead(A0);', 'servo.write(90);'],
    },
    {
      id: 4,
      title: 'Visão do Futuro',
      purpose: '🔭 Teste',
      context: 'O sistema de navegação conseguiu simular um possível cenário futuro. Agora a equipe sabe o que deveria acontecer em uma determinada situação.',
      effect: 'A equipe recebe um caso de teste contendo uma condição e o comportamento esperado.',
      examples: ['Entrada: Botão 1 + Botão 2 pressionados → Esperado: sistema entra em estado de conflito.', 'Entrada: Potenciômetro = 750 → Esperado: servo assume determinada posição ou estado.'],
    },
    {
      id: 5,
      title: 'Módulo de Emergência',
      purpose: '🔧 Montagem',
      context: 'O sistema de montagem automática da estação foi ativado. Toda a infraestrutura necessária para a missão já está pronta.',
      effect: 'A organização entrega a montagem física da missão já realizada. A equipe ainda precisa desenvolver toda a programação.',
      examples: ['Em uma missão com Arduino, RGB, botão, potenciômetro e servo, a organização entrega toda a montagem pronta.'],
    },
  ]
  const currentHelpCard = helpCards[carouselIndex]

  function toggleHelpCard(id) {
    setSelectedHelpCards((selected) => selected.includes(id) ? [] : [id])
  }

  function startUsingHelpCard() {
    if (!selectedHelpCards.length) return
    setActiveHelpCard(selectedHelpCards[0])
    setHelpCode('')
    setHelpCodeStatus('')
    setHelpScreen('use')
  }

  async function submitHelpCode(event) {
    event.preventDefault()
    setHelpCodeStatus('checking')
    try {
      if (!window.crypto?.subtle) throw new Error('Web Crypto indisponível')
      const candidates = await Promise.all(Object.values(helpCodeHashes).map(async ({ salt, hash }) => ({
        actual: await hashHelpCode(helpCode.trim(), salt),
        expected: hash,
      })))
      setHelpCodeStatus(candidates.some(({ actual, expected }) => actual === expected) ? 'success' : 'error')
    } catch {
      setHelpCodeStatus('unavailable')
    }
  }

  return (
    <main className={`isolate relative flex min-h-dvh items-center justify-center bg-[#050a30] ${compactHelpView ? 'h-dvh overflow-hidden px-2 py-2 sm:px-4' : 'min-h-screen overflow-auto px-4 py-8 sm:px-6'}`}>
      <div className="fixed inset-0 -z-10 scale-110 bg-[url('/data/fundo.jpg')] bg-cover bg-center brightness-[.25] blur-[10px]" />
      <section className={`w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[.05] text-center shadow-2xl backdrop-blur-xl ${compactHelpView ? 'max-h-full overflow-hidden p-3 sm:p-5' : 'p-6 sm:p-10 lg:p-12'}`}>
        {!resolutionsOpen && <header className={`flex justify-center border-b-2 border-white/10 ${compactHelpView ? 'mb-3 pb-3' : 'mb-8 pb-7 sm:mb-10 sm:pb-8'}`}>
          <div className="flex items-center justify-center gap-3 sm:gap-[18px]">
            <img src="/data/logo_start.png" alt="Logo Start" className={`${compactHelpView ? 'h-9 sm:h-10' : 'h-12 sm:h-[65px]'} w-auto`} />
            <div className={`flex items-center gap-1 font-brand leading-none text-white ${compactHelpView ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-[2.6rem]'}`}>
              <span className="font-extrabold tracking-tight">Start</span>
              <span className="font-normal italic">{helpScreen === 'home' ? '_Engenharias' : '_Cards'}</span>
            </div>
          </div>
        </header>}

        {resolutionsOpen ? <Resolutions onBack={() => setResolutionsOpen(false)} /> : helpScreen === 'home' ? <>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((card) => (
            <a key={card.title} href={card.href} target="_blank" rel="noreferrer" className={`flex min-h-[240px] flex-col items-center justify-center rounded-2xl border-2 border-transparent bg-white/90 p-8 text-center no-underline transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,.3)] ${card.tone === 'blue' ? 'text-indigo-950 hover:border-indigo-950' : 'text-teal-700 hover:border-teal-700'}`}>
              <Icon type={card.type} />
              <span className="mt-4 text-xl font-bold">{card.title}</span>
              <span className="mt-2 text-sm leading-relaxed text-neutral-600">{card.description}</span>
            </a>
          ))}
          {unlocked ? (
            <button type="button" onClick={() => setResolutionsOpen(true)} className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border-[3px] border-green-600 bg-green-50 p-8 text-center text-green-800 transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,.3)]">
              <Icon type="lock" />
              <span className="mt-4 text-xl font-bold">Acesso Liberado!</span>
              <span className="mt-2 text-sm leading-relaxed text-neutral-600">Clique para entrar.</span>
            </button>
          ) : (
            <button type="button" onClick={() => setModalOpen(true)} className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border-2 border-transparent bg-white/90 p-8 text-center text-yellow-700 transition duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_20px_40px_rgba(0,0,0,.3)]">
              <Icon type="lock" />
              <span className="mt-4 text-xl font-bold">Resoluções</span>
              <span className="mt-2 text-sm leading-relaxed text-neutral-600">Clique para digitar a senha.</span>
            </button>
          )}
        </div>
        <button type="button" onClick={() => setHelpScreen('browse')} className="mt-5 flex min-h-[104px] w-full items-center gap-4 rounded-2xl border-2 border-white/60 bg-white/90 px-5 py-4 text-left text-indigo-950 transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg">
          <span className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-2xl bg-indigo-50"><Icon type="lock" /></span>
          <span className="text-left"><span className="block text-lg font-bold">Cartas de Ajuda</span><span className="mt-1 block text-sm text-neutral-600">Acesse e escolha uma carta para o grupo.</span></span>
          <span className="ml-auto text-2xl text-indigo-950" aria-hidden="true">→</span>
        </button>
        </> : helpScreen === 'browse' ? <section className="mx-auto flex max-w-5xl flex-col text-white" aria-labelledby="help-title">
          <div className="mb-2 flex items-center justify-between gap-2">
            <button type="button" onClick={() => setHelpScreen('home')} className="rounded-lg px-3 py-1 text-left text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white sm:text-sm">← Voltar ao menu principal</button>
            <span className="shrink-0 text-xs text-white/70">{carouselIndex + 1} / 5</span>
          </div>
          <h2 id="help-title" className="text-xl font-bold sm:text-2xl">Cartas de Ajuda</h2>
          <p className="mt-1 text-xs text-white/70 sm:text-sm">Selecione uma carta para ver seus detalhes.</p>
          <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div className="flex min-w-0 flex-col items-center justify-center">
              <div className="group relative flex w-full flex-1 items-center justify-center">
                <button type="button" aria-pressed={selectedHelpCards.includes(currentHelpCard.id)} onClick={() => toggleHelpCard(currentHelpCard.id)} className="flex h-full max-h-[min(34dvh,340px)] min-h-0 w-full items-center justify-center rounded-xl bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300">
                  <img src={`/data/helpcards/${currentHelpCard.id}.png`} alt={`Ilustração da ${currentHelpCard.title}`} className={`h-full max-h-[min(34dvh,340px)] max-w-full rounded-xl object-contain transition ${selectedHelpCards.includes(currentHelpCard.id) ? 'outline outline-[3px] outline-offset-4 outline-amber-400 shadow-[0_0_0_8px_rgba(251,192,45,.18)]' : ''}`} />
                </button>
                <button type="button" onClick={() => setPreviewHelpCard(currentHelpCard.id)} aria-label={`Ver ${currentHelpCard.title} em tela cheia`} className="absolute right-2 top-2 rounded-lg bg-indigo-950/90 px-3 py-2 text-xs font-bold text-white opacity-100 shadow-lg transition hover:bg-indigo-800 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">⛶ Tela cheia</button>
              </div>
              <div className="mt-2 flex w-full items-center justify-between">
                <button type="button" aria-label="Carta anterior" onClick={() => setCarouselIndex((index) => (index + 4) % 5)} className="px-2 text-4xl font-bold leading-none text-amber-300 transition hover:scale-110 hover:text-white">‹</button>
                <span className="text-xs text-white/75">{selectedHelpCards.includes(currentHelpCard.id) ? 'Carta selecionada' : 'Clique na carta para selecionar'}</span>
                <button type="button" aria-label="Próxima carta" onClick={() => setCarouselIndex((index) => (index + 1) % 5)} className="px-2 text-4xl font-bold leading-none text-amber-300 transition hover:scale-110 hover:text-white">›</button>
              </div>
              <button type="button" onClick={startUsingHelpCard} disabled={!selectedHelpCards.length} className="mt-2 w-full rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-indigo-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50">Usar Carta de Ajuda</button>
            </div>
            <aside className="flex min-h-0 flex-col justify-center overflow-y-auto rounded-2xl border border-white/15 bg-white/[.06] p-4 text-left sm:p-5" aria-live="polite">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-300">{currentHelpCard.title}</p>
              <h3 className="mt-1 text-lg font-bold uppercase sm:text-xl">{currentHelpCard.title}</h3>
              <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-white/80 sm:text-sm">
                <p><strong className="text-white">Contexto:</strong> {currentHelpCard.context}</p>
                <p><strong className="text-white">Efeito:</strong> {currentHelpCard.effect}</p>
                <div className="rounded-xl bg-black/20 p-3"><strong className="text-amber-200">Exemplos:</strong><ul className="mt-1 list-disc space-y-1 pl-4">{currentHelpCard.examples.map((example) => <li key={example}>{example}</li>)}</ul></div>
                <p><strong className="text-white">Função:</strong> {currentHelpCard.purpose}</p>
                {currentHelpCard.id === 3 && <p className="text-[11px] text-white/65">Regra: o fragmento nunca pode representar a solução completa da missão.</p>}
              </div>
            </aside>
          </div>
        </section>
        : <section className="mx-auto max-w-xl text-white" aria-labelledby="use-help-title">
          <button type="button" onClick={() => setHelpScreen('browse')} className="mb-6 rounded-lg px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">← Voltar para Cartas de Ajuda</button>
          <h2 id="use-help-title" className="text-2xl font-bold sm:text-3xl">Usar Carta de Ajuda</h2>
          <p className="mt-2 text-sm text-white/70">Escolha uma das cartas selecionadas pelo grupo.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {selectedHelpCards.map((id) => <button key={id} type="button" onClick={() => { setActiveHelpCard(id); setHelpCode(''); setHelpCodeStatus('') }} className={`rounded-xl border px-5 py-3 font-semibold transition ${activeHelpCard === id ? 'border-amber-300 bg-amber-300 text-indigo-950' : 'border-white/25 bg-white/10 text-white hover:bg-white/20'}`}>Carta {id}</button>)}
          </div>
          {activeHelpCard && <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-white p-6 text-left text-indigo-950 shadow-xl">
            <h3 className="text-xl font-bold">Carta {activeHelpCard}</h3>
            {helpCodeStatus === 'success' ? <div className="mt-4 rounded-xl bg-green-50 p-4 text-center text-green-800" role="status"><p className="font-bold">Senha validada!</p><p className="mt-1 text-sm">A Carta {activeHelpCard} foi liberada.</p></div> : <form onSubmit={submitHelpCode}>
              <p className="mt-2 text-sm text-neutral-600">Insira uma das cinco senhas fornecidas pela organização.</p>
              <label htmlFor="help-code" className="mt-5 block text-sm font-semibold">Senha da organização</label>
              <input id="help-code" type="password" value={helpCode} onChange={(event) => { setHelpCode(event.target.value); if (helpCodeStatus !== 'checking') setHelpCodeStatus('') }} placeholder="Digite a senha" autoComplete="off" required className="mt-2 w-full rounded-xl border-2 border-neutral-200 px-3 py-3 text-center text-lg outline-none focus:border-amber-400" />
              {helpCodeStatus === 'error' && <p className="mt-2 text-sm text-red-600" role="alert">Senha incorreta para esta carta. Confira e tente novamente.</p>}
              {helpCodeStatus === 'unavailable' && <p className="mt-2 text-sm text-red-600" role="alert">Não foi possível validar a senha neste navegador. Abra o site em HTTPS ou localhost.</p>}
              <button type="submit" disabled={helpCodeStatus === 'checking'} className="mt-4 w-full rounded-xl bg-indigo-950 px-4 py-3 font-bold text-white transition hover:bg-indigo-900 disabled:opacity-60">{helpCodeStatus === 'checking' ? 'Validando…' : 'Validar senha'}</button>
            </form>}
          </div>}
        </section>}
        {!compactHelpView && <footer className="mt-8 text-sm font-light text-white/50 sm:mt-10">Inatel - Santa Rita do Sapucaí</footer>}
      </section>

      {previewHelpCard !== null && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Visualização da Carta ${previewHelpCard}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewHelpCard(null) }}>
        <button type="button" onClick={() => setPreviewHelpCard(null)} aria-label="Fechar visualização" className="absolute right-4 top-4 rounded-full bg-white/15 px-4 py-2 text-2xl leading-none text-white transition hover:bg-white/25">×</button>
        <img src={`/data/helpcards/${previewHelpCard}.png`} alt={`Carta de Ajuda ${previewHelpCard}`} className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl" />
      </div>}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}>
          <form onSubmit={submitPassword} className="w-full max-w-xs rounded-3xl bg-white p-7 text-center shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <h2 id="dialog-title" className="mb-5 text-xl font-bold text-indigo-950">Acesso Restrito</h2>
            <input ref={inputRef} type="password" value={password} onChange={(event) => { setPassword(event.target.value); setHasError(false) }} placeholder="Digite a senha" aria-label="Digite a senha" className="w-full rounded-xl border-2 border-neutral-200 px-3 py-3 text-center text-lg outline-none focus:border-amber-400" />
            <p className={`my-2 h-5 text-sm text-red-600 ${hasError ? 'visible' : 'invisible'}`} role="alert">Senha incorreta! Tente novamente.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => { setModalOpen(false); setPassword(''); setHasError(false) }} className="flex-1 rounded-xl bg-neutral-100 px-3 py-3 font-bold text-neutral-600 transition hover:bg-neutral-200">Cancelar</button>
              <button type="submit" className="flex-1 rounded-xl bg-indigo-950 px-3 py-3 font-bold text-white transition hover:bg-indigo-900">Entrar</button>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}

export default App
