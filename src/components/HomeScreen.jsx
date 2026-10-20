import ResourceIcon from './ResourceIcon.jsx'

export default function HomeScreen({ resources, onOpenHelpCards }) {
  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
      {resources.map((resource) => (
        <a key={resource.title} href={resource.href} target="_blank" rel="noreferrer" className={`flex min-h-[240px] flex-col items-center justify-center rounded-2xl border-2 border-transparent bg-white/90 p-8 text-center no-underline transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,.3)] ${resource.tone === 'blue' ? 'text-indigo-950 hover:border-indigo-950' : 'text-teal-700 hover:border-teal-700'}`}>
          <ResourceIcon type={resource.icon} />
          <span className="mt-4 text-xl font-bold">{resource.title}</span>
          <span className="mt-2 text-sm leading-relaxed text-neutral-600">{resource.description}</span>
        </a>
      ))}
      <button type="button" onClick={onOpenHelpCards} className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border-2 border-transparent bg-white/90 p-8 text-center text-indigo-950 transition duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_20px_40px_rgba(0,0,0,.3)]">
        <span className="grid h-14 w-14 place-items-center text-5xl" aria-hidden="true">🃏</span>
        <span className="mt-4 text-xl font-bold">Cartas de Ajuda</span>
        <span className="mt-2 text-sm leading-relaxed text-neutral-600">Acesse e escolha uma carta para o grupo.</span>
      </button>
    </div>
  )
}
