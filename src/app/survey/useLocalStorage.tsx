"use client"
import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string) {
  const [value, setValue] = useState<T | null>(null)
  const [raw, setRaw] = useState<string | null>(null)
  useEffect(() => {
    const stored = localStorage.getItem(key)
    console.log("effect", stored, raw)
    if (stored !== raw) {
      setRaw(stored)
      if (stored) {
        setValue(JSON.parse(stored))
      } else {
        setValue(null)
      }
    }
  })
  return [
    value,
    (value: T | null) => {
      setValue(value)
      if (value == null) {
        localStorage.removeItem(key)
        console.log("REmoved")
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    },
  ] as const
}
