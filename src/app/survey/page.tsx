"use client"
import Link from "next/link"
import { ComponentProps, PropsWithChildren, useEffect, useState } from "react"
import { AnswerData, Exercise, SurveyAnswers } from "./types"
import { useLocalStorage } from "./useLocalStorage"

export default function Survey() {
  const [answers, setAnswers] = useLocalStorage<AnswerData>("survey-answers")
  const setAnswer = <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) =>
    setAnswers({ ...answers, [key]: value })

  const [currentAnswer, setCurrentAnswer] = useState<string>("")
  useEffect(() => {
    if (answers == null) {
      setAnswers({})
    }
  })
  if (answers === null) {
    console.log("answers", answers)
    return <p>Loading</p>
  }

  if (answers.age == null) {
    return (
      <>
        <Label htmlFor="age">What is your age?</Label>
        <Input
          id="age"
          type="number"
          pattern="\d+"
          value={currentAnswer}
          onChange={e => setCurrentAnswer(e.target.value)}
        />
        <Button
          onClick={() => {
            setAnswer("age", parseInt(currentAnswer))
            setCurrentAnswer("")
          }}
        >
          Next!
        </Button>
      </>
    )
  }
  if (answers.gender == null) {
    return (
      <>
        <Label htmlFor="gender">Do you have a pp, tt&apos;s or neither?</Label>
        <fieldset id="gender" className="flex flex-row justify-between px-6">
          <button className="rounded px-2 py-1 bg-orange-400" onClick={() => setAnswer("gender", "m")}>
            pp
          </button>
          <button className="rounded px-2 py-1 bg-pink-400" onClick={() => setAnswer("gender", "f")}>
            tt&apos;s
          </button>
          <button className="rounded px-2 py-1 bg-green-400" onClick={() => setAnswer("gender", "u")}>
            No
          </button>
        </fieldset>
      </>
    )
  }
  if (answers.gymFrequency == null) {
    return (
      <>
        <Label htmlFor="gymFrequency">How many times per week do you hit the gym</Label>
        <p className="text-center">{currentAnswer == "" ? "7" : currentAnswer}</p>
        <Input
          id="gymFrequency"
          type="range"
          min={1}
          max={7}
          pattern="[1234567]"
          value={currentAnswer == "" ? "7" : currentAnswer}
          onChange={e => setCurrentAnswer(e.target.value)}
        />
        <Button
          onClick={() => {
            setAnswer("gymFrequency", parseInt(currentAnswer) as 1 | 2 | 3 | 4 | 5 | 6 | 7)
            setCurrentAnswer("")
          }}
        >
          Next!
        </Button>
      </>
    )
  }
  if (answers.favoriteExercise == null) {
    return (
      <>
        <Label htmlFor="favoriteExercise">What is your favorite exercise in the gym?</Label>
        <select id="favoriteExercise" onChange={e => setCurrentAnswer(e.target.value)} className="px-2 py-1 rounded">
          <option value={Exercise.BarbellBenchpress}>Barbell benchpress</option>
          <option value={Exercise.Dips}>Dips</option>
          <option value={Exercise.Flys}>Flys</option>
          <option value={Exercise.Pullup}>Pullups</option>
          <option value={Exercise.Curls}>Curls</option>
          <option value={Exercise.Legpress}>Legpress</option>
          <option value={Exercise.Squat}>Squats</option>
          <option value={Exercise.Lunges}>Lunges</option>
        </select>
        <Button
          onClick={() => {
            setAnswer("favoriteExercise", currentAnswer as Exercise)
            setCurrentAnswer("")
          }}
        >
          Next!
        </Button>
      </>
    )
  }
  if (answers.bulk == null) {
    return (
      <>
        <Label htmlFor="bulk">Are you currently bulking?</Label>
        <fieldset id="bulk" className="grid grid-cols-2 gap-4">
          <button onClick={() => setAnswer("bulk", true)} className="inline-block px-3 py-2 rounded bg-pink-500">
            Yes
          </button>
          <button onClick={() => setAnswer("bulk", false)} className="inline-block px-3 py-2 rounded bg-green-200">
            No
          </button>
        </fieldset>
      </>
    )
  }
  if (answers.timeToGym == null) {
    return (
      <>
        <Label htmlFor="timeToGym">How many minutes does it take you to get to the gym?</Label>
        <Input
          id="timeToGym"
          type="number"
          min={1}
          max={60}
          pattern="\d+"
          onChange={e => setCurrentAnswer(e.target.value)}
        />
        <Button
          onClick={() => {
            setAnswer("timeToGym", parseInt(currentAnswer))
            setCurrentAnswer("")
          }}
        >
          What day is it?
        </Button>
      </>
    )
  }

  return (
    <>
      <Link href="/" className="px-2 py-1 rounded bg-orange-400 text-white font-semibold">
        Show me what day I have!
      </Link>
    </>
  )
}

function Label({ htmlFor, children }: PropsWithChildren<{ htmlFor: string }>) {
  return <label htmlFor={htmlFor}>{children}</label>
}

function Button({ children, onClick }: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white px-2 py-1 rounded w-fit mx-auto">
      {children}
    </button>
  )
}

function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={`border rounded p-2`} {...rest} />
}
