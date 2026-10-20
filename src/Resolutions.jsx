import { useState } from 'react'
import codigoD1 from './data/codes/d1.js'
import codigoD2 from './data/codes/d2.js'
import codigoD3 from './data/codes/d3.js'
import codigoE1 from './data/codes/e1.js'
import codigoE2 from './data/codes/e2.js'
import codigoE3 from './data/codes/e3.js'

const groups = [
  {
    title: 'Desafios Práticos',
    icon: '</>',
    items: [
      { title: 'Desafio 01', description: 'Lógica de LEDs e Buzzer', code: codigoD1 },
      { title: 'Desafio 02', description: 'Lógica do LED RGB e Monitor Serial', code: codigoD2 },
      { title: 'Desafio 03', description: 'Lógica do Controle de Servo Motor', code: codigoD3 },
    ],
  },
  {
    title: 'Experimentos',
    icon: '✦',
    items: [
      { title: 'Experimento 01', description: "LED's e Buzzer", code: codigoE1 },
      { title: 'Experimento 02', description: 'LED RGB & Monitor Serial', code: codigoE2 },
      { title: 'Experimento 03', description: 'Servo Motor', code: codigoE3 },
    ],
  },
]

function Header({ subtitle }) {
  return <header className="mb-8 flex justify-center border-b-2 border-white/10 pb-7 sm:mb-10 sm:pb-8">
    <div className="flex items-center justify-center gap-3 sm:gap-[18px]">
      <img src="/data/logo_start.png" alt="Logo Start" className="h-12 w-auto sm:h-[65px]" />
      <div className="flex items-center gap-1 font-brand text-3xl leading-none sm:text-[2.6rem]">
        <span className="font-extrabold tracking-tight text-white">Start_</span>
        <span className="font-normal italic text-amber-300">{subtitle}</span>
      </div>
    </div>
  </header>
}

export default function Resolutions({ onBack }) {
  const [activeCode, setActiveCode] = useState(null)
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(activeCode.code)
      setCopied(true)
      setCopyFailed(false)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyFailed(true)
    }
  }

  return <section className="text-white">
    <Header subtitle={activeCode ? activeCode.title : 'Resoluções'} />
    {activeCode ? <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black/30 text-left shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-indigo-950/70 px-4 py-4 sm:px-6">
        <button type="button" onClick={() => { setActiveCode(null); setCopied(false); setCopyFailed(false) }} className="rounded-lg px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">← Voltar às resoluções</button>
        <button type="button" onClick={copyCode} className="rounded-lg bg-amber-400 px-4 py-2 font-bold text-indigo-950 transition hover:bg-amber-300">{copied ? 'Copiado!' : 'Copiar código'}</button>
      </div>
      {copyFailed && <p className="px-6 pt-4 text-sm text-amber-200" role="status">Não foi possível copiar. Selecione o código para copiá-lo manualmente.</p>}
      <pre className="max-h-[65vh] overflow-auto p-5 text-left text-sm leading-relaxed text-slate-100 sm:p-7"><code>{activeCode.code}</code></pre>
    </div> : <>
      {groups.map((group) => <div key={group.title} className="mb-8">
        <h2 className="mb-4 border-l-4 border-amber-400 pl-4 text-left text-xl font-semibold">{group.title}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {group.items.map((item) => <button key={item.title} type="button" onClick={() => setActiveCode(item)} className="flex min-h-28 items-center gap-4 rounded-xl border-2 border-transparent bg-white/95 p-5 text-left transition hover:-translate-y-1 hover:border-indigo-900 hover:bg-white hover:shadow-lg">
            <span className="w-10 shrink-0 text-center text-2xl font-bold text-indigo-900" aria-hidden="true">{group.icon}</span>
            <span><span className="block font-bold text-indigo-900">{item.title}</span><span className="mt-1 block text-sm text-neutral-600">{item.description}</span></span>
          </button>)}
        </div>
      </div>)}
      <button type="button" onClick={onBack} className="mt-2 rounded-lg px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white">← Voltar ao Menu Principal</button>
    </>}
  </section>
}
