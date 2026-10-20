import { useCallback, useEffect, useState } from 'react'

const storageKey = 'startHelpUsageHistory'

function loadHistory() {
  try {
    const savedHistory = JSON.parse(localStorage.getItem(storageKey) || '[]')
    return Array.isArray(savedHistory) ? savedHistory : []
  } catch {
    return []
  }
}

export function useHelpUsageHistory() {
  const [history, setHistory] = useState(loadHistory)

  const addUsage = useCallback((entry) => setHistory((currentHistory) => [entry, ...currentHistory]), [])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(history))
    } catch {
      // Keep the usage visible for the current session if local storage is unavailable.
    }
  }, [history])

  return { history, addUsage }
}
