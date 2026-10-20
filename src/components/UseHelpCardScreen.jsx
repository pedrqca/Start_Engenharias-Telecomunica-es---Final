import { useState } from 'react'
import { findHelpCodeOwner } from '../lib/helpCodeValidation.js'

export default function UseHelpCardScreen({ card, onBack, onAuthorized }) {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  async function submitPassword(event) {
    event.preventDefault()
    setStatus('checking')
    try {
      const authorizedBy = await findHelpCodeOwner(password.trim())
      if (!authorizedBy) {
        setStatus('error')
        return
      }

      onAuthorized({ card, authorizedBy })
      setStatus('success')
    } catch {
      setStatus('unavailable')
    }
  }

  return (
    <section className="mx-auto max-w-xl text-white" aria-labelledby="use-help-title">
      <button type="button" onClick={onBack} className="mb-6 rounded-lg px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">← Voltar para Cartas de Ajuda</button>
      <h2 id="use-help-title" className="text-2xl font-bold sm:text-3xl">Usar Carta de Ajuda</h2>
      <p className="mt-2 text-sm text-white/70">Apresente a senha da organização para confirmar o uso.</p>
      <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-white p-6 text-left text-indigo-950 shadow-xl">
        <h3 className="text-xl font-bold">{card.title}</h3>
        {status === 'success' ? <div className="mt-4 rounded-xl bg-green-50 p-4 text-center text-green-800" role="status">
          <p className="font-bold">Senha validada!</p>
          <p className="mt-1 text-sm">{card.title} foi liberada.</p>
        </div> : <form onSubmit={submitPassword}>
          <p className="mt-2 text-sm text-neutral-600">Insira uma das senhas fornecidas pela organização.</p>
          <label htmlFor="help-code" className="mt-5 block text-sm font-semibold">Senha da organização</label>
          <input id="help-code" type="password" value={password} onChange={(event) => { setPassword(event.target.value); if (status !== 'checking') setStatus('') }} placeholder="Digite a senha" autoComplete="off" required className="mt-2 w-full rounded-xl border-2 border-neutral-200 px-3 py-3 text-center text-lg outline-none focus:border-amber-400" />
          {status === 'error' && <p className="mt-2 text-sm text-red-600" role="alert">Senha incorreta. Confira e tente novamente.</p>}
          {status === 'unavailable' && <p className="mt-2 text-sm text-red-600" role="alert">Não foi possível validar a senha neste navegador. Abra o site em HTTPS ou localhost.</p>}
          <button type="submit" disabled={status === 'checking'} className="mt-4 w-full rounded-xl bg-indigo-950 px-4 py-3 font-bold text-white transition hover:bg-indigo-900 disabled:opacity-60">{status === 'checking' ? 'Validando…' : 'Validar senha'}</button>
        </form>}
      </div>
    </section>
  )
}
