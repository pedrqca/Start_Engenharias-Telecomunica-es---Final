const iconPaths = {
  pdf: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 2 4 4h-4zM8 13h8v2H8zm0 4h8v2H8z',
  rgb: 'M17 7H7a5 5 0 0 0 0 10h10a5 5 0 0 0 0-10M7 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6m10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6',
}

export default function ResourceIcon({ type }) {
  return <svg aria-hidden="true" className="h-14 w-14" viewBox="0 0 24 24" fill="currentColor"><path d={iconPaths[type]} /></svg>
}
